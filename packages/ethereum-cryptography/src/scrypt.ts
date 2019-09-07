import * as scryptPure from "./pure/scrypt";

let scryptModule: typeof scryptPure;

try {
  // tslint:disable-next-line no-implicit-dependencies
  scryptModule = require("ethereum-cryptography-native/scrypt");
} catch {
  // This module is slightly more complicated, as we don't want to use the
  // 100% pure version of scrypt if the native one isn't installed.

  // We require this local version of scryptsy-without-crypto because it uses
  // the built-in implementation of pbkdf2
  const scryptsy = require("./vendor/scryptsy-without-crypto");

  scryptModule = {
    scrypt(
      password: Buffer,
      salt: Buffer,
      n: number,
      p: number,
      r: number,
      dklen: number
    ): Promise<Buffer> {
      return scryptsy.async(password, salt, n, r, p, dklen);
    },
    scryptSync(
      password: Buffer,
      salt: Buffer,
      n: number,
      p: number,
      r: number,
      dklen: number
    ): Buffer {
      return scryptsy(password, salt, n, r, p, dklen);
    }
  };
}

export const scrypt = scryptModule.scrypt;
export const scryptSync = scryptModule.scryptSync;
