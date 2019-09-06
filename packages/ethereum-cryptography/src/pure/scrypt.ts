const scryptJs = require("scrypt-js");

export function scrypt(
  password: Buffer,
  salt: Buffer,
  n: number,
  p: number,
  r: number,
  dklen: number
): Buffer {
  throw new Error("Not implemented yet");
}

export async function scryptAsync(
  password: Buffer,
  salt: Buffer,
  n: number,
  p: number,
  r: number,
  dklen: number
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scryptJs(password, salt, n, r, p, dklen, function(
      error: any,
      progress: any,
      key: any
    ) {
      if (error) {
        reject(error);
      } else if (key) {
        resolve(Buffer.from(key));
      }
    });
  });
}
