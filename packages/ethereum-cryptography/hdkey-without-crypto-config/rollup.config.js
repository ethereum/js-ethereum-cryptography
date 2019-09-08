import commonjs from "rollup-plugin-commonjs";
import alias from "rollup-plugin-alias";

export default {
  input: __dirname + "/../hdkey/lib/hdkey.js",
  output: {
    file:
      __dirname +
      "/../hdkey-without-crypto-build/hdkey-without-crypto.js",
    format: "cjs",
    sourcemap: false
  },
  external: ['assert', 'safe-buffer', 'bs58check'],
  plugins: [
    alias({
      entries: [
        { find: "crypto", replacement: __dirname + "/crypto-shim.js" },
        { find: "secp256k1", replacement: __dirname + "/secp256k1-shim.js" }
      ]
    }),
    commonjs({
      ignore: ["../shims/hdkey-crypto", "../secp256k1"]
    })
  ]
};
