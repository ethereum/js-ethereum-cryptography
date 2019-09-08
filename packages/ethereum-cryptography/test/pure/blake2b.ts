import { blake2b } from "../../src/pure/blake2b";
import { createTests } from "../test-vectors/blake2b";

createTests(blake2b);
