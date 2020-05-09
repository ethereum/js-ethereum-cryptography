import { decrypt, encrypt } from "../../src/aes";
import { createTests } from "../test-vectors/aes";

createTests(encrypt, decrypt);
