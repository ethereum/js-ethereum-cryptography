import {
  keccak224,
  keccak256,
  keccak384,
  keccak512
} from "../../src/pure/keccak";

import {
  createTestsForVector,
  keccak224Vectors,
  keccak256Vectors,
  keccak384Vectors,
  keccak512Vectors
} from "../test-vectors/keccak";

describe("keccak", function() {
  createTestsForVector(keccak224, keccak224Vectors);
  createTestsForVector(keccak256, keccak256Vectors);
  createTestsForVector(keccak384, keccak384Vectors);
  createTestsForVector(keccak512, keccak512Vectors);
});
