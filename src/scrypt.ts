import {
  scrypt as _scrypt,
  scryptAsync as _scryptAsync
} from "@noble/hashes/scrypt";
import { assertBytes } from "./utils";

export async function scrypt(
  password: Uint8Array,
  salt: Uint8Array,
  n: number,
  p: number,
  r: number,
  dkLen: number
): Promise<Uint8Array> {
  assertBytes(password);
  assertBytes(salt);
  return _scryptAsync(password, salt, { N: n, r, p, dkLen });
}

export function scryptSync(
  password: Uint8Array,
  salt: Uint8Array,
  n: number,
  p: number,
  r: number,
  dkLen: number
): Uint8Array {
  assertBytes(password);
  assertBytes(salt);
  return _scrypt(password, salt, { N: n, r, p, dkLen });
}
