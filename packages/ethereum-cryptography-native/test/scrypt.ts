import { assert } from "chai";
import * as scryptModuleType from "../src/scrypt";

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
  },
  {
    password: "706c656173656c65746d65696e",
    salt: "536f6469756d43686c6f72696465",
    N: 1048576,
    p: 1,
    r: 8,
    dkLen: 64,
    derivedKey:
      "2101cb9b6a511aaeaddbbe09cf70f881ec568d574a2ffd4dabe5ee9820adaa478e56fd8f4ba5d09ffa1c6d927c40f4c337304049e8a952fbcbf45c6fa77a41a4"
  },
  {
    password: "70617373776f7264",
    salt: "7269636d6f6f",
    N: "262144",
    p: "1",
    r: "8",
    dkLen: "32",
    derivedKey:
      "e286ed0298808c0b4bb4272ce947091b0da06bb530c4cbab3923e44ff48bbc25"
  },
  {
    password:
      "766572792d6c6f672d70617373776f72642d6f7665722d36342d62797465732d30313233343536373839303132333435363738393031323334353637383930313233343536373839303132333435363738393031323334353637383930313233",
    salt: "536f6469756d43686c6f72696465",
    N: "1048576",
    p: "1",
    r: "8",
    dkLen: "64",
    derivedKey:
      "4b6eab5164abdfc2966ad0954ae9352bac57cd953b791eeff455d3eed95802a31fd498b52da430e61ed2aaabd5bc8b1a8eeee66ed11c2bd609877be40210e9a0"
  },
  {
    password: "706c656173656c65746d65696e",
    salt:
      "766572792d6c6f6e672d70617373776f72642d6f7665722d36342d62797465732d30313233343536373839303132333435363738393031323334353637383930313233343536373839303132333435363738393031323334353637383930313233",
    N: "1048576",
    p: "1",
    r: "8",
    dkLen: "64",
    derivedKey:
      "ec1d403e82c01254b9c5ba84ac06958b323ac9f52665024f1ea6ed1edf7aa639e698481e4ce4bf59f7abc3eb8c01de0ba094fe2490e3fae6d29f5c9e5f697868"
  },
  {
    password:
      "766572792d6c6f672d70617373776f72642d6f7665722d36342d62797465732d30313233343536373839303132333435363738393031323334353637383930313233343536373839303132333435363738393031323334353637383930313233",
    salt:
      "766572792d6c6f6e672d70617373776f72642d6f7665722d36342d62797465732d30313233343536373839303132333435363738393031323334353637383930313233343536373839303132333435363738393031323334353637383930313233",
    N: "1048576",
    p: "1",
    r: "8",
    dkLen: "64",
    derivedKey:
      "bd2785eaf74e4e1883a3dd92336346d480200b7b6d0b7904369c607557aa2b14b4cdc90fc8b8f0d4906203a5bd6e064add86aac9ac2fc4777a5a683a0ed40ef9"
  }
];

try {
  const scryptModule = require("../src/scrypt");

  const scrypt: typeof scryptModuleType.scrypt = scryptModule.scrypt;
  const scryptAsync: typeof scryptModuleType.scrypt = scryptModule.scryptAsync;

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
} catch (error) {
  if (error.code === "MODULE_NOT_FOUND") {
    console.warn(
      "Ignoring scrypt tests as their dependencies failed to install"
    );
  } else {
    throw error;
  }
}
