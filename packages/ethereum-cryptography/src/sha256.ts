import crypto from "crypto";

export function sha256(msg: Buffer): Buffer {
  const hash = crypto.createHash("sha256");
  hash.update(msg);
  return Buffer.from(hash.digest());
}
