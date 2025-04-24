import { ripemd160 as _ripemd160 } from "@noble/hashes/legacy";
import { wrapHash } from "./utils.js";

export const ripemd160 = wrapHash(_ripemd160);
