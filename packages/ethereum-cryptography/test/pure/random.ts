import { getRandomBytes, getRandomBytesSync } from "../../src/pure/random";
import { createTests } from "../test-vectors/random";

createTests(getRandomBytesSync, getRandomBytes);
