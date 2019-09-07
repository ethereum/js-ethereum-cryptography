import "setimmediate";
const scryptsy = require("./vendor/scryptsy-without-crypto");

export function scrypt(
  password: Buffer,
  salt: Buffer,
  n: number,
  p: number,
  r: number,
  dklen: number
): Promise<Buffer> {
  return scryptsy.async(password, salt, n, r, p, dklen);
}

export function scryptSync(
  password: Buffer,
  salt: Buffer,
  n: number,
  p: number,
  r: number,
  dklen: number
): Buffer {
  return scryptsy(password, salt, n, r, p, dklen);
}
