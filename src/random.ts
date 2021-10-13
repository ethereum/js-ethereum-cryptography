import { crypto } from "./utils";

export function getRandomBytesSync(bytes: number): Uint8Array {
  if (crypto.web) {
    return crypto.web.getRandomValues(new Uint8Array(bytes));
  } else if (crypto.node) {
    return new Uint8Array(crypto.node.randomBytes(bytes).buffer);
  } else {
    throw new Error("The environment doesn't have randomBytes function");
  }
}

export async function getRandomBytes(bytes: number): Promise<Uint8Array> {
  return getRandomBytesSync(bytes);
}
