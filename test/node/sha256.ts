import { sha256 } from "../../src/sha256";
import { createTests } from "../test-vectors/sha256";

createTests(sha256);
