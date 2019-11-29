import commonjs from "rollup-plugin-commonjs";
import alias from "rollup-plugin-alias";

export default {
  input: __dirname + "/../bip39-lib/src/index.js",
  output: {
    file:
      __dirname +
      "/../bip39-without-wordlists-build/bip39-without-wordlists.js",
    format: "cjs",
    sourcemap: false,
    exports: "named"
  },
  external: ["create-hash", "randombytes", "pbkdf2"],
  plugins: [
    alias({
      entries: [
        { find: "./_wordlists", replacement: __dirname + "/empty-module.js" }
      ]
    }),
    commonjs()
  ]
};
