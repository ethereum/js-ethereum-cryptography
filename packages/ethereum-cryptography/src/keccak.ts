import * as keccakPure from "./pure/keccak";

let keccakModule: typeof keccakPure;

try {
  // tslint:disable-next-line no-implicit-dependencies
  keccakModule = require("ethereum-cryptography-native/keccak");
} catch {
  keccakModule = keccakPure;
}

export const keccak224 = keccakModule.keccak224;
export const keccak256 = keccakModule.keccak256;
export const keccak384 = keccakModule.keccak384;
export const keccak512 = keccakModule.keccak512;
