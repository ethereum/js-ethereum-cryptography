const SHA3 = require("sha3");

export function keccak224(msg: Buffer): Buffer {
  const sha3 = new SHA3.SHA3Hash(224);
  sha3.update(msg);
  return Buffer.from(sha3.digest(), "binary");
}

export function keccak256(msg: Buffer): Buffer {
  const sha3 = new SHA3.SHA3Hash(256);
  sha3.update(msg);
  return Buffer.from(sha3.digest(), "binary");
}

export function keccak384(msg: Buffer): Buffer {
  const sha3 = new SHA3.SHA3Hash(384);
  sha3.update(msg);
  return Buffer.from(sha3.digest(), "binary");
}

export function keccak512(msg: Buffer): Buffer {
  const sha3 = new SHA3.SHA3Hash(512);
  sha3.update(msg);
  return Buffer.from(sha3.digest(), "binary");
}
