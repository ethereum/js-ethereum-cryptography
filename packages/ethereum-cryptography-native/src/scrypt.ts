const scryptNative = require("scrypt");

export function scrypt(
  password: Buffer,
  salt: Buffer,
  n: number,
  p: number,
  r: number,
  dklen: number
): Promise<Buffer> {
  return scryptNative.hash(password, { N: n, r, p }, dklen, salt);
}

export function scryptSync(
  password: Buffer,
  salt: Buffer,
  n: number,
  p: number,
  r: number,
  dklen: number
): Buffer {
  return scryptNative.hashSync(password, { N: n, r, p }, dklen, salt);
}
