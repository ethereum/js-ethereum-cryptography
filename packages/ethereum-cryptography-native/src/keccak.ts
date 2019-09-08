const createKeccakHash = require("keccak");

export function keccak224(msg: Buffer): Buffer {
  const hash = createKeccakHash("keccak224");
  hash.update(msg);
  return Buffer.from(hash.digest(), "binary");
}

export function keccak256(msg: Buffer): Buffer {
  const hash = createKeccakHash("keccak256");
  hash.update(msg);
  return Buffer.from(hash.digest(), "binary");
}

export function keccak384(msg: Buffer): Buffer {
  const hash = createKeccakHash("keccak384");
  hash.update(msg);
  return Buffer.from(hash.digest(), "binary");
}

export function keccak512(msg: Buffer): Buffer {
  const hash = createKeccakHash("keccak512");
  hash.update(msg);
  return Buffer.from(hash.digest(), "binary");
}
