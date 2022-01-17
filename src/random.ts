import { randomBytes } from "@noble/hashes/utils";

export function getRandomBytesSync(bytes: number): Uint8Array {
  return randomBytes(bytes);
}

export async function getRandomBytes(bytes: number): Promise<Uint8Array> {
  return randomBytes(bytes);
}
