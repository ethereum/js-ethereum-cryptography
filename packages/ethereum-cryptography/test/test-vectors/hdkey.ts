import { assert } from "chai";

export function createTests(HDKey: any) {
  describe("hdkey", function() {
    it("Should derive private key correctly", function() {
      const seed =
        "fffcf9f6f3f0edeae7e4e1dedbd8d5d2cfccc9c6c3c0bdbab7b4b1aeaba8a5a29f9c999693908d8a8784817e7b7875726f6c696663605d5a5754514e4b484542";
      const hdkey = HDKey.fromMasterSeed(Buffer.from(seed, "hex"));
      const childkey = hdkey.derive("m/0/2147483647'/1");

      assert.equal(
        childkey.privateExtendedKey,
        "xprv9zFnWC6h2cLgpmSA46vutJzBcfJ8yaJGg8cX1e5StJh45BBciYTRXSd25UEPVuesF9yog62tGAQtHjXajPPdbRCHuWS6T8XA2ECKADdw4Ef"
      );
    });

    it("Should derive public key correctly", function() {
      const seed =
        "fffcf9f6f3f0edeae7e4e1dedbd8d5d2cfccc9c6c3c0bdbab7b4b1aeaba8a5a29f9c999693908d8a8784817e7b7875726f6c696663605d5a5754514e4b484542";
      const hdkey = HDKey.fromMasterSeed(Buffer.from(seed, "hex"));
      const expected = hdkey.derive("m/0/2147483647'/1");
      const parentkey = hdkey.derive("m/0/2147483647'");
      parentkey.wipePrivateData();

      const childkey = parentkey.derive("m/1");

      assert.equal(childkey.publicExtendedKey, expected.publicExtendedKey);
    });
  });
}
