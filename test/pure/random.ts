import { getRandomBytes, getRandomBytesSync } from "../../src/random";
import { createTests } from "../test-vectors/random";

createTests(getRandomBytesSync, getRandomBytes);
