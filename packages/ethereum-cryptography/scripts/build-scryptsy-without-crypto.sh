set -e

echo "Bundling scrypsy with Rollup"
npx rollup -c scryptsy-without-crypto-config/rollup.config.js

echo "Compiling bundle with TypeScript"
npx tsc --allowJs --esModuleInterop ./scryptsy-without-crypto-build/rollup/scryptsy-without-crypto.js --outDir scryptsy-without-crypto-build

echo "Copying output"
cp scryptsy-without-crypto-build/scryptsy-without-crypto.js ./src/vendor
cp scryptsy-without-crypto-build/scryptsy-without-crypto.js ./src/pure/vendor
