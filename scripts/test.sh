set -e

cd packages/ethereum-cryptography
npm run test
npm run browser-tests

cd ../ethereum-cryptography-native 
npm run test

if [ $TRAVIS == "true" ]; then
  cd ../ethereum-cryptography
  npm link ../ethereum-cryptography-native
  npm run test
fi
