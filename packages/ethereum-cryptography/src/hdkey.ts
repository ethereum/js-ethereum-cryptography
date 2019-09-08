import * as hdkeyPure from "./pure/hdkey";

let hdkey: typeof hdkeyPure.HDKey;

try {
  // tslint:disable-next-line no-implicit-dependencies
  hdkey = require("ethereum-cryptography-native/hdkey").HDKey;
} catch {
  // This module is slightly more complicated, as we don't want to use the
  // 100% pure version of hdkey if the native one isn't installed.

  // We require this local version of hdkey-without-crypto because it uses
  // the built-in crypto module
  hdkey = require("./vendor/hdkey-without-crypto");
}

export const HDKey = hdkey;
