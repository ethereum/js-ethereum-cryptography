import {
  pbkdf2 as _pbkdf2,
  pbkdf2Async as _pbkdf2Async
} from "@noble/hashes/pbkdf2";
import { sha256 } from "@noble/hashes/sha256";
import { sha512 } from "@noble/hashes/sha512";
import { assertBytes } from "./utils";

export async function pbkdf2(
  password: Uint8Array,
  salt: Uint8Array,
  iterations: number,
  keylen: number,
  digest: string
): Promise<Uint8Array> {
  if (!["sha256", "sha512"].includes(digest)) {
    throw new Error("Only sha256 and sha512 are supported");
  }
  assertBytes(password);
  assertBytes(salt);
  return _pbkdf2Async(digest === "sha256" ? sha256 : sha512, password, salt, {
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
  if (!["sha256", "sha512"].includes(digest)) {
    throw new Error("Only sha256 and sha512 are supported");
  }
  assertBytes(password);
  assertBytes(salt);
  return _pbkdf2(digest === "sha256" ? sha256 : sha512, password, salt, {
    c: iterations,
    dkLen: keylen
  });
}
