import { assert } from "chai";

export function createTestsForVector(
  hash: (msg: Buffer) => Buffer,
  vectors: typeof keccak224Vectors
) {
  describe(hash.name, function() {
    for (const [i, vector] of vectors.entries()) {
      it(`Should return the correct hash for test ${i}`, function() {
        assert.equal(hash(vector.input).toString("hex"), vector.output);
      });
    }
  });
}

export const keccak224Vectors = [
  {
    input: Buffer.from([]),
    output: "f71837502ba8e10837bdd8d365adb85591895602fc552b48b7390abd"
  },
  {
    input: Buffer.from("41", "hex"),
    output: "ef40b16ff375c834e91412489889f36538748c5454f4b02ba750b65e"
  },
  {
    input: Buffer.from("asd", "ascii"),
    output: "c8cc732c0fa9004eb33d5d833ca22fbd27f21f1c53ef5670bc6779ca"
  }
];

export const keccak256Vectors = [
  {
    input: Buffer.from([]),
    output: "c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470"
  },
  {
    input: Buffer.from("41", "hex"),
    output: "03783fac2efed8fbc9ad443e592ee30e61d65f471140c10ca155e937b435b760"
  },
  {
    input: Buffer.from("asd", "ascii"),
    output: "87c2d362de99f75a4f2755cdaaad2d11bf6cc65dc71356593c445535ff28f43d"
  }
];

export const keccak384Vectors = [
  {
    input: Buffer.from([]),
    output:
      "2c23146a63a29acf99e73b88f8c24eaa7dc60aa771780ccc006afbfa8fe2479b2dd2b21362337441ac12b515911957ff"
  },
  {
    input: Buffer.from("41", "hex"),
    output:
      "5c744cf4b4e3fb8967189e9744261a74f0ef31cdd8850554c737803585ac109039b73c22c50ea866c94debf1061f37a4"
  },
  {
    input: Buffer.from("asd", "ascii"),
    output:
      "50efbfa7d5aa41e132c3cfba2bc503d0014eb5bf6d214420851bff0f284bc9a5383a49327600e2efc3ad9db3621decaf"
  }
];

export const keccak512Vectors = [
  {
    input: Buffer.from([]),
    output:
      "0eab42de4c3ceb9235fc91acffe746b29c29a8c366b7c60e4e67c466f36a4304c00fa9caf9d87976ba469bcbe06713b435f091ef2769fb160cdab33d3670680e"
  },
  {
    input: Buffer.from("41", "hex"),
    output:
      "421a35a60054e5f383b6137e43d44e998f496748cc77258240ccfaa8730b51f40cf47c1bc09c728a8cd4f096731298d51463f15af89543fed478053346260c38"
  },
  {
    input: Buffer.from("asd", "ascii"),
    output:
      "3fb67c8b512d8ce73324db02dda2d19ebfb9d6a923c48fb503be3e0c7c752eb84e4da0818665133a27638dce8e9e8696a51b64b6b247354764609f22b4e65d35"
  }
];
