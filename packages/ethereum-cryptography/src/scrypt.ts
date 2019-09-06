import * as scryptPure from "./pure/scrypt";

let scryptModule: typeof scryptPure;

try {
  // tslint:disable-next-line no-implicit-dependencies
  scryptModule = require("ethereum-cryptography-native/scrypt");
} catch {
  scryptModule = require("./pure/scrypt");
}

export const scrypt = scryptModule.scrypt;
export const scryptAsync = scryptModule.scryptAsync;
