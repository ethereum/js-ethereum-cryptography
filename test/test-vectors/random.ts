import { getRandomBytes, getRandomBytesSync } from "../../src/random";
import { equalsBytes } from "../../src/utils";
import { deepStrictEqual } from "./assert";

describe("Random number generation", () => {
  describe("Sync version", () => {
    it("Returns a Uint8Array of the right size", () => {
      deepStrictEqual(getRandomBytesSync(32) instanceof Uint8Array, true);
      deepStrictEqual(getRandomBytesSync(32).length, 32);
      deepStrictEqual(
        equalsBytes(getRandomBytesSync(32), new Uint8Array(32)),
        false
      );
    });
  });

  describe("Async version", () => {
    it("Returns a Promise of Uint8Array of the right size", async () => {
      deepStrictEqual(getRandomBytes(32) instanceof Promise, true);
      deepStrictEqual((await getRandomBytes(32)) instanceof Uint8Array, true);
      deepStrictEqual((await getRandomBytes(32)).length, 32);
      deepStrictEqual(
        equalsBytes(await getRandomBytes(32), new Uint8Array(32)),
        false
      );
    });
  });
});
