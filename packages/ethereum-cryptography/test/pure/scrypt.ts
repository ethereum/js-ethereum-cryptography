import { scrypt, scryptAsync } from "../../src/pure/scrypt";
import { createTests } from "../test-vectors/scrypt";

createTests(scrypt, scryptAsync);
