import { sha256 as _sha256 } from "@noble/hashes/sha256";
import { wrapHash } from "./utils";

export const sha256 = wrapHash(_sha256);
