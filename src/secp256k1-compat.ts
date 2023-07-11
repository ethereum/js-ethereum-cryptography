import { sha256 } from "@noble/hashes/sha256";
import { mod } from "@noble/curves/abstract/modular";
import { secp256k1 } from "./secp256k1.js";
import { assertBool, assertBytes, hexToBytes, toHex } from "./utils.js";

// Use `secp256k1` module directly.
// This is a legacy compatibility layer for the npm package `secp256k1` via noble-secp256k1

const Point = secp256k1.ProjectivePoint;

function hexToNumber(hex: string): bigint {
  if (typeof hex !== "string") {
    throw new TypeError("hexToNumber: expected string, got " + typeof hex);
  }
  return BigInt(`0x${hex}`);
}

// Copy-paste from secp256k1, maybe export it?
const bytesToNumber = (bytes: Uint8Array) => hexToNumber(toHex(bytes));
const numberToHex = (num: number | bigint) =>
  num.toString(16).padStart(64, "0");
const numberToBytes = (num: number | bigint) => hexToBytes(numberToHex(num));

const ORDER = secp256k1.CURVE.n;

type Output = Uint8Array | ((len: number) => Uint8Array);
interface Signature {
  signature: Uint8Array;
  recid: number;
}

function output(
  out: Output = (len: number) => new Uint8Array(len),
  length: number,
  value?: Uint8Array
) {
  if (typeof out === "function") {
    out = out(length);
  }
  assertBytes(out, length);
  if (value) {
    out.set(value);
  }
  return out;
}

function getSignature(signature: Uint8Array) {
  assertBytes(signature, 64);
  return secp256k1.Signature.fromCompact(signature);
}

export function createPrivateKeySync(): Uint8Array {
  return secp256k1.utils.randomPrivateKey();
}

export async function createPrivateKey(): Promise<Uint8Array> {
  return createPrivateKeySync();
}

export function privateKeyVerify(privateKey: Uint8Array): boolean {
  assertBytes(privateKey, 32);
  return secp256k1.utils.isValidPrivateKey(privateKey);
}

export function publicKeyCreate(
  privateKey: Uint8Array,
  compressed = true,
  out?: Output
): Uint8Array {
  assertBytes(privateKey, 32);
  assertBool(compressed);
  const res = secp256k1.getPublicKey(privateKey, compressed);
  return output(out, compressed ? 33 : 65, res);
}

export function publicKeyVerify(publicKey: Uint8Array): boolean {
  assertBytes(publicKey, 33, 65);
  try {
    Point.fromHex(publicKey);
    return true;
  } catch (e) {
    return false;
  }
}

export function publicKeyConvert(
  publicKey: Uint8Array,
  compressed = true,
  out?: Output
): Uint8Array {
  assertBytes(publicKey, 33, 65);
  assertBool(compressed);
  const res = Point.fromHex(publicKey).toRawBytes(compressed);
  return output(out, compressed ? 33 : 65, res);
}

export function ecdsaSign(
  msgHash: Uint8Array,
  privateKey: Uint8Array,
  options = { noncefn: undefined, data: undefined },
  out?: Output
): Signature {
  assertBytes(msgHash, 32);
  assertBytes(privateKey, 32);
  if (typeof options !== "object" || options === null) {
    throw new TypeError("secp256k1.ecdsaSign: options should be object");
  }
  // noble-secp256k1 uses hmac instead of hmac-drbg here
  if (
    options &&
    (options.noncefn !== undefined || options.data !== undefined)
  ) {
    throw new Error("Secp256k1: noncefn && data is unsupported");
  }
  const sig = secp256k1.sign(msgHash, privateKey);
  const recid = sig.recovery!;
  return { signature: output(out, 64, sig.toCompactRawBytes()), recid };
}

export function ecdsaRecover(
  signature: Uint8Array,
  recid: number,
  msgHash: Uint8Array,
  compressed = true,
  out?: Output
) {
  assertBytes(msgHash, 32);
  assertBool(compressed);
  const sign = getSignature(signature);
  const point = sign.addRecoveryBit(recid).recoverPublicKey(msgHash);
  return output(out, compressed ? 33 : 65, point.toRawBytes(compressed));
}

export function ecdsaVerify(
  signature: Uint8Array,
  msgHash: Uint8Array,
  publicKey: Uint8Array
) {
  assertBytes(signature, 64);
  assertBytes(msgHash, 32);
  assertBytes(publicKey, 33, 65);
  assertBytes(signature, 64);
  const r = bytesToNumber(signature.slice(0, 32));
  const s = bytesToNumber(signature.slice(32, 64));
  if (r >= ORDER || s >= ORDER) {
    throw new Error("Cannot parse signature");
  }
  const pub = Point.fromHex(publicKey); // can throw error
  pub; // typescript
  let sig;
  try {
    sig = getSignature(signature);
  } catch (error) {
    return false;
  }
  return secp256k1.verify(sig, msgHash, publicKey);
}

export function privateKeyTweakAdd(
  privateKey: Uint8Array,
  tweak: Uint8Array
): Uint8Array {
  assertBytes(privateKey, 32);
  assertBytes(tweak, 32);
  let t = bytesToNumber(tweak);
  if (t === 0n) {
    throw new Error("Tweak must not be zero");
  }
  if (t >= ORDER) {
    throw new Error("Tweak bigger than curve order");
  }
  t += bytesToNumber(privateKey);
  if (t >= ORDER) {
    t -= ORDER;
  }
  if (t === 0n) {
    throw new Error(
      "The tweak was out of range or the resulted private key is invalid"
    );
  }
  privateKey.set(hexToBytes(numberToHex(t)));
  return privateKey;
}

export function privateKeyNegate(privateKey: Uint8Array): Uint8Array {
  assertBytes(privateKey, 32);
  const bn = mod(-bytesToNumber(privateKey), ORDER);
  privateKey.set(hexToBytes(numberToHex(bn)));
  return privateKey;
}

export function publicKeyNegate(
  publicKey: Uint8Array,
  compressed = true,
  out?: Output
) {
  assertBytes(publicKey, 33, 65);
  assertBool(compressed);
  const point = Point.fromHex(publicKey).negate();
  return output(out, compressed ? 33 : 65, point.toRawBytes(compressed));
}

export function publicKeyCombine(
  publicKeys: Uint8Array[],
  compressed = true,
  out?: Output
) {
  if (!Array.isArray(publicKeys) || !publicKeys.length) {
    throw new TypeError(
      `Expected array with one or more items, not ${publicKeys}`
    );
  }
  for (const publicKey of publicKeys) {
    assertBytes(publicKey, 33, 65);
  }
  assertBool(compressed);
  const combined = publicKeys
    .map((pub) => Point.fromHex(pub))
    .reduce((res, curr) => res.add(curr), Point.ZERO);
  // Prohibit returning ZERO point
  if (combined.equals(Point.ZERO)) {
    throw new Error("Combined result must not be zero");
  }
  return output(out, compressed ? 33 : 65, combined.toRawBytes(compressed));
}

export function publicKeyTweakAdd(
  publicKey: Uint8Array,
  tweak: Uint8Array,
  compressed = true,
  out?: Output
) {
  assertBytes(publicKey, 33, 65);
  assertBytes(tweak, 32);
  assertBool(compressed);
  const p1 = Point.fromHex(publicKey);
  const p2 = Point.fromPrivateKey(tweak);
  const point = p1.add(p2);
  if (p2.equals(Point.ZERO) || point.equals(Point.ZERO)) {
    throw new Error("Tweak must not be zero");
  }
  return output(out, compressed ? 33 : 65, point.toRawBytes(compressed));
}

export function publicKeyTweakMul(
  publicKey: Uint8Array,
  tweak: Uint8Array,
  compressed = true,
  out?: Output
) {
  assertBytes(publicKey, 33, 65);
  assertBytes(tweak, 32);
  assertBool(compressed);
  const bn = bytesToNumber(tweak);
  if (bn === 0n) {
    throw new Error("Tweak must not be zero");
  }
  if (bn <= 1 || bn >= ORDER) {
    throw new Error("Tweak is zero or bigger than curve order");
  }
  const point = Point.fromHex(publicKey).multiply(bn);
  return output(out, compressed ? 33 : 65, point.toRawBytes(compressed));
}

export function privateKeyTweakMul(
  privateKey: Uint8Array,
  tweak: Uint8Array
): Uint8Array {
  assertBytes(privateKey, 32);
  assertBytes(tweak, 32);
  const bn = bytesToNumber(tweak);
  if (bn <= 1 || bn >= ORDER) {
    throw new Error("Tweak is zero or bigger than curve order");
  }
  const res = mod(bn * bytesToNumber(privateKey), ORDER);
  if (res === 0n) {
    throw new Error(
      "The tweak was out of range or the resulted private key is invalid"
    );
  }
  privateKey.set(hexToBytes(numberToHex(res)));
  return privateKey;
}
// internal -> DER
export function signatureExport(
  signature: Uint8Array,
  out?: Output
): Uint8Array {
  const res = getSignature(signature).toDERRawBytes();
  return output(out, 72, res.slice()).slice(
    0,
    res.length
  );
}
// DER -> internal
export function signatureImport(
  signature: Uint8Array,
  out?: Output
): Uint8Array {
  assertBytes(signature);
  const sig = secp256k1.Signature.fromDER(signature);
  return output(out, 64, hexToBytes(sig.toCompactHex()));
}

export function signatureNormalize(signature: Uint8Array): Uint8Array {
  const res = getSignature(signature);
  if (res.s > ORDER / 2n) {
    signature.set(numberToBytes(ORDER - res.s), 32);
  }
  return signature;
}

export function ecdh(
  publicKey: Uint8Array,
  privateKey: Uint8Array,
  options: {
    xbuf?: Uint8Array;
    ybuf?: Uint8Array;
    data?: Uint8Array;
    hashfn?: (x: Uint8Array, y: Uint8Array, data: Uint8Array) => Uint8Array;
  } = {},
  out?: Output
) {
  assertBytes(publicKey, 33, 65);
  assertBytes(privateKey, 32);
  if (typeof options !== "object" || options === null) {
    throw new TypeError("secp256k1.ecdh: options should be object");
  }
  if (options.data !== undefined) {
    assertBytes(options.data);
  }
  const point = Point.fromHex(secp256k1.getSharedSecret(privateKey, publicKey));
  if (options.hashfn === undefined) {
    return output(out, 32, sha256(point.toRawBytes(true)));
  }
  if (typeof options.hashfn !== "function") {
    throw new TypeError("secp256k1.ecdh: options.hashfn should be function");
  }
  if (options.xbuf !== undefined) {
    assertBytes(options.xbuf, 32);
  }
  if (options.ybuf !== undefined) {
    assertBytes(options.ybuf, 32);
  }
  assertBytes(out as Uint8Array, 32);
  const { x, y } = point.toAffine();
  const xbuf = options.xbuf || new Uint8Array(32);
  xbuf.set(numberToBytes(x));
  const ybuf = options.ybuf || new Uint8Array(32);
  ybuf.set(numberToBytes(y));
  const hash = options.hashfn(xbuf, ybuf, options.data!);
  if (!(hash instanceof Uint8Array) || hash.length !== 32) {
    throw new Error("secp256k1.ecdh: invalid options.hashfn output");
  }
  return output(out, 32, hash);
}

export function contextRandomize(seed: Uint8Array) {
  if (seed !== null) {
    assertBytes(seed, 32);
  }
  // There is no context to randomize
}
