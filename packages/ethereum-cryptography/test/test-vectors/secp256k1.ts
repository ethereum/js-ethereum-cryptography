import { assert } from "chai";

export function createTests(
  sign: (
    message: Buffer,
    privateKey: Buffer
  ) => { signature: Buffer; recovery: number },
  recover: (
    message: Buffer,
    signature: Buffer,
    recovery: number,
    compressed?: boolean
  ) => Buffer,
  publicKeyConvert: (publicKey: Buffer, compressed?: boolean) => Buffer
) {
  describe("secp256k1", function() {
    it("Should sign correctly", function() {
      // This test has been adapted from ethereumjs-util
      // https://github.com/ethereumjs/ethereumjs-util/blob/3b1085059194b02354177d334f89cd82a5187883/test/index.js#L531
      const msgHash = Buffer.from(
        "82ff40c0a986c6a5cfad4ddf4c3aa6996f1a7837f9c398e17e5de5cbd5a12b28",
        "hex"
      );
      const privateKey = Buffer.from(
        "3c9229289a6125f7fdf1885a77bb12c37a8d3b4962d936f7e3084dece32a3ca1",
        "hex"
      );

      const signature = sign(msgHash, privateKey);

      const sig = {
        r: signature.signature.slice(0, 32),
        s: signature.signature.slice(32, 64),
        v: signature.recovery
      };

      assert.deepEqual(
        sig.r,
        Buffer.from(
          "99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9",
          "hex"
        )
      );
      assert.deepEqual(
        sig.s,
        Buffer.from(
          "129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca66",
          "hex"
        )
      );

      assert.equal(sig.v, 0);
    });

    it("Should recover signatures correctly", function() {
      const echash = Buffer.from(
        "82ff40c0a986c6a5cfad4ddf4c3aa6996f1a7837f9c398e17e5de5cbd5a12b28",
        "hex"
      );

      const recovery = 0;

      const r = Buffer.from(
        "99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9",
        "hex"
      );

      const s = Buffer.from(
        "129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca66",
        "hex"
      );

      const expected = Buffer.from(
        "b4ac68eff3a82d86db5f0489d66f91707e99943bf796ae6a2dcb2205c9522fa7915428b5ac3d3b9291e62142e7246d85ad54504fabbdb2bae5795161f8ddf259",
        "hex"
      );

      const signature = Buffer.concat([r, s]);

      const senderPubKey = recover(echash, signature, recovery);
      const recovered = publicKeyConvert(senderPubKey, false).slice(1);

      assert.deepEqual(recovered, expected);
    });
  });
}
