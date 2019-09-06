import { assert } from "chai";

const TEST_VECTORS = [
  {
    input: Buffer.from("", "ascii"),
    output: "9c1185a5c5e9fc54612808977ee8f548b2258d31"
  },
  {
    input: Buffer.from("a", "ascii"),
    output: "0bdc9d2d256b3ee9daae347be6f4dc835a467ffe"
  },
  {
    input: Buffer.from("abc", "ascii"),
    output: "8eb208f7e05d987a9b044a8e98c6b087f15a0bfc"
  },
  {
    input: Buffer.from("message digest", "ascii"),
    output: "5d0689ef49d2fae572b881b123a85ffa21595f36"
  }
];

export function createTests(hash: (msg: Buffer) => Buffer) {
  describe("ripemd160", function() {
    for (const [i, vector] of TEST_VECTORS.entries()) {
      it(`Should return the right hash for the test ${i}`, async function() {
        assert.equal(hash(vector.input).toString("hex"), vector.output);
      });
    }
  });
}
