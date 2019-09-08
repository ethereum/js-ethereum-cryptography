import { createTests } from "./test-vectors/hdkey";

try {
  createTests(require("../src/hdkey"));
} catch (error) {
  if (error.code === "MODULE_NOT_FOUND") {
    console.warn(
      "Ignoring hdkey tests as their dependencies failed to install"
    );
  } else {
    throw error;
  }
}
