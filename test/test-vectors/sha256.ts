import { sha256 } from "../../src/sha256";
import { toHex, utf8ToBytes } from "../../src/utils";
import { deepStrictEqual } from "./assert";

const TEST_VECTORS = [
  {
    input: utf8ToBytes(""),
    output: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
  },
  {
    input: utf8ToBytes("abc"),
    output: "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad"
  },
  {
    input: utf8ToBytes(
      "abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq"
    ),
    output: "248d6a61d20638b8e5c026930c3e6039a33ce45964ff2167f6ecedd419db06c1"
  },
  {
    input: utf8ToBytes(
      "abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq"
    ),
    output: "248d6a61d20638b8e5c026930c3e6039a33ce45964ff2167f6ecedd419db06c1"
  }
];

describe("sha256", function() {
  for (const [i, vector] of TEST_VECTORS.entries()) {
    it(`Should return the right hash for the test ${i}`, async function() {
      deepStrictEqual(toHex(sha256(vector.input)), vector.output);
    });
  }
});
