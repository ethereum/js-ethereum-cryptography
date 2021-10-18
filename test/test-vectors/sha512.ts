import { sha512 } from "../../src/sha512";
import { toHex, utf8ToBytes } from "../../src/utils";
import { deepStrictEqual } from "./assert";

const TEST_VECTORS = [
  {
    input: utf8ToBytes(""),
    output: "cf83e1357eefb8bd f1542850d66d8007 d620e4050b5715dc 83f4a921d36ce9ce 47d0d13c5d85f2b0 ff8318d2877eec2f 63b931bd47417a81 a538327af927da3e"
  },
  {
    input: utf8ToBytes("abc"),
    output: "ddaf35a193617aba cc417349ae204131 12e6fa4e89a97ea2 0a9eeee64b55d39a 2192992a274fc1a8 36ba3c23a3feebbd454d4423643ce80e2a9ac94fa54ca49f"
  },
  {
    input: utf8ToBytes(
      "abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq"
    ),
    output: "204a8fc6dda82f0a 0ced7beb8e08a416 57c16ef468b228a8 279be331a703c335 96fd15c13b1b07f9 aa1d3bea57789ca0 31ad85c7a71dd703 54ec631238ca3445"
  },
  {
    input: utf8ToBytes(
      "abcdefghbcdefghicdefghijdefghijkefghijklfghijklmghijklmnhijklmnoijklmnopjklmnopqklmnopqrlmnopqrsmnopqrstnopqrstu"
    ),
    output: "8e959b75dae313da 8cf4f72814fc143f 8f7779c6eb9f7fa1 7299aeadb6889018 501d289e4900f7e4 331b99dec4b5433a c7d329eeb6dd2654 5e96e55b874be909"
  }
];

describe("sha512", function() {
  for (const [i, vector] of TEST_VECTORS.entries()) {
    it(`Should return the right hash for the test ${i}`, async function() {
      deepStrictEqual(toHex(sha512(vector.input)), vector.output.replace(/ /g, ''));
    });
  }
});
