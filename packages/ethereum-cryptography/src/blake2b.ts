import * as blake2bPure from "./pure/blake2b";

let blake2bModule: typeof blake2bPure;

try {
  // tslint:disable-next-line no-implicit-dependencies
  blake2bModule = require("ethereum-cryptography-native/blake2b");
} catch {
  blake2bModule = require("./pure/blake2b");
}

export const blake2b = blake2bModule.blake2b;
