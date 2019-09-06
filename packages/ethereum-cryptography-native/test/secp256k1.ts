import { createTests } from "./test-vectors/secp256k1";

try {
  const secp256k1Module = require("../src/secp256k1");

  createTests(
    secp256k1Module.sign,
    secp256k1Module.recover,
    secp256k1Module.publicKeyConvert
  );
} catch (error) {
  if (error.code === "MODULE_NOT_FOUND") {
    console.warn(
      "Ignoring secp256k1 tests as their dependencies failed to install"
    );
  } else {
    throw error;
  }
}
