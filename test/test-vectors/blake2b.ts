import { blake2b } from "../../src/blake2b";
import { hexToBytes, toHex } from "../../src/utils";
import { deepStrictEqual, throws } from "./assert";
// Vectors extracted from https://github.com/emilbayes/blake2b/blob/f0a7c7b550133eca5f5fc3b751ccfd2335ce736f/test-vectors.json
const TEST_VECTORS = [
  {
    outlen: 64,
    out:
      "786a02f742015903c6c6fd852552d272912f4740e15847618a86e217f71f5419d25e1031afee585313896444934eb04b903a685b1448b755d56f701afe9be2ce",
    input: ""
  },
  {
    outlen: 64,
    out:
      "2fa3f686df876995167e7c2e5d74c4c7b6e48f8068fe0e44208344d480f7904c36963e44115fe3eb2a3ac8694c28bcb4f5a0f3276f2e79487d8219057a506e4b",
    input: "00"
  },
  {
    outlen: 64,
    out:
      "1c08798dc641aba9dee435e22519a4729a09b2bfe0ff00ef2dcd8ed6f8a07d15eaf4aee52bbf18ab5608a6190f70b90486c8a7d4873710b1115d3debbb4327b5",
    input: "0001"
  },
  {
    outlen: 64,
    out:
      "40a374727302d9a4769c17b5f409ff32f58aa24ff122d7603e4fda1509e919d4107a52c57570a6d94e50967aea573b11f86f473f537565c66f7039830a85d186",
    input: "000102"
  },
  {
    outlen: 64,
    out:
      "77ddf4b14425eb3d053c1e84e3469d92c4cd910ed20f92035e0c99d8a7a86cecaf69f9663c20a7aa230bc82f60d22fb4a00b09d3eb8fc65ef547fe63c8d3ddce",
    input: "00010203"
  },
  {
    outlen: 64,
    out:
      "cbaa0ba7d482b1f301109ae41051991a3289bc1198005af226c5e4f103b66579f461361044c8ba3439ff12c515fb29c52161b7eb9c2837b76a5dc33f7cb2e2e8",
    input: "0001020304"
  }
];

describe("blake2b", function() {
  for (const [i, vector] of TEST_VECTORS.entries()) {
    it(`Should return the right hash for the test ${i}`, function() {
      const actual = blake2b(hexToBytes(vector.input), vector.outlen);
      deepStrictEqual(toHex(actual), vector.out);
    });
  }

  it("throws if the outputLength is <= 0", function() {
    throws(() => blake2b(hexToBytes(""), 0));
    throws(() => blake2b(hexToBytes(""), -1));
  });

  it("throws if the outputLength is > 64", function() {
    throws(() => blake2b(hexToBytes(""), 65));
  });
});
