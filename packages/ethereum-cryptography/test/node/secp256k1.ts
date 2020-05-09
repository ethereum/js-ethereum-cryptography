import { ecdsaRecover, ecdsaSign, publicKeyConvert } from "../../src/secp256k1";
import { createTests } from "../test-vectors/secp256k1";

createTests(ecdsaSign, ecdsaRecover, publicKeyConvert);
