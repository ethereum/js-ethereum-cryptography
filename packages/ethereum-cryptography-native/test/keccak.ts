import {
  createTestsForVector,
  keccak224Vectors,
  keccak256Vectors,
  keccak384Vectors,
  keccak512Vectors
} from "./test-vectors/keccak";

try {
  const keccakModule = require("../src/keccak");

  describe("keccak", function() {
    createTestsForVector(keccakModule.keccak224, keccak224Vectors);
    createTestsForVector(keccakModule.keccak256, keccak256Vectors);
    createTestsForVector(keccakModule.keccak384, keccak384Vectors);
    createTestsForVector(keccakModule.keccak512, keccak512Vectors);
  });
} catch (error) {
  if (error.code === "MODULE_NOT_FOUND") {
    console.warn(
      "Ignoring keccak tests as their dependencies failed to install"
    );
  } else {
    throw error;
  }
}
