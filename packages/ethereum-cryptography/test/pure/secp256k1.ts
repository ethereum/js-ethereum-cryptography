import {
  createPrivateKey,
  createPrivateKeySync,
  ecdsaRecover,
  ecdsaSign,
  privateKeyVerify,
  publicKeyConvert
} from "../../src/secp256k1";
import { createTests } from "../test-vectors/secp256k1";

createTests(
  ecdsaSign,
  ecdsaRecover,
  publicKeyConvert,
  createPrivateKey,
  createPrivateKeySync,
  privateKeyVerify
);
