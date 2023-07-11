import { scrypt as _sync, scryptAsync as _async } from "@noble/hashes/scrypt";
import { assertBytes } from "./utils.js";

type OnProgressCallback = (progress: number) => void;

export async function scrypt(
  password: Uint8Array,
  salt: Uint8Array,
  n: number,
  p: number,
  r: number,
  dkLen: number,
  onProgress?: OnProgressCallback
): Promise<Uint8Array> {
  assertBytes(password);
  assertBytes(salt);
  return _async(password, salt, { N: n, r, p, dkLen, onProgress });
}

export function scryptSync(
  password: Uint8Array,
  salt: Uint8Array,
  n: number,
  p: number,
  r: number,
  dkLen: number,
  onProgress?: OnProgressCallback
): Uint8Array {
  assertBytes(password);
  assertBytes(salt);
  return _sync(password, salt, { N: n, r, p, dkLen, onProgress });
}
