const Sha256Hash = require("hash.js/lib/hash/sha/256");

export function sha256(msg: Buffer): Buffer {
  const hash = new Sha256Hash();
  hash.update(msg);

  return Buffer.from(hash.digest());
}
