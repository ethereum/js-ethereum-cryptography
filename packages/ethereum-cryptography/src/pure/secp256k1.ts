// tslint:disable-next-line no-implicit-dependencies
import * as Secp256k1T from "secp256k1";

const secp256k1 = require("../elliptic-secp256k1");

export const privateKeyVerify: typeof Secp256k1T.privateKeyVerify =
  secp256k1.privateKeyVerify;

export const privateKeyExport: typeof Secp256k1T.privateKeyExport =
  secp256k1.privateKeyExport;

export const privateKeyImport: typeof Secp256k1T.privateKeyImport =
  secp256k1.privateKeyImport;

export const privateKeyNegate: typeof Secp256k1T.privateKeyNegate =
  secp256k1.privateKeyNegate;

export const privateKeyModInverse: typeof Secp256k1T.privateKeyModInverse =
  secp256k1.privateKeyModInverse;

export const privateKeyTweakAdd: typeof Secp256k1T.privateKeyTweakAdd =
  secp256k1.privateKeyTweakAdd;

export const privateKeyTweakMul: typeof Secp256k1T.privateKeyTweakMul =
  secp256k1.privateKeyTweakMul;

export const publicKeyCreate: typeof Secp256k1T.publicKeyCreate =
  secp256k1.publicKeyCreate;

export const publicKeyConvert: typeof Secp256k1T.publicKeyConvert =
  secp256k1.publicKeyConvert;

export const publicKeyVerify: typeof Secp256k1T.publicKeyVerify =
  secp256k1.publicKeyVerify;

export const publicKeyTweakAdd: typeof Secp256k1T.publicKeyTweakAdd =
  secp256k1.publicKeyTweakAdd;

export const publicKeyTweakMul: typeof Secp256k1T.publicKeyTweakMul =
  secp256k1.publicKeyTweakMul;

export const publicKeyCombine: typeof Secp256k1T.publicKeyCombine =
  secp256k1.publicKeyCombine;

export const signatureNormalize: typeof Secp256k1T.signatureNormalize =
  secp256k1.signatureNormalize;

export const signatureExport: typeof Secp256k1T.signatureExport =
  secp256k1.signatureExport;

export const signatureImport: typeof Secp256k1T.signatureImport =
  secp256k1.signatureImport;

export const signatureImportLax: typeof Secp256k1T.signatureImportLax =
  secp256k1.signatureImportLax;

export const sign: typeof Secp256k1T.sign = secp256k1.sign;

export const verify: typeof Secp256k1T.verify = secp256k1.verify;

export const recover: typeof Secp256k1T.recover = secp256k1.recover;

export const ecdh: typeof Secp256k1T.ecdh = secp256k1.ecdh;

export const ecdhUnsafe: typeof Secp256k1T.ecdhUnsafe = secp256k1.ecdhUnsafe;
