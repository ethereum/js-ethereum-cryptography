import { blake2b as _blake2b } from "@noble/hashes/blake2";
import { assertBytes } from "./utils.js";

export const blake2b = (msg: Uint8Array, outputLength = 64): Uint8Array => {
  assertBytes(msg);
  if (outputLength <= 0 || outputLength > 64) {
    throw Error("Invalid outputLength");
  }
  return _blake2b(msg, { dkLen: outputLength });
};
