import { modPow, modInvert } from "ethereum-cryptography/math";
import { deepStrictEqual, throws } from "./assert";

describe("math", () => {
  it("pow", () => {
    deepStrictEqual(modPow(123n, 456n, 789n), 699n);
    deepStrictEqual(modPow(123n, 0n, 789n), 1n);
    deepStrictEqual(modPow(2n, 5n, 789n), 32n);
    deepStrictEqual(modPow(123n, 456n, 1n), 0n);
    deepStrictEqual(
      modPow(
        0x17f1d3a73197d7942695638c4fa9ac0fc3688c4f9774b905a14e3a3f171bac586c55e83ff97a1aeffb3af00adb22c6bbn,
        0x08b3f481e3aaa0f1a09e30ed741d8ae4fcf5e095d5d00af600db18cb2c04b3edd03cc744a2888ae40caa232946c5e7e1n,
        0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaabn
      ),
      436876548127983101943682984672944697156319180922804969694242509081341800477678465744409641708610886843942671311740n
    );
    throws(() => modPow(123n, 456n, 0n));
    throws(() => modPow(123n, 456n, -1n));
    throws(() => modPow(123n, -1n, 789n));
  });
  it("invert", () => {
    // basic
    deepStrictEqual(modInvert(3n, 11n), 4n);
    deepStrictEqual(modInvert(10n, 17n), 12n);
    deepStrictEqual(modInvert(22n, 5n), 3n); // bigger than modulo
    deepStrictEqual(
      modInvert(
        0x17f1d3a73197d7942695638c4fa9ac0fc3688c4f9774b905a14e3a3f171bac586c55e83ff97a1aeffb3af00adb22c6bbn,
        0x08b3f481e3aaa0f1a09e30ed741d8ae4fcf5e095d5d00af600db18cb2c04b3edd03cc744a2888ae40caa232946c5e7e1n
      ),
      291256306712195702191844365537370801710916620404828242975224254728724473918830780018590872057480493707327142420858n
    ); // big
    // zero
    throws(() => modInvert(0n, 5n));
    throws(() => modInvert(5n, 0n));
    deepStrictEqual(modInvert(-1n, 5n), 4n);
    throws(() => modInvert(5n, -1n));
    throws(() => modInvert(2n, 4n)); // gcd is not 1
    throws(() => modInvert(7n, 7n)); // number and modulo same
  });
});
