import { assert } from "chai";

const TEST_VECTORS = [
  {
    password: Buffer.from("password", "ascii"),
    salt: Buffer.from("salt", "ascii"),
    iterations: 1,
    keylen: 32,
    digest: "sha256",
    result: "120fb6cffcf8b32c43e7225256c4f837a86548c92ccc35480805987cb70be17b"
  },
  {
    password: Buffer.from("passwordPASSWORDpassword", "ascii"),
    salt: Buffer.from("saltSALTsaltSALTsaltSALTsaltSALTsalt", "ascii"),
    iterations: 4096,
    keylen: 40,
    digest: "sha256",
    result:
      "348c89dbcbd32b2f32d814b8116e84cf2b17347ebc1800181c4e2a1fb8dd53e1c635518c7dac47e9"
  },
  {
    password: Buffer.from("password", "ascii"),
    salt: Buffer.from("salt", "ascii"),
    iterations: 4096,
    keylen: 32,
    digest: "sha256",
    result: "c5e478d59288c841aa530db6845c4c8d962893a001ce4e11a4963873aa98134a"
  }
];

export function createTests(
  pbkdf2Sync: (
    password: Buffer,
    salt: Buffer,
    iterations: number,
    keylen: number,
    digest: string
  ) => Buffer,
  pbkdf2Async: (
    password: Buffer,
    salt: Buffer,
    iterations: number,
    keylen: number,
    digest: string
  ) => Promise<Buffer>
) {
  describe("pbkdf2", function() {
    describe("pbkdf2 sync", function() {
      for (let i = 0; i < TEST_VECTORS.length; i++) {
        it(`Should process the test ${i} correctly`, function() {
          const vector = TEST_VECTORS[i];

          const derived = pbkdf2Sync(
            vector.password,
            vector.salt,
            vector.iterations,
            vector.keylen,
            vector.digest
          );

          assert.equal(derived.toString("hex"), vector.result);
        });
      }
    });

    describe("pbkdf2 async", function() {
      for (let i = 0; i < TEST_VECTORS.length; i++) {
        it(`Should process the test ${i} correctly`, async function() {
          const vector = TEST_VECTORS[i];

          const derived = await pbkdf2Async(
            vector.password,
            vector.salt,
            vector.iterations,
            vector.keylen,
            vector.digest
          );

          assert.equal(derived.toString("hex"), vector.result);
        });
      }
    });
  });
}
