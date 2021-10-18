import { sha512 as _sha512 } from "noble-hashes/lib/sha512";
import { wrapHash } from "./utils";

export const sha512 = wrapHash(_sha512);
