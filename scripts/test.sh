set -e

cd packages/ethereum-cryptography
npm run test

cd ../ethereum-cryptography-native 
npm run test
