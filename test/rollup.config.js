import fs from "fs";
import path from "path";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";

const TESTS_DIR = "./test-builds/tsc/test/test-vectors";
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
    resolve({
      browser: true,
      preferBuiltins: false
    })
  ]
}));
