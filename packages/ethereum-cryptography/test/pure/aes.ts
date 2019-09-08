import { decrypt, encrypt } from "../../src/pure/aes";
import { createTests } from "../test-vectors/aes";

createTests(encrypt, decrypt);
