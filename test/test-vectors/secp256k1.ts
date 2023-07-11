import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { deepStrictEqual } from "./assert";

describe("secp256k1", () => {
  it("should verify msg bb5a...", async () => {
    const msg =
      "bb5a52f42f9c9261ed4361f59422a1e30036e7c32b270c8807a419feca605023";
    const x = 3252872872578928810725465493269682203671229454553002637820453004368632726370n;
    const y = 17482644437196207387910659778872952193236850502325156318830589868678978890912n;
    const r = 432420386565659656852420866390673177323n;
    const s = 115792089237316195423570985008687907852837564279074904382605163141518161494334n;
    const pub = new secp256k1.ProjectivePoint(x, y, 1n);
    const sig = new secp256k1.Signature(r, s);
    deepStrictEqual(secp256k1.verify(sig, msg, pub.toRawBytes(), { lowS: false }), true);
  });
});
