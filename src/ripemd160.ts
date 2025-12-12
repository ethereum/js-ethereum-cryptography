import { ripemd160 as _ripemd160 } from "@noble/hashes/legacy.js";
import { wrapHash } from "./utils.js";

export const ripemd160 = wrapHash(_ripemd160);
