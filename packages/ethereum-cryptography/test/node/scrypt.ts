import { scrypt, scryptAsync } from "../../src/scrypt";
import { createTests } from "../test-vectors/scrypt";

createTests(scrypt, scryptAsync);
