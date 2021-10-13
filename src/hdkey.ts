import { base58check as _base58check } from "micro-base/lib/base58";
import { hmac } from "noble-hashes/lib/hmac";
import { ripemd160 } from "noble-hashes/lib/ripemd160";
import { sha256 } from "noble-hashes/lib/sha256";
import { sha512 } from "noble-hashes/lib/sha512";
import * as random from "./random";
import * as secp256k1 from "./secp256k1";
import { assertBytes, concatBytes, createView, utf8ToBytes } from "./utils";
const base58 = _base58check(sha256);

const MASTER_SECRET = utf8ToBytes("Bitcoin seed");
// Bitcoin hardcoded by default
const BITCOIN_VERSIONS: Versions = { private: 0x0488ade4, public: 0x0488b21e };

export interface Versions {
  private: number;
  public: number;
}

const hash160 = (data: Uint8Array) => ripemd160(sha256(data));
const fromU32 = (data: Uint8Array) => createView(data).getUint32(0, false);
const toU32 = (n: number) => {
  const buf = new Uint8Array(4);
  createView(buf).setUint32(0, n, false);
  return buf;
};

export class HDKey {
  public static HARDENED_OFFSET: number = 0x80000000;
  public static fromMasterSeed(seed: Uint8Array, versions?: Versions): HDKey {
    const I = hmac(sha512, MASTER_SECRET, seed);
    const hdkey = new HDKey(versions);
    hdkey.chainCode = I.slice(32);
    hdkey.privateKey = I.slice(0, 32);
    return hdkey;
  }
  public static fromExtendedKey(base58key: string, versions?: Versions): HDKey {
    // => version(4) || depth(1) || fingerprint(4) || index(4) || chain(32) || key(33)
    const hdkey = new HDKey(versions);
    const keyBuffer: Uint8Array = base58.decode(base58key);
    const keyView = createView(keyBuffer);
    const version = keyView.getUint32(0, false);
    hdkey.depth = keyBuffer[4];
    hdkey.parentFingerprint = keyView.getUint32(5, false);
    hdkey.index = keyView.getUint32(9, false);
    hdkey.chainCode = keyBuffer.slice(13, 45);
    const key = keyBuffer.slice(45);
    const isPriv = key[0] === 0;
    if (version !== hdkey.versions[isPriv ? "private" : "public"]) {
      throw new Error("Version mismatch");
    }
    if (isPriv) {
      hdkey.privateKey = key.slice(1);
    } else {
      hdkey.publicKey = key;
    }
    return hdkey;
  }

  public static fromJSON(json: { xpriv: string }): HDKey {
    return HDKey.fromExtendedKey(json.xpriv);
  }

  public versions: Versions;
  public depth: number = 0;
  public index: number = 0;
  public chainCode: Uint8Array | null = null;
  public parentFingerprint: number = 0;
  private privKey?: Uint8Array;
  private pubKey?: Uint8Array;
  private pubHash: Uint8Array | undefined;

  constructor(versions?: Versions) {
    this.versions = versions || BITCOIN_VERSIONS;
  }
  get fingerprint(): number {
    if (!this.pubHash) {
      throw new Error("No publicKey set!");
    }
    return fromU32(this.pubHash);
  }
  get identifier(): Uint8Array | undefined {
    return this.pubHash;
  }
  get pubKeyHash(): Uint8Array | undefined {
    return this.pubHash;
  }
  get privateKey(): Uint8Array | null {
    return this.privKey || null;
  }
  set privateKey(value: Uint8Array | null) {
    if (!value || !secp256k1.privateKeyVerify(value)) {
      throw new Error("Invalid private key");
    }
    this.privKey = value;
    this.pubKey = secp256k1.publicKeyCreate(value, true);
    this.pubHash = hash160(this.pubKey);
  }
  get publicKey(): Uint8Array | null {
    return this.pubKey || null;
  }
  set publicKey(value: Uint8Array | null) {
    if (!value || !secp256k1.publicKeyVerify(value)) {
      throw new Error("Invalid public key");
    }
    this.pubKey = secp256k1.publicKeyConvert(value, true); // force compressed point
    this.pubHash = hash160(this.pubKey);
    this.privKey = undefined;
  }

  get privateExtendedKey(): string {
    if (!this.privKey) {
      throw new Error("No private key");
    }
    return base58.encode(
      this.serialize(
        this.versions.private,
        concatBytes(new Uint8Array([0]), this.privKey)
      )
    );
  }
  get publicExtendedKey(): string {
    if (!this.pubKey) {
      throw new Error("No public key");
    }
    return base58.encode(this.serialize(this.versions.public, this.pubKey));
  }

  public derive(path: string): HDKey {
    if (!/^[mM]'?/.test(path)) {
      throw new Error('Path must start with "m" or "M"');
    }
    if (/^[mM]'?$/.test(path)) {
      return this;
    }
    const parts = path.replace(/^[mM]'?\//, "").split("/");
    // tslint:disable-next-line
    let child: HDKey = this;
    for (const c of parts) {
      const m = /^(\d+)('?)$/.exec(c);
      if (!m || m.length !== 3) {
        throw new Error(`Invalid child index: ${c}`);
      }
      let idx = +m[1];
      if (!Number.isSafeInteger(idx) || idx >= HDKey.HARDENED_OFFSET) {
        throw new Error("Invalid index");
      }
      // hardened key
      if (m[2] === "'") {
        idx += HDKey.HARDENED_OFFSET;
      }
      child = child.deriveChild(idx);
    }
    return child;
  }
  public deriveChild(index: number): HDKey {
    if (!Number.isSafeInteger(index) || index < 0 || index >= 2 ** 33) {
      throw new Error(
        `Child index should be positive 32-bit integer, not ${index}`
      );
    }
    if (!this.pubKey || !this.chainCode) {
      throw new Error("No publicKey or chainCode set");
    }
    let data = new Uint8Array(4);
    createView(data).setUint32(0, index, false);
    if (index >= HDKey.HARDENED_OFFSET) {
      // Hardened
      if (!this.privKey) {
        throw new Error("Could not derive hardened child key");
      }
      // Hardened child: 0x00 || ser256(kpar) || ser32(index)
      data = concatBytes(new Uint8Array([0]), this.privKey, data);
    } else {
      // Normal child: serP(point(kpar)) || ser32(index)
      data = concatBytes(this.pubKey, data);
    }
    const I = hmac(sha512, this.chainCode, data);
    const child = new HDKey(this.versions);
    try {
      // Private parent key -> private child key
      if (this.privateKey) {
        child.privateKey = secp256k1.privateKeyTweakAdd(
          this.privateKey.slice(),
          I.slice(0, 32)
        );
      } else {
        child.publicKey = secp256k1.publicKeyTweakAdd(
          this.pubKey.slice(),
          I.slice(0, 32),
          true
        );
      }
    } catch (err) {
      return this.deriveChild(index + 1);
    }
    child.chainCode = I.slice(32);
    child.depth = this.depth + 1;
    child.parentFingerprint = this.fingerprint;
    child.index = index;
    return child;
  }
  public sign(hash: Uint8Array): Uint8Array {
    if (!this.privateKey) {
      throw new Error("No privateKey set!");
    }
    return secp256k1.ecdsaSign(hash, this.privateKey).signature;
  }
  public verify(hash: Uint8Array, signature: Uint8Array): boolean {
    if (!this.publicKey) {
      throw new Error("No publicKey set!");
    }
    return secp256k1.ecdsaVerify(signature, hash, this.publicKey!);
  }
  public wipePrivateData(): this {
    if (this.privKey) {
      this.privKey.set(random.getRandomBytesSync(this.privKey.length));
    }
    this.privKey = undefined;
    return this;
  }
  public toJSON(): { xpriv: string; xpub: string } {
    return {
      xpriv: this.privateExtendedKey,
      xpub: this.publicExtendedKey
    };
  }

  private serialize(version: number, key: Uint8Array) {
    if (!this.chainCode) {
      throw new Error("No chainCode set");
    }
    assertBytes(key, 33);
    // version(4) || depth(1) || fingerprint(4) || index(4) || chain(32) || key(33)
    return concatBytes(
      toU32(version),
      new Uint8Array([this.depth]),
      toU32(this.parentFingerprint),
      toU32(this.index),
      this.chainCode,
      key
    );
  }
}
