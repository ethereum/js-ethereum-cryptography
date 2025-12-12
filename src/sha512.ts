import { sha512 as _sha512 } from "@noble/hashes/sha2.js";
import { wrapHash } from "./utils.js";

export const sha512 = wrapHash(_sha512);
