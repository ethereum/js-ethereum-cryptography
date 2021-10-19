import { ripemd160 as _ripemd160 } from "noble-hashes/lib/ripemd160";
import { wrapHash } from "./utils";

export const ripemd160 = wrapHash(_ripemd160);
