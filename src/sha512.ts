import { sha512 as _sha512 } from "@noble/hashes/sha512";
import { wrapHash } from "./utils";

export const sha512 = wrapHash(_sha512);
