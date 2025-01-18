import { cbc, ctr } from "@noble/ciphers/aes";
import type { CipherWithOutput } from "@noble/ciphers/utils";

function getCipher(
  key: Uint8Array,
  iv: Uint8Array,
  mode: string,
  pkcs7PaddingEnabled = true
): CipherWithOutput {
  if (!mode.startsWith("aes-")) {
    throw new Error("AES: unsupported mode");
  }
  const len = key.length;
  if (
    (mode.startsWith("aes-128") && len !== 16) ||
    (mode.startsWith("aes-256") && len !== 32)
  ) {
    throw new Error("AES: wrong key length");
  }
  if (iv.length !== 16) {
    throw new Error("AES: wrong IV length");
  }
  if (["aes-128-cbc", "aes-256-cbc"].includes(mode)) {
    return cbc(key, iv, { disablePadding: !pkcs7PaddingEnabled });
  }
  if (["aes-128-ctr", "aes-256-ctr"].includes(mode)) {
    return ctr(key, iv);
  }
  throw new Error("AES: unsupported mode");
}

export function encrypt(
  msg: Uint8Array,
  key: Uint8Array,
  iv: Uint8Array,
  mode = "aes-128-ctr",
  pkcs7PaddingEnabled = true
): Uint8Array {
  return getCipher(key, iv, mode, pkcs7PaddingEnabled).encrypt(msg);
}

export function decrypt(
  ciphertext: Uint8Array,
  key: Uint8Array,
  iv: Uint8Array,
  mode = "aes-128-ctr",
  pkcs7PaddingEnabled = true
): Uint8Array {
  return getCipher(key, iv, mode, pkcs7PaddingEnabled).decrypt(ciphertext);
}
