import { scrypt, scryptSync } from "../../src/scrypt";
import { createTests } from "../test-vectors/scrypt";

createTests(scryptSync, scrypt);
