import { createTests } from "./test-vectors/blake2b";

try {
  const { blake2b } = require("../src/blake2b");

  createTests(blake2b);
} catch (error) {
  if (error.code === "MODULE_NOT_FOUND") {
    console.warn(
      "Ignoring blake2b tests as their dependencies failed to install"
    );
  } else {
    throw error;
  }
}
