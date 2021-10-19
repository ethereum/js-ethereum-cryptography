import * as sha3 from "noble-hashes/lib/sha3";
import { wrapHash } from "./utils";

export const keccak224 = wrapHash(sha3.keccak_224);
export const keccak256 = wrapHash(sha3.keccak_256);
export const keccak384 = wrapHash(sha3.keccak_384);
export const keccak512 = wrapHash(sha3.keccak_512);
