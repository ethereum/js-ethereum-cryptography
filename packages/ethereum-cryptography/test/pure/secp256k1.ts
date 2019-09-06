import { publicKeyConvert, recover, sign } from "../../src/pure/secp256k1";
import { createTests } from "../test-vectors/secp256k1";

createTests(sign, recover, publicKeyConvert);
