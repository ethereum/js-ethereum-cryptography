import * as hdkeyPure from "./pure/hdkey";

let hdkeyModule: typeof hdkeyPure;

try {
  // tslint:disable-next-line no-implicit-dependencies
  hdkeyModule = require("ethereum-cryptography-native/hdkey");
} catch {
  // This module is slightly more complicated, as we don't want to use the
  // 100% pure version of hdkey if the native one isn't installed.

  // We require this local version of hdkey-without-crypto because it uses
  // the built-in crypto module
  hdkeyModule = require("./vendor/hdkey-without-crypto");
}

export = hdkeyModule;
