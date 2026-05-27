set -e

cd ./test/
echo "Install package to tests"
# Cleanup old module build
rm -rf ./node_modules
npm install --production=false

export PATH="${PWD}/node_modules/.bin:${PATH}"

echo "Building tests with TypeScript"
tsc --project ./tsconfig.json

TEST_FILES=./test-builds/tsc/test/test-vectors/*.js

echo "Building tests with Parcel"
parcel build --no-cache --no-optimize $TEST_FILES --dist-dir ./test-builds/parcel --target parcel_tests

echo "Building tests with webpack"
webpack --mode development $TEST_FILES --output-path ./test-builds

echo "Building tests with Rollup"
rollup -c ./rollup.config.js
