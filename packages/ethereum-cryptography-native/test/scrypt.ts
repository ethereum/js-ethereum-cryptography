import { createTests } from "./test-vectors/scrypt";

try {
  const scryptModule = require("../src/scrypt");

  createTests(scryptModule.scryptSync, scryptModule.scrypt);
} catch (error) {
  if (error.code === "MODULE_NOT_FOUND") {
    console.warn(
      "Ignoring scrypt tests as their dependencies failed to install"
    );
  } else {
    throw error;
  }
}
