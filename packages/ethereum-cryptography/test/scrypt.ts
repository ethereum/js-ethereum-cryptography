import { assert } from "chai";
import { scrypt, scryptAsync } from "../src/scrypt";

const TEST_VECTORS = [
  {
    password: "",
    salt: "",
    N: 16,
    p: 1,
    r: 1,
    dkLen: 64,
    derivedKey:
      "77d6576238657b203b19ca42c18a0497f16b4844e3074ae8dfdffa3fede21442fcd0069ded0948f8326a753a0fc81f17e8d3e0fb2e0d3628cf35e20c38d18906"
  },
  {
    password: "70617373776f7264",
    salt: "4e61436c",
    N: 1024,
    p: 16,
    r: 8,
    dkLen: 64,
    derivedKey:
      "fdbabe1c9d3472007856e7190d01e9fe7c6ad7cbc8237830e77376634b3731622eaf30d92e22a3886ff109279d9830dac727afb94a83ee6d8360cbdfa2cc0640"
  },
  {
    password: "706c656173656c65746d65696e",
    salt: "536f6469756d43686c6f72696465",
    N: 16384,
    p: 1,
    r: 8,
    dkLen: 64,
    derivedKey:
      "7023bdcb3afd7348461c06cd81fd38ebfda8fbba904f8e3ea9b543f6545da1f2d5432955613f0fcf62d49705242a9af9e61e85dc0d651e40dfcf017b45575887"
  }
];

describe("scrypt", function() {
  describe("scrypt sync", function() {
    for (let i = 0; i < TEST_VECTORS.length; i++) {
      it(`Should process the test ${i} correctly`, function() {
        this.enableTimeouts(false);

        const vector = TEST_VECTORS[i];

        const derived = scrypt(
          Buffer.from(vector.password, "hex"),
          Buffer.from(vector.salt, "hex"),
          +vector.N,
          +vector.p,
          +vector.r,
          +vector.dkLen
        );

        assert.equal(derived.toString("hex"), vector.derivedKey);
      });
    }
  });

  describe("scrypt async", function() {
    for (let i = 0; i < TEST_VECTORS.length; i++) {
      it(`Should process the test ${i} correctly`, async function() {
        this.enableTimeouts(false);

        const vector = TEST_VECTORS[i];

        const derived = await scryptAsync(
          Buffer.from(vector.password, "hex"),
          Buffer.from(vector.salt, "hex"),
          +vector.N,
          +vector.p,
          +vector.r,
          +vector.dkLen
        );

        assert.equal(derived.toString("hex"), vector.derivedKey);
      });
    }
  });
});
