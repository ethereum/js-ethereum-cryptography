import crypto from "crypto";

export function getRandomBytes(bytes: number): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(bytes, function(err: any, resp: Buffer) {
      if (err) {
        reject(err);
        return;
      }

      resolve(resp);
    });
  });
}

export function getRandomBytesSync(bytes: number): Buffer {
  return crypto.randomBytes(bytes);
}
