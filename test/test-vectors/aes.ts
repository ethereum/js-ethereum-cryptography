import { decrypt, encrypt } from "ethereum-cryptography/aes";
import { hexToBytes, toHex } from "ethereum-cryptography/utils";
import { deepStrictEqual, rejects } from "./assert";
// Test vectors taken from https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-38a.pdf
const TEST_VECTORS = [
  {
    mode: "aes-128-ctr",
    key: "2b7e151628aed2a6abf7158809cf4f3c",
    iv: "f0f1f2f3f4f5f6f7f8f9fafbfcfdfeff",
    msg: "6bc1bee22e409f96e93d7e117393172aae2d8a571e03ac9c9eb76fac45af8e5130c81c46a35ce411e5fbc1191a0a52eff69f2445df4f9b17ad2b417be66c3710",
    cypherText:
      "874d6191b620e3261bef6864990db6ce9806f66b7970fdff8617187bb9fffdff5ae4df3edbd5d35e5b4f09020db03eab1e031dda2fbe03d1792170a0f3009cee",
    pkcs7PaddingEnabled: false,
  },
  // CTR uses no padding, so we test that here
  {
    mode: "aes-128-ctr",
    key: "2b7e151628aed2a6abf7158809cf4f3c",
    iv: "f0f1f2f3f4f5f6f7f8f9fafbfcfdfeff",
    msg: "6bc1bee22e409f96e93d7e117393172aae2d8a571e03ac9c9eb76fac45af8e5130c81c46a35ce411e5fbc1191a0a52eff69f2445df4f9b17ad2b417be66c3710",
    cypherText:
      "874d6191b620e3261bef6864990db6ce9806f66b7970fdff8617187bb9fffdff5ae4df3edbd5d35e5b4f09020db03eab1e031dda2fbe03d1792170a0f3009cee",
    pkcs7PaddingEnabled: true,
  },
  // Same as the previous one, but with default params
  {
    mode: undefined,
    key: "2b7e151628aed2a6abf7158809cf4f3c",
    iv: "f0f1f2f3f4f5f6f7f8f9fafbfcfdfeff",
    msg: "6bc1bee22e409f96e93d7e117393172aae2d8a571e03ac9c9eb76fac45af8e5130c81c46a35ce411e5fbc1191a0a52eff69f2445df4f9b17ad2b417be66c3710",
    cypherText:
      "874d6191b620e3261bef6864990db6ce9806f66b7970fdff8617187bb9fffdff5ae4df3edbd5d35e5b4f09020db03eab1e031dda2fbe03d1792170a0f3009cee",
    pkcs7PaddingEnabled: undefined,
  },
  // CBC uses padding, but the NIST test vectors don't
  {
    mode: "aes-128-cbc",
    key: "2b7e151628aed2a6abf7158809cf4f3c",
    iv: "000102030405060708090a0b0c0d0e0f",
    msg: "6bc1bee22e409f96e93d7e117393172aae2d8a571e03ac9c9eb76fac45af8e5130c81c46a35ce411e5fbc1191a0a52eff69f2445df4f9b17ad2b417be66c3710",
    cypherText:
      "7649abac8119b246cee98e9b12e9197d5086cb9b507219ee95db113a917678b273bed6b8e3c1743b7116e69e222295163ff1caa1681fac09120eca307586e1a7",
    pkcs7PaddingEnabled: false,
  },
  // We test that the padding is in fact PKCS#7 by first entrypting with its
  // corresponding padding adding manually, and then with automatic padding
  {
    mode: "aes-128-cbc",
    key: "2b7e151628aed2a6abf7158809cf4f3c",
    iv: "000102030405060708090a0b0c0d0e0f",
    msg: "6bc1bee22e409f96e93d7e117393172aae2d8a571e03ac9c9eb76fac45af8e5130c81c46a35ce411e5fbc1191a0a52eff69f2445df4f9b17ad2b417be66c371010101010101010101010101010101010",
    cypherText:
      "7649abac8119b246cee98e9b12e9197d5086cb9b507219ee95db113a917678b273bed6b8e3c1743b7116e69e222295163ff1caa1681fac09120eca307586e1a78cb82807230e1321d3fae00d18cc2012",
    pkcs7PaddingEnabled: false,
  },
  {
    mode: "aes-128-cbc",
    key: "2b7e151628aed2a6abf7158809cf4f3c",
    iv: "000102030405060708090a0b0c0d0e0f",
    msg: "6bc1bee22e409f96e93d7e117393172aae2d8a571e03ac9c9eb76fac45af8e5130c81c46a35ce411e5fbc1191a0a52eff69f2445df4f9b17ad2b417be66c3710",
    cypherText:
      "7649abac8119b246cee98e9b12e9197d5086cb9b507219ee95db113a917678b273bed6b8e3c1743b7116e69e222295163ff1caa1681fac09120eca307586e1a78cb82807230e1321d3fae00d18cc2012",
    pkcs7PaddingEnabled: true,
  },
  // Same applies for aes-256-cbc
  {
    mode: "aes-256-cbc",
    key: "603deb1015ca71be2b73aef0857d77811f352c073b6108d72d9810a30914dff4",
    iv: "000102030405060708090a0b0c0d0e0f",
    msg: "6bc1bee22e409f96e93d7e117393172aae2d8a571e03ac9c9eb76fac45af8e5130c81c46a35ce411e5fbc1191a0a52eff69f2445df4f9b17ad2b417be66c3710",
    cypherText:
      "f58c4c04d6e5f1ba779eabfb5f7bfbd69cfc4e967edb808d679f777bc6702c7d39f23369a9d9bacfa530e26304231461b2eb05e2c39be9fcda6c19078c6a9d1b",
    pkcs7PaddingEnabled: false,
  },
  {
    mode: "aes-256-cbc",
    key: "603deb1015ca71be2b73aef0857d77811f352c073b6108d72d9810a30914dff4",
    iv: "000102030405060708090a0b0c0d0e0f",
    msg: "6bc1bee22e409f96e93d7e117393172aae2d8a571e03ac9c9eb76fac45af8e5130c81c46a35ce411e5fbc1191a0a52eff69f2445df4f9b17ad2b417be66c371010101010101010101010101010101010",
    cypherText:
      "f58c4c04d6e5f1ba779eabfb5f7bfbd69cfc4e967edb808d679f777bc6702c7d39f23369a9d9bacfa530e26304231461b2eb05e2c39be9fcda6c19078c6a9d1b3f461796d6b0d6b2e0c2a72b4d80e644",
    pkcs7PaddingEnabled: false,
  },
  {
    mode: "aes-256-cbc",
    key: "603deb1015ca71be2b73aef0857d77811f352c073b6108d72d9810a30914dff4",
    iv: "000102030405060708090a0b0c0d0e0f",
    msg: "6bc1bee22e409f96e93d7e117393172aae2d8a571e03ac9c9eb76fac45af8e5130c81c46a35ce411e5fbc1191a0a52eff69f2445df4f9b17ad2b417be66c3710",
    cypherText:
      "f58c4c04d6e5f1ba779eabfb5f7bfbd69cfc4e967edb808d679f777bc6702c7d39f23369a9d9bacfa530e26304231461b2eb05e2c39be9fcda6c19078c6a9d1b3f461796d6b0d6b2e0c2a72b4d80e644",
    pkcs7PaddingEnabled: true,
  },
];

describe("aes", () => {
  for (const [i, vector] of TEST_VECTORS.entries()) {
    it(`Should encrypt the test ${i} correctly`, async () => {
      const encrypted = await encrypt(
        hexToBytes(vector.msg),
        hexToBytes(vector.key),
        hexToBytes(vector.iv),
        vector.mode,
        vector.pkcs7PaddingEnabled
      );

      deepStrictEqual(toHex(encrypted), vector.cypherText);
    });

    it(`Should decrypt the test ${i} correctly`, async () => {
      const decrypted = await decrypt(
        hexToBytes(vector.cypherText),
        hexToBytes(vector.key),
        hexToBytes(vector.iv),
        vector.mode,
        vector.pkcs7PaddingEnabled
      );

      deepStrictEqual(toHex(decrypted), vector.msg);
    });
  }

  it("Should throw when not padding automatically and the message isn't the right size", async () => {
    rejects(() =>
      encrypt(
        hexToBytes("abcd"),
        hexToBytes("2b7e151628aed2a6abf7158809cf4f3c"),
        hexToBytes("2b7e151628aed2a6abf7158809cf4f3c"),
        "aes-128-cbc",
        false
      )
    );
  });

  it("Should throw when trying to use non-aes modes", async () => {
    rejects(() =>
      encrypt(
        hexToBytes("abcd"),
        hexToBytes("2b7e151628aed2a6abf7158809cf4f3c"),
        hexToBytes("2b7e151628aed2a6abf7158809cf4f3c"),
        "asd-128-cbc",
        false
      )
    );
  });

  it("aes-ctr bug (browser/node result mismatch)", async () => {
    // NOTE: full 0xff iv causes difference on counter overflow in CTR mode
    const iv = "ffffffffffffffffffffffffffffffff";
    const vectors = [
      {
        msg: "efca4cdd31923b50f4214af5d2ae10e7ac45a5019e9431cc195482d707485378",
        key: "ccc0b35ea59c51a1e45af00502966237",
        iv,
        mode: "aes-128-ctr",
        result:
          "15e356c67d266d3ca85cff4f6d92d11720aae32cdd28d5d9885836dacb1d213b",
      },
      {
        msg: "efca4cdd31923b50f4214af5d2ae10e7ac45a5019e9431cc195482d707485378",
        key: "ccc0b35ea59c51a1e45af00502966237ccc0b35ea59c51a1e45af00502966237",
        iv,
        mode: "aes-256-ctr",
        result:
          "010bb6dc10ea201bf2d586de4741309373c07b6ddf30ad8502adf4dd0bda2d23",
      },
      {
        msg: "efca4cdd31923b50f4214af5d2ae10e7ac45a5019e9431cc195482d707485378efca4cdd31923b50f4214af5d2ae10e7ac45a5019e9431cc195482d707485378",
        key: "ccc0b35ea59c51a1e45af00502966237",
        iv,
        mode: "aes-128-ctr",
        result:
          "15e356c67d266d3ca85cff4f6d92d11720aae32cdd28d5d9885836dacb1d213b55f347e68f72acf46234d495f579fb45f9dcfc7dc688a9174f566d137ffc626c",
      },
      {
        msg: "efca4cdd31923b50f4214af5d2ae10e7ac45a5019e9431cc195482d707485378efca4cdd31923b50f4214af5d2ae10e7ac45a5019e9431cc195482d707485378",
        key: "ccc0b35ea59c51a1e45af00502966237ccc0b35ea59c51a1e45af00502966237",
        iv,
        mode: "aes-256-ctr",
        result:
          "010bb6dc10ea201bf2d586de4741309373c07b6ddf30ad8502adf4dd0bda2d23c436b35e5dfa0a0088dcb6ae7328f1ec66212099222ee1c18983b58513cf5f4c",
      },
    ];
    for (const v of vectors) {
      const msg = hexToBytes(v.msg);
      const key = hexToBytes(v.key);
      const iv = hexToBytes(v.iv);
      const res = await encrypt(msg, key, iv, v.mode);
      deepStrictEqual(toHex(res), v.result);
      const clearText = await decrypt(res, key, iv, v.mode);
      deepStrictEqual(clearText, msg);
    }
  });
});
