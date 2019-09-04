import { keccak_224, keccak_256, keccak_384, keccak_512 } from "js-sha3";

export function keccak224(msg: Buffer): Buffer {
  return Buffer.from(keccak_224.arrayBuffer(msg));
}

export function keccak256(msg: Buffer): Buffer {
  return Buffer.from(keccak_256.arrayBuffer(msg));
}

export function keccak384(msg: Buffer): Buffer {
  return Buffer.from(keccak_384.arrayBuffer(msg));
}

export function keccak512(msg: Buffer): Buffer {
  return Buffer.from(keccak_512.arrayBuffer(msg));
}
