const blake2bJs = require("blakejs");

export function blake2b(input: Buffer, outputLength = 64): Buffer {
  if (outputLength === 0) {
    throw Error("Invalid outputLength");
  }

  return Buffer.from(blake2bJs.blake2b(input, undefined, outputLength));
}
