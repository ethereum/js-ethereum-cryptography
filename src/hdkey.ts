import { base58check } from "micro-base";
import { hmac } from "noble-hashes/lib/hmac";
import { ripemd160 } from "noble-hashes/lib/ripemd160";
import { sha256 } from "noble-hashes/lib/sha256";
import { sha512 } from "noble-hashes/lib/sha512";
import { bytesToHex } from "noble-hashes/lib/utils";
import * as secp from "noble-secp256k1";
import {
  assertBytes,
  concatBytes,
  createView,
  hexToBytes,
  utf8ToBytes
} from "./utils";
const base58c = base58check(sha256);

// Enable sync API for noble-secp256k1
secp.utils.hmacSha256Sync = (key: Uint8Array, ...msgs: Uint8Array[]) => {
  const h = hmac.create(sha256, key);
  for (const msg of msgs) {
    h.update(msg);
  }
  return h.digest();
};

function bytesToNumber(bytes: Uint8Array): bigint {
  return BigInt(`0x${bytesToHex(bytes)}`);
}

function numberToBytes(num: bigint): Uint8Array {
  return hexToBytes(num.toString(16).padStart(64, "0"));
}

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
    const keyBuffer: Uint8Array = base58c.decode(base58key);
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
  private privKey?: bigint;
  private privKeyBytes?: Uint8Array;
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
    return this.privKeyBytes || null;
  }
  set privateKey(value: Uint8Array | bigint | null) {
    if (value == null) {
      this.wipePrivateData();
      return;
    }
    if (!secp.utils.isValidPrivateKey(value)) {
      throw new Error("Invalid private key");
    }
    this.privKey = typeof value === "bigint" ? value : bytesToNumber(value);
    this.privKeyBytes = numberToBytes(this.privKey);
    this.pubKey = secp.getPublicKey(value, true);
    this.pubHash = hash160(this.pubKey);
  }
  get publicKey(): Uint8Array | null {
    return this.pubKey || null;
  }
  set publicKey(value: Uint8Array | null) {
    let hex;
    try {
      hex = secp.Point.fromHex(value!);
    } catch (error) {
      throw new Error("Invalid public key");
    }
    this.pubKey = hex.toRawBytes(true); // force compressed point
    this.pubHash = hash160(this.pubKey);
    this.privKey = undefined;
  }

  get privateExtendedKey(): string {
    const priv = this.privateKey;
    if (!priv) {
      throw new Error("No private key");
    }
    return base58c.encode(
      this.serialize(
        this.versions.private,
        concatBytes(new Uint8Array([0]), priv)
      )
    );
  }
  get publicExtendedKey(): string {
    if (!this.pubKey) {
      throw new Error("No public key");
    }
    return base58c.encode(this.serialize(this.versions.public, this.pubKey));
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
      const priv = this.privateKey;
      if (!priv) {
        throw new Error("Could not derive hardened child key");
      }
      // Hardened child: 0x00 || ser256(kpar) || ser32(index)
      data = concatBytes(new Uint8Array([0]), priv, data);
    } else {
      // Normal child: serP(point(kpar)) || ser32(index)
      data = concatBytes(this.pubKey, data);
    }
    const I = hmac(sha512, this.chainCode, data);
    const childTweak = bytesToNumber(I.slice(0, 32));
    const chainCode = I.slice(32);
    if (childTweak > secp.CURVE.n) {
      throw new Error("Tweak bigger than curve order");
    }
    const child = new HDKey(this.versions);
    try {
      // Private parent key -> private child key
      if (this.privateKey) {
        let added = this.privKey! + childTweak;
        if (added >= secp.CURVE.n) {
          added -= secp.CURVE.n;
        }
        if (added === 0n) {
          throw new Error(
            "The tweak was out of range or the resulted private key is invalid"
          );
        }
        child.privateKey = added;
      } else {
        child.publicKey = secp.Point.fromHex(this.pubKey)
          .add(secp.Point.fromPrivateKey(childTweak))
          .toRawBytes(true);
      }
    } catch (err) {
      return this.deriveChild(index + 1);
    }
    child.chainCode = chainCode;
    child.depth = this.depth + 1;
    child.parentFingerprint = this.fingerprint;
    child.index = index;
    return child;
  }
  public sign(hash: Uint8Array): Uint8Array {
    if (!this.privateKey) {
      throw new Error("No privateKey set!");
    }
    assertBytes(hash, 32);
    return secp.signSync(hash, this.privKey!, { canonical: true, der: false });
  }
  public verify(hash: Uint8Array, signature: Uint8Array): boolean {
    assertBytes(hash, 32);
    assertBytes(signature, 64);
    if (!this.publicKey) {
      throw new Error("No publicKey set!");
    }
    let sig;
    try {
      sig = secp.Signature.fromCompact(signature);
    } catch (error) {
      return false;
    }
    return secp.verify(sig, hash, this.publicKey);
  }
  public wipePrivateData(): this {
    if (this.privKey) {
      this.privKey = undefined;
      this.privKeyBytes!.fill(0);
      this.privKeyBytes = undefined;
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
