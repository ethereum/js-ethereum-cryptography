import crypto from "crypto";

export function ripemd160(msg: Buffer): Buffer {
  const hash = crypto.createHash("ripemd160");
  hash.update(msg);
  return Buffer.from(hash.digest());
}
