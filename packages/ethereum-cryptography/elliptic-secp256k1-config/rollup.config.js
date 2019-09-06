import commonjs from "rollup-plugin-commonjs";
import json from "rollup-plugin-json";

export default {
  input: __dirname + "/../secp256k1-node/elliptic.js",
  output: {
    file: __dirname + "/../src/elliptic-secp256k1.js",
    format: "cjs",
    sourcemap: false
  },
  plugins: [json(), commonjs()],
  external: ["safe-buffer", "create-hash", "bn.js", "elliptic", "bip66"]
};
