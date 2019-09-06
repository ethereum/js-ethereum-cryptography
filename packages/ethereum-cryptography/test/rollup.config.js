import fs from "fs";
import path from "path";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import nodeBuiltin from "rollup-plugin-node-builtins";
import nodeGlobals from "rollup-plugin-node-globals";
import json from "rollup-plugin-json";

const TESTS_DIR = "./test-builds/tsc/test";
const testFiles = fs
  .readdirSync(TESTS_DIR)
  .filter(name => name.endsWith(".js"))
  .map(name => path.join(TESTS_DIR, name));

export default testFiles.map(test => ({
  input: test,
  output: {
    file: `./test-builds/rollup/${path.basename(test)}`,
    format: "iife",
    name: "tests",
    sourcemap: true,
    exports: "named"
  },
  plugins: [
    commonjs(),
    json(),
    nodeGlobals(),
    nodeBuiltin(),
    resolve({
      browser: true,
      preferBuiltins: false
    })
  ]
}));
