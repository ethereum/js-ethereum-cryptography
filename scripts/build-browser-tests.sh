set -e

cd ./test/
echo "Install package to tests"
# Cleanup old module build
rm -rf ./node_modules
npm install

echo "Building tests with TypeScript"
npx tsc --project ./tsconfig.json

echo "Building tests with Parcel"
npx parcel build --no-cache --no-optimize ./test-builds/tsc/test/test-vectors/*.js --dist-dir ./test-builds/parcel --target parcel_tests

echo "Building tests with Browserify"
npx browserify ./test-builds/tsc/test/test-vectors/*.js > ./test-builds/browserify-build.js

echo "Building tests with webpack"
npx webpack --mode development ./test-builds/tsc/test/test-vectors/*.js --output-path ./test-builds

echo "Building tests with Rollup"
rollup -c ./rollup.config.js
