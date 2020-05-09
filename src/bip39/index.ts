import * as bip39Pure from "../pure/bip39";

let bip39Module: typeof bip39Pure;

try {
  // tslint:disable-next-line no-implicit-dependencies
  bip39Module = require("ethereum-cryptography-native/bip39");
} catch {
  bip39Module = require("../pure/bip39");
}

export const generateMnemonic = bip39Module.generateMnemonic;
export const mnemonicToEntropy = bip39Module.mnemonicToEntropy;
export const entropyToMnemonic = bip39Module.entropyToMnemonic;
export const validateMnemonic = bip39Module.validateMnemonic;
export const mnemonicToSeed = bip39Module.mnemonicToSeed;
export const mnemonicToSeedSync = bip39Module.mnemonicToSeedSync;
