import commonjs from "rollup-plugin-commonjs";
import alias from "rollup-plugin-alias";

export default {
  input: __dirname + "/../scryptsy/lib/index.js",
  output: {
    file: __dirname + "/../scryptsy-without-crypto-build/rollup/scryptsy-without-crypto.js",
    format: "cjs",
    sourcemap: false
  },
  plugins: [
    alias({
      entries: [
        { find: "crypto", replacement: __dirname + "/crypto-shim.js" }
      ]
    }),
    commonjs({
      ignore: ["../pbkdf2"]
    })
  ]
};
