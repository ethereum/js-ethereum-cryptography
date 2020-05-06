const browserifyAes = require("browserify-aes");

function ensureAesMode(mode: string) {
  if (!mode.startsWith("aes-")) {
    throw new Error(`AES submodule doesn't support mode ${mode}`);
  }
}

export function encrypt(
  msg: Buffer,
  key: Buffer,
  iv: Buffer,
  mode: string,
  pkcs7PaddingEnabled = true
): Buffer {
  ensureAesMode(mode);

  const cipher = browserifyAes.createCipheriv(mode, key, iv);
  cipher.setAutoPadding(pkcs7PaddingEnabled);

  const encrypted = cipher.update(msg);
  const final = cipher.final();

  return Buffer.concat([encrypted, final]);
}

export function decrypt(
  cypherText: Buffer,
  key: Buffer,
  iv: Buffer,
  mode: string,
  pkcs7PaddingEnabled = true
): Buffer {
  ensureAesMode(mode);

  const decipher = browserifyAes.createDecipheriv(mode, key, iv);
  decipher.setAutoPadding(pkcs7PaddingEnabled);

  const encrypted = decipher.update(cypherText);
  const final = decipher.final();

  return Buffer.concat([encrypted, final]);
}
