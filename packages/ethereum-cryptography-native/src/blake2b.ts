const blake2bNative = require("blake2");

export function blake2b(input: Buffer, outputLength = 64): Buffer {
  if (outputLength <= 0 || outputLength > 64) {
    throw Error("Invalid outputLength");
  }

  const hash = blake2bNative.createHash("blake2b", {
    digestLength: outputLength
  });

  hash.update(input);

  return Buffer.from(hash.digest());
}
