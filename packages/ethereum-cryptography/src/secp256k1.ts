import * as secp256k1Pure from "./pure/secp256k1";

let secp256k1Module: typeof secp256k1Pure;

try {
  // tslint:disable-next-line no-implicit-dependencies
  secp256k1Module = require("ethereum-cryptography-native/secp256k1");
} catch {
  secp256k1Module = require("./pure/secp256k1");
}

export const privateKeyVerify = secp256k1Module.privateKeyVerify;
export const privateKeyExport = secp256k1Module.privateKeyExport;
export const privateKeyImport = secp256k1Module.privateKeyImport;
export const privateKeyNegate = secp256k1Module.privateKeyNegate;
export const privateKeyModInverse = secp256k1Module.privateKeyModInverse;
export const privateKeyTweakAdd = secp256k1Module.privateKeyTweakAdd;
export const privateKeyTweakMul = secp256k1Module.privateKeyTweakMul;
export const publicKeyCreate = secp256k1Module.publicKeyCreate;
export const publicKeyConvert = secp256k1Module.publicKeyConvert;
export const publicKeyVerify = secp256k1Module.publicKeyVerify;
export const publicKeyTweakAdd = secp256k1Module.publicKeyTweakAdd;
export const publicKeyTweakMul = secp256k1Module.publicKeyTweakMul;
export const publicKeyCombine = secp256k1Module.publicKeyCombine;
export const signatureNormalize = secp256k1Module.signatureNormalize;
export const signatureExport = secp256k1Module.signatureExport;
export const signatureImport = secp256k1Module.signatureImport;
export const signatureImportLax = secp256k1Module.signatureImportLax;
export const sign = secp256k1Module.sign;
export const verify = secp256k1Module.verify;
export const recover = secp256k1Module.recover;
export const ecdh = secp256k1Module.ecdh;
export const ecdhUnsafe = secp256k1Module.ecdhUnsafe;
