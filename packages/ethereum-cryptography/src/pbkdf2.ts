import crypto from "crypto";

export function pbkdf2(
  password: Buffer,
  salt: Buffer,
  iterations: number,
  keylen: number,
  digest: string
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, iterations, keylen, digest, (err, result) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(result);
    });
  });
}

export function pbkdf2Sync(
  password: Buffer,
  salt: Buffer,
  iterations: number,
  keylen: number,
  digest: string
): Buffer {
  return crypto.pbkdf2Sync(password, salt, iterations, keylen, digest);
}
