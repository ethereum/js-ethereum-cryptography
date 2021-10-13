import {
  pbkdf2 as _pbkdf2,
  pbkdf2Async as _pbkdf2Async
} from "noble-hashes/lib/pbkdf2";
import { sha256 } from "noble-hashes/lib/sha256";
import { assertBytes } from "./utils";

export async function pbkdf2(
  password: Uint8Array,
  salt: Uint8Array,
  iterations: number,
  keylen: number,
  digest: string
): Promise<Uint8Array> {
  if (digest !== "sha256") {
    throw new Error("Only sha256 is supported");
  }
  assertBytes(password);
  assertBytes(salt);
  return _pbkdf2Async(sha256, password, salt, {
    c: iterations,
    dkLen: keylen
  });
}

export function pbkdf2Sync(
  password: Uint8Array,
  salt: Uint8Array,
  iterations: number,
  keylen: number,
  digest: string
): Uint8Array {
  if (digest !== "sha256") {
    throw new Error("Only sha256 is supported");
  }
  assertBytes(password);
  assertBytes(salt);
  return _pbkdf2(sha256, password, salt, {
    c: iterations,
    dkLen: keylen
  });
}
