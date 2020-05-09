import { assert } from "chai";

export function createTests(
  syncVersion: (bytes: number) => Buffer,
  asyncVersion: (bytes: number) => Promise<Buffer>
) {
  describe("Random number generation", function() {
    describe("Sync version", function() {
      it("Returns a Buffer of the right size", function() {
        assert.instanceOf(syncVersion(32), Buffer);
        assert.lengthOf(syncVersion(32), 32);
      });
    });

    describe("Async version", function() {
      it("Returns a Promise of Buffer of the right size", async function() {
        assert.instanceOf(asyncVersion(32), Promise);
        assert.instanceOf(await asyncVersion(32), Buffer);
        assert.lengthOf(await asyncVersion(32), 32);
      });
    });
  });
}
