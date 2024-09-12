import { bls12_381 } from "ethereum-cryptography/bls";
import { deepStrictEqual } from "./assert";

describe("bls12-381", () => {
  const PointG1 = bls12_381.G1.ProjectivePoint;
  const PointG2 = bls12_381.G2.ProjectivePoint;
  const { Fp, Fp12 } = bls12_381.fields;

  it("basic", () => {
    const a = PointG1.fromAffine({
      x: Fp.create(
        0x17f1d3a73197d7942695638c4fa9ac0fc3688c4f9774b905a14e3a3f171bac586c55e83ff97a1aeffb3af00adb22c6bbn
      ),
      y: Fp.create(
        0x08b3f481e3aaa0f1a09e30ed741d8ae4fcf5e095d5d00af600db18cb2c04b3edd03cc744a2888ae40caa232946c5e7e1n
      ),
    });
    a.assertValidity();
  });
  it("sign", () => {
    const [priv, msg] =
      "0d1bd9077705325666408124339dca98c0c842b35a90bc3cea8e0c36f2d35583:c43623:94f60dc44a4dbb2505befe346c0c143190fc877ded5e877418f0f890b8ae357a40e8fcc189139aaa509d2b6500f623a5".split(
        ":"
      );
    const sig = bls12_381.signShortSignature(msg, priv);
    const pub = bls12_381.getPublicKeyForShortSignatures(priv);
    const res = bls12_381.verifyShortSignature(sig, msg, pub);
    deepStrictEqual(res, true, `${priv}-${msg}`);
  });
  it("pairing", () => {
    const p1 = bls12_381.pairing(PointG1.BASE, PointG2.BASE);
    deepStrictEqual(
      p1,
      // @ts-ignore
      Fp12.fromBigTwelve([
        0x1250ebd871fc0a92a7b2d83168d0d727272d441befa15c503dd8e90ce98db3e7b6d194f60839c508a84305aaca1789b6n,
        0x089a1c5b46e5110b86750ec6a532348868a84045483c92b7af5af689452eafabf1a8943e50439f1d59882a98eaa0170fn,
        0x1368bb445c7c2d209703f239689ce34c0378a68e72a6b3b216da0e22a5031b54ddff57309396b38c881c4c849ec23e87n,
        0x193502b86edb8857c273fa075a50512937e0794e1e65a7617c90d8bd66065b1fffe51d7a579973b1315021ec3c19934fn,
        0x01b2f522473d171391125ba84dc4007cfbf2f8da752f7c74185203fcca589ac719c34dffbbaad8431dad1c1fb597aaa5n,
        0x018107154f25a764bd3c79937a45b84546da634b8f6be14a8061e55cceba478b23f7dacaa35c8ca78beae9624045b4b6n,
        0x19f26337d205fb469cd6bd15c3d5a04dc88784fbb3d0b2dbdea54d43b2b73f2cbb12d58386a8703e0f948226e47ee89dn,
        0x06fba23eb7c5af0d9f80940ca771b6ffd5857baaf222eb95a7d2809d61bfe02e1bfd1b68ff02f0b8102ae1c2d5d5ab1an,
        0x11b8b424cd48bf38fcef68083b0b0ec5c81a93b330ee1a677d0d15ff7b984e8978ef48881e32fac91b93b47333e2ba57n,
        0x03350f55a7aefcd3c31b4fcb6ce5771cc6a0e9786ab5973320c806ad360829107ba810c5a09ffdd9be2291a0c25a99a2n,
        0x04c581234d086a9902249b64728ffd21a189e87935a954051c7cdba7b3872629a4fafc05066245cb9108f0242d0fe3efn,
        0x0f41e58663bf08cf068672cbd01a7ec73baca4d72ca93544deff686bfd6df543d48eaa24afe47e1efde449383b676631n,
      ])
    );
  });
});
