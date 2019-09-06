const { ripemd160: Ripemd160 } = require("hash.js/lib/hash/ripemd");

export function ripemd160(msg: Buffer): Buffer {
  const hash = new Ripemd160();
  hash.update(msg);

  return Buffer.from(hash.digest());
}
