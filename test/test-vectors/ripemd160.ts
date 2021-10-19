import { ripemd160 } from "../../src/ripemd160";
import { toHex, utf8ToBytes } from "../../src/utils";
import { deepStrictEqual } from "./assert";

const TEST_VECTORS = [
  {
    input: utf8ToBytes(""),
    output: "9c1185a5c5e9fc54612808977ee8f548b2258d31"
  },
  {
    input: utf8ToBytes("a"),
    output: "0bdc9d2d256b3ee9daae347be6f4dc835a467ffe"
  },
  {
    input: utf8ToBytes("abc"),
    output: "8eb208f7e05d987a9b044a8e98c6b087f15a0bfc"
  },
  {
    input: utf8ToBytes("message digest"),
    output: "5d0689ef49d2fae572b881b123a85ffa21595f36"
  }
];

describe("ripemd160", function() {
  for (const [i, vector] of TEST_VECTORS.entries()) {
    it(`Should return the right hash for the test ${i}`, async function() {
      deepStrictEqual(toHex(ripemd160(vector.input)), vector.output);
    });
  }
});
