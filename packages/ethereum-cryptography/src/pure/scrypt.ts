const scryptsy = require("scryptsy");

export function scrypt(
  password: Buffer,
  salt: Buffer,
  n: number,
  p: number,
  r: number,
  dklen: number
): Buffer {
  return scryptsy(password, salt, n, r, p, dklen);
}

export async function scryptAsync(
  password: Buffer,
  salt: Buffer,
  n: number,
  p: number,
  r: number,
  dklen: number
): Promise<Buffer> {
  return scryptsy.async(password, salt, n, r, p, dklen);
}
