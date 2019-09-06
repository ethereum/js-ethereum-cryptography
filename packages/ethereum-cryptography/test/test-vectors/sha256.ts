import { assert } from "chai";

const TEST_VECTORS = [
  {
    input: Buffer.from("", "ascii"),
    output: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
  },
  {
    input: Buffer.from("abc", "ascii"),
    output: "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad"
  },
  {
    input: Buffer.from(
      "abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq",
      "ascii"
    ),
    output: "248d6a61d20638b8e5c026930c3e6039a33ce45964ff2167f6ecedd419db06c1"
  },
  {
    input: Buffer.from(
      "abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq",
      "ascii"
    ),
    output: "248d6a61d20638b8e5c026930c3e6039a33ce45964ff2167f6ecedd419db06c1"
  }
];

export function createTests(hash: (msg: Buffer) => Buffer) {
  describe("sha256", function() {
    for (const [i, vector] of TEST_VECTORS.entries()) {
      it(`Should return the right hash for the test ${i}`, async function() {
        assert.equal(hash(vector.input).toString("hex"), vector.output);
      });
    }
  });
}
