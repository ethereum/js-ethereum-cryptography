import { scrypt, scryptSync } from "../../src/pure/scrypt";
import { createTests } from "../test-vectors/scrypt";

createTests(scryptSync, scrypt);
