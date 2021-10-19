export const VECTORS = {
  "secp256k1.contextRandomize": [
    {
      args: [],
      argsAfter: [],
      err: "Expected seed to be an Uint8Array or null"
    },
    {
      args: [
        {
          __Bytes__:
            "000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
        }
      ],
      argsAfter: [
        {
          __Bytes__:
            "000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
        }
      ],
      err: "Expected seed to be an Uint8Array with length 32"
    },
    {
      args: [
        {
          __Buffer__:
            "0c8376c22e2654225856ee9aaa17a727ad2c18d353a40bd7913fc454d3dc140f"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "0c8376c22e2654225856ee9aaa17a727ad2c18d353a40bd7913fc454d3dc140f"
        }
      ]
    },
    { args: [null], argsAfter: [null] }
  ],
  "secp256k1.privateKeyVerify": [
    {
      args: [null],
      argsAfter: [null],
      err: "Expected private key to be an Uint8Array"
    },
    {
      args: [
        {
          __Buffer__:
            "61d9721bd1df4b5abf82d3657036c6216bedbd7a4e3b83f03e8fa81906a12c"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "61d9721bd1df4b5abf82d3657036c6216bedbd7a4e3b83f03e8fa81906a12c"
        }
      ],
      err: "Expected private key to be an Uint8Array with length 32"
    },
    {
      args: [
        {
          __Buffer__:
            "0000000000000000000000000000000000000000000000000000000000000000"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "0000000000000000000000000000000000000000000000000000000000000000"
        }
      ],
      res: false
    },
    {
      args: [
        {
          __Buffer__:
            "fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"
        }
      ],
      res: false
    },
    {
      args: [
        {
          __Buffer__:
            "cfa1e8f4d84e31612b9b0c6982fa2448ea5cd1b9b3edbfb0c9823a9df04da034"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "cfa1e8f4d84e31612b9b0c6982fa2448ea5cd1b9b3edbfb0c9823a9df04da034"
        }
      ],
      res: true
    }
  ],
  "secp256k1.privateKeyNegate": [
    {
      args: [null],
      argsAfter: [null],
      err: "Expected private key to be an Uint8Array"
    },
    {
      args: [
        {
          __Buffer__:
            "7f7dd5d30bb9f01c0555ea4fb6c908549e42036299e6030e40e4a0fbd3c1df"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "7f7dd5d30bb9f01c0555ea4fb6c908549e42036299e6030e40e4a0fbd3c1df"
        }
      ],
      err: "Expected private key to be an Uint8Array with length 32"
    },
    {
      args: [
        {
          __Buffer__:
            "0000000000000000000000000000000000000000000000000000000000000000"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "0000000000000000000000000000000000000000000000000000000000000000"
        }
      ],
      res: {
        __Buffer__:
          "0000000000000000000000000000000000000000000000000000000000000000"
      }
    },
    {
      args: [
        {
          __Buffer__:
            "fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "0000000000000000000000000000000000000000000000000000000000000000"
        }
      ],
      res: {
        __Buffer__:
          "0000000000000000000000000000000000000000000000000000000000000000"
      }
    },
    {
      args: [
        {
          __Buffer__:
            "fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd036414b"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364137"
        }
      ],
      res: {
        __Buffer__:
          "fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364137"
      }
    },
    {
      args: [
        {
          __Buffer__:
            "bb712604b7f757c0bdb24508460efcc904653ee9edd25eeacad5ed65e6365ce8"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "448ed9fb4808a83f424dbaf7b9f10335b6499dfcc1764150f4fc7126e9ffe459"
        }
      ],
      res: {
        __Buffer__:
          "448ed9fb4808a83f424dbaf7b9f10335b6499dfcc1764150f4fc7126e9ffe459"
      }
    }
  ],
  "secp256k1.privateKeyTweakAdd": [
    {
      args: [
        null,
        {
          __Buffer__:
            "9b0117349c339d021c21346fa51bd99c1ecfc3701c5067efc978f5c42a74d0eb"
        }
      ],
      argsAfter: [
        null,
        {
          __Buffer__:
            "9b0117349c339d021c21346fa51bd99c1ecfc3701c5067efc978f5c42a74d0eb"
        }
      ],
      err: "Expected private key to be an Uint8Array"
    },
    {
      args: [
        {
          __Buffer__:
            "65d79b06ac114e3fa112d05109e2f0b1be4f052e6904c4ea83e9dc77a5f8d7"
        },
        {
          __Buffer__:
            "629775f4a09cf1f8af0a2580c764713c52c1cd46c895f1d563bc6ab3cbd0e4ab"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "65d79b06ac114e3fa112d05109e2f0b1be4f052e6904c4ea83e9dc77a5f8d7"
        },
        {
          __Buffer__:
            "629775f4a09cf1f8af0a2580c764713c52c1cd46c895f1d563bc6ab3cbd0e4ab"
        }
      ],
      err: "Expected private key to be an Uint8Array with length 32"
    },
    {
      args: [
        {
          __Buffer__:
            "bb2de6f7ed7f1d207e6dbadf3fab085947452fd5d95061ae38b89a11010ef0c2"
        },
        null
      ],
      argsAfter: [
        {
          __Buffer__:
            "bb2de6f7ed7f1d207e6dbadf3fab085947452fd5d95061ae38b89a11010ef0c2"
        },
        null
      ],
      err: "Expected tweak to be an Uint8Array"
    },
    {
      args: [
        {
          __Buffer__:
            "f4a6c0be3ce65a54a46d6874fc32e33a10e5088788f3c31e51059b06679f66a1"
        },
        {
          __Buffer__:
            "0e8b901cbf50549747ede18b69c8a3b32b04e67331ea8709278ea876aa8f89"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "f4a6c0be3ce65a54a46d6874fc32e33a10e5088788f3c31e51059b06679f66a1"
        },
        {
          __Buffer__:
            "0e8b901cbf50549747ede18b69c8a3b32b04e67331ea8709278ea876aa8f89"
        }
      ],
      err: "Expected tweak to be an Uint8Array with length 32"
    },
    {
      args: [
        {
          __Buffer__:
            "7c64fe71f25b364bae739c1bcbe1df999635a62fc3f7e602d96f796c4aa6f68d"
        },
        {
          __Buffer__:
            "fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "7c64fe71f25b364bae739c1bcbe1df999635a62fc3f7e602d96f796c4aa6f68d"
        },
        {
          __Buffer__:
            "fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"
        }
      ],
      err: "The tweak was out of range or the resulted private key is invalid"
    },
    {
      args: [
        {
          __Buffer__:
            "fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364140"
        },
        {
          __Buffer__:
            "0000000000000000000000000000000000000000000000000000000000000001"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364140"
        },
        {
          __Buffer__:
            "0000000000000000000000000000000000000000000000000000000000000001"
        }
      ],
      err: "The tweak was out of range or the resulted private key is invalid"
    },
    {
      args: [
        {
          __Buffer__:
            "5a9817f063bec86b4f03094a5e0d857edc40a94b045b2700278cbadb7f87bd9c"
        },
        {
          __Buffer__:
            "ead3f28c6f2d45c853e8e3e0620e97c5aaeba73deeb0a08348d19a8409ce9baf"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "456c0a7cd2ec0e33a2ebed2ac01c1d45cc7d73a243c32747b08bf6d2b920180a"
        },
        {
          __Buffer__:
            "ead3f28c6f2d45c853e8e3e0620e97c5aaeba73deeb0a08348d19a8409ce9baf"
        }
      ],
      res: {
        __Buffer__:
          "456c0a7cd2ec0e33a2ebed2ac01c1d45cc7d73a243c32747b08bf6d2b920180a"
      }
    }
  ],
  "secp256k1.privateKeyTweakMul": [
    {
      args: [
        null,
        {
          __Buffer__:
            "feeda811f65332b578336e182e09ae8f804022d6de2e71fbfc75faa53d60168c"
        }
      ],
      argsAfter: [
        null,
        {
          __Buffer__:
            "feeda811f65332b578336e182e09ae8f804022d6de2e71fbfc75faa53d60168c"
        }
      ],
      err: "Expected private key to be an Uint8Array"
    },
    {
      args: [
        {
          __Buffer__:
            "cdc6ed30508ff8fc00f54e0e346ec2be9a67e03b0179b51da03044deb388c8"
        },
        {
          __Buffer__:
            "17e70f2b422fee2ae8101c4114bae51d3a676c53b01ab216b10db5f49b969957"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "cdc6ed30508ff8fc00f54e0e346ec2be9a67e03b0179b51da03044deb388c8"
        },
        {
          __Buffer__:
            "17e70f2b422fee2ae8101c4114bae51d3a676c53b01ab216b10db5f49b969957"
        }
      ],
      err: "Expected private key to be an Uint8Array with length 32"
    },
    {
      args: [
        {
          __Buffer__:
            "2f276762c10c0762f3167ad7faf3b4f8f48f7cb82576c0776d7a472bcbfd4cbb"
        },
        null
      ],
      argsAfter: [
        {
          __Buffer__:
            "2f276762c10c0762f3167ad7faf3b4f8f48f7cb82576c0776d7a472bcbfd4cbb"
        },
        null
      ],
      err: "Expected tweak to be an Uint8Array"
    },
    {
      args: [
        {
          __Buffer__:
            "1cdd7e6afcb0125d1539345ac8a323e80dd90a0d8bb501f52b8388ab1688f366"
        },
        {
          __Buffer__:
            "de2fe4821096760a1e4a0c838608556b01010fd9884c2456a2f01a884aac60"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "1cdd7e6afcb0125d1539345ac8a323e80dd90a0d8bb501f52b8388ab1688f366"
        },
        {
          __Buffer__:
            "de2fe4821096760a1e4a0c838608556b01010fd9884c2456a2f01a884aac60"
        }
      ],
      err: "Expected tweak to be an Uint8Array with length 32"
    },
    {
      args: [
        {
          __Buffer__:
            "ffec99ced46f63c47f140b19eda9ef7695a52c9deb46fc9f65982e84f1297ed9"
        },
        {
          __Buffer__:
            "fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "ffec99ced46f63c47f140b19eda9ef7695a52c9deb46fc9f65982e84f1297ed9"
        },
        {
          __Buffer__:
            "fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"
        }
      ],
      err: "The tweak was out of range or equal to zero"
    },
    {
      args: [
        {
          __Buffer__:
            "40ecd28a1ea4d52518e22299b213f5ab24e603a08bf9a5c578aef50a2c7d3c5b"
        },
        {
          __Buffer__:
            "0000000000000000000000000000000000000000000000000000000000000000"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "40ecd28a1ea4d52518e22299b213f5ab24e603a08bf9a5c578aef50a2c7d3c5b"
        },
        {
          __Buffer__:
            "0000000000000000000000000000000000000000000000000000000000000000"
        }
      ],
      err: "The tweak was out of range or equal to zero"
    },
    {
      args: [
        {
          __Buffer__:
            "230f56d6ea39486e3576163b003e974c3ddde00bffb036eae5e7b7ae5fa911e3"
        },
        {
          __Buffer__:
            "73cd83b42d6b770427666b833dfdb1d5898400f7f276c8eaa39689bd710c3596"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "19f30a3451db82b7abe5091853a4d2edbd8a370a20c2cb74a85d07650130b05a"
        },
        {
          __Buffer__:
            "73cd83b42d6b770427666b833dfdb1d5898400f7f276c8eaa39689bd710c3596"
        }
      ],
      res: {
        __Buffer__:
          "19f30a3451db82b7abe5091853a4d2edbd8a370a20c2cb74a85d07650130b05a"
      }
    }
  ],
  "secp256k1.publicKeyVerify": [
    {
      args: [null],
      argsAfter: [null],
      err: "Expected public key to be an Uint8Array"
    },
    {
      args: [
        {
          __Buffer__:
            "caceeb341dba8847b0dc6c72e0d8a261fcc23c8646d505a7d976b9423fbf0a93"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "caceeb341dba8847b0dc6c72e0d8a261fcc23c8646d505a7d976b9423fbf0a93"
        }
      ],
      err: "Expected public key to be an Uint8Array with length [33, 65]"
    },
    {
      args: [
        {
          __Buffer__:
            "00cbfb40bdd183601359323a48b0bd960290feab3c5de7859bb8cff31ccc89e83e"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "00cbfb40bdd183601359323a48b0bd960290feab3c5de7859bb8cff31ccc89e83e"
        }
      ],
      res: false
    },
    {
      args: [
        {
          __Buffer__:
            "04cbfb40bdd183601359323a48b0bd960290feab3c5de7859bb8cff31ccc89e83ef622862bf2734064c836ca053c063f4449406a68507dbb75ecc2bcb7ca2f176e"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "04cbfb40bdd183601359323a48b0bd960290feab3c5de7859bb8cff31ccc89e83ef622862bf2734064c836ca053c063f4449406a68507dbb75ecc2bcb7ca2f176e"
        }
      ],
      res: false
    },
    {
      args: [
        {
          __Buffer__:
            "03cbfb40bdd183601359323a48b0bd960290feab3c5de7859bb8cff31ccc89e83ef622862bf2734064c836ca053c063f4449406a68507dbb75ecc2bcb7ca2f176f"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "03cbfb40bdd183601359323a48b0bd960290feab3c5de7859bb8cff31ccc89e83ef622862bf2734064c836ca053c063f4449406a68507dbb75ecc2bcb7ca2f176f"
        }
      ],
      res: false
    },
    {
      args: [
        {
          __Buffer__:
            "03fc398c0626f1ed496a0306ad7970ec8b01151610aeeade539366636205ea4240"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "03fc398c0626f1ed496a0306ad7970ec8b01151610aeeade539366636205ea4240"
        }
      ],
      res: true
    },
    {
      args: [
        {
          __Buffer__:
            "04fc398c0626f1ed496a0306ad7970ec8b01151610aeeade539366636205ea4240ad1ad70d2b2737c4a759f53cd46111e2613c10d5e41c3dd06c6d5b0cca9d7411"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "04fc398c0626f1ed496a0306ad7970ec8b01151610aeeade539366636205ea4240ad1ad70d2b2737c4a759f53cd46111e2613c10d5e41c3dd06c6d5b0cca9d7411"
        }
      ],
      res: true
    }
  ],
  "secp256k1.publicKeyCreate": [
    {
      args: [null],
      argsAfter: [null],
      err: "Expected private key to be an Uint8Array"
    },
    {
      args: [
        {
          __Buffer__:
            "5196c9cd75897743f200098167f360450924a677ee1c2e0e6a74fd15f01086"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "5196c9cd75897743f200098167f360450924a677ee1c2e0e6a74fd15f01086"
        }
      ],
      err: "Expected private key to be an Uint8Array with length 32"
    },
    {
      args: [
        {
          __Buffer__:
            "fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"
        }
      ],
      err: "Private Key is invalid"
    },
    {
      args: [
        {
          __Buffer__:
            "0000000000000000000000000000000000000000000000000000000000000000"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "0000000000000000000000000000000000000000000000000000000000000000"
        }
      ],
      err: "Private Key is invalid"
    },
    {
      args: [
        {
          __Buffer__:
            "919d29169d70edf601a9648450444a2fed4f9f2b8592bfa629be3a644d51a47d"
        },
        null
      ],
      argsAfter: [
        {
          __Buffer__:
            "919d29169d70edf601a9648450444a2fed4f9f2b8592bfa629be3a644d51a47d"
        },
        null
      ],
      err: "Expected compressed to be a Boolean"
    },
    {
      args: [
        {
          __Buffer__:
            "b62c3992417a3b860a178fe38d6bb8f17ecbcf3da90e3f867ede082c43c97fd7"
        },
        true,
        null
      ],
      argsAfter: [
        {
          __Buffer__:
            "b62c3992417a3b860a178fe38d6bb8f17ecbcf3da90e3f867ede082c43c97fd7"
        },
        true,
        null
      ],
      err: "Expected output to be an Uint8Array"
    },
    {
      args: [
        {
          __Buffer__:
            "b62c3992417a3b860a178fe38d6bb8f17ecbcf3da90e3f867ede082c43c97fd7"
        },
        true,
        {
          __Bytes__:
            "000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "b62c3992417a3b860a178fe38d6bb8f17ecbcf3da90e3f867ede082c43c97fd7"
        },
        true,
        {
          __Bytes__:
            "000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
        }
      ],
      err: "Expected output to be an Uint8Array with length 33"
    },
    {
      args: [
        {
          __Buffer__:
            "b62c3992417a3b860a178fe38d6bb8f17ecbcf3da90e3f867ede082c43c97fd7"
        },
        false,
        {
          __Bytes__:
            "000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "b62c3992417a3b860a178fe38d6bb8f17ecbcf3da90e3f867ede082c43c97fd7"
        },
        false,
        {
          __Bytes__:
            "000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
        }
      ],
      err: "Expected output to be an Uint8Array with length 65"
    }
  ],
  "secp256k1.publicKeyConvert": [
    {
      args: [null],
      argsAfter: [null],
      err: "Expected public key to be an Uint8Array"
    },
    {
      args: [
        {
          __Buffer__:
            "05f782f164d377565473b05e797be5e7e9b0d23c29d2d748d6dc0e336e284199"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "05f782f164d377565473b05e797be5e7e9b0d23c29d2d748d6dc0e336e284199"
        }
      ],
      err: "Expected public key to be an Uint8Array with length [33, 65]"
    },
    {
      args: [
        {
          __Bytes__:
            "000000000000000000000000000000000000000000000000000000000000000000"
        }
      ],
      argsAfter: [
        {
          __Bytes__:
            "000000000000000000000000000000000000000000000000000000000000000000"
        }
      ],
      err: "Public Key could not be parsed"
    },
    {
      args: [
        {
          __Buffer__:
            "037166e770efaa66024abee302d8d35705c7d33f19b593731fe8bd27536872d348"
        },
        null
      ],
      argsAfter: [
        {
          __Buffer__:
            "037166e770efaa66024abee302d8d35705c7d33f19b593731fe8bd27536872d348"
        },
        null
      ],
      err: "Expected compressed to be a Boolean"
    },
    {
      args: [
        {
          __Buffer__:
            "03aaf688e0ca2c68ebcbc73b388cafa7a1c58291278d8ed4551151c697e0d65f5d"
        },
        true,
        null
      ],
      argsAfter: [
        {
          __Buffer__:
            "03aaf688e0ca2c68ebcbc73b388cafa7a1c58291278d8ed4551151c697e0d65f5d"
        },
        true,
        null
      ],
      err: "Expected output to be an Uint8Array"
    },
    {
      args: [
        {
          __Buffer__:
            "03aaf688e0ca2c68ebcbc73b388cafa7a1c58291278d8ed4551151c697e0d65f5d"
        },
        true,
        {
          __Bytes__:
            "000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "03aaf688e0ca2c68ebcbc73b388cafa7a1c58291278d8ed4551151c697e0d65f5d"
        },
        true,
        {
          __Bytes__:
            "000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
        }
      ],
      err: "Expected output to be an Uint8Array with length 33"
    },
    {
      args: [
        {
          __Buffer__:
            "03aaf688e0ca2c68ebcbc73b388cafa7a1c58291278d8ed4551151c697e0d65f5d"
        },
        false,
        {
          __Bytes__:
            "000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "03aaf688e0ca2c68ebcbc73b388cafa7a1c58291278d8ed4551151c697e0d65f5d"
        },
        false,
        {
          __Bytes__:
            "000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
        }
      ],
      err: "Expected output to be an Uint8Array with length 65"
    },
    {
      args: [
        {
          __Buffer__:
            "02fffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "02fffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"
        }
      ],
      err: "Public Key could not be parsed"
    },
    {
      args: [
        {
          __Buffer__:
            "04fffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f0000000000000000000000000000000000000000000000000000000000000001"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "04fffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f0000000000000000000000000000000000000000000000000000000000000001"
        }
      ],
      err: "Public Key could not be parsed"
    },
    {
      args: [
        {
          __Buffer__:
            "040000000000000000000000000000000000000000000000000000000000000001fffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "040000000000000000000000000000000000000000000000000000000000000001fffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"
        }
      ],
      err: "Public Key could not be parsed"
    },
    {
      args: [
        {
          __Buffer__:
            "065f6ae29aecb75fd4f2537c42063bc80def4aed5583d8146e5c7972e75918c198ceeb00c98387593b298c281651af850f3b4c0419e62819df2e10cc7a5d4ba305"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "065f6ae29aecb75fd4f2537c42063bc80def4aed5583d8146e5c7972e75918c198ceeb00c98387593b298c281651af850f3b4c0419e62819df2e10cc7a5d4ba305"
        }
      ],
      err: "Public Key could not be parsed"
    }
  ],
  "secp256k1.publicKeyNegate": [
    {
      args: [null],
      argsAfter: [null],
      err: "Expected public key to be an Uint8Array"
    },
    {
      args: [
        {
          __Buffer__:
            "eb679c07a5fa8c0cd999d41887e949c3105b47aae5782ba9b87d3bfe917b2986"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "eb679c07a5fa8c0cd999d41887e949c3105b47aae5782ba9b87d3bfe917b2986"
        }
      ],
      err: "Expected public key to be an Uint8Array with length [33, 65]"
    },
    {
      args: [
        {
          __Bytes__:
            "000000000000000000000000000000000000000000000000000000000000000000"
        }
      ],
      argsAfter: [
        {
          __Bytes__:
            "000000000000000000000000000000000000000000000000000000000000000000"
        }
      ],
      err: "Public Key could not be parsed"
    },
    {
      args: [
        {
          __Buffer__:
            "021a88ab60a67a3dd1d96bd6f5cfbaccb0e32aefcbfb04a34a8fccc1137b0cb281"
        },
        null
      ],
      argsAfter: [
        {
          __Buffer__:
            "021a88ab60a67a3dd1d96bd6f5cfbaccb0e32aefcbfb04a34a8fccc1137b0cb281"
        },
        null
      ],
      err: "Expected compressed to be a Boolean"
    },
    {
      args: [
        {
          __Buffer__:
            "0379f8f1ff466f8580708af7a8f6b73adaaf56c28887acf3f400bec3886e43da80"
        },
        true,
        null
      ],
      argsAfter: [
        {
          __Buffer__:
            "0379f8f1ff466f8580708af7a8f6b73adaaf56c28887acf3f400bec3886e43da80"
        },
        true,
        null
      ],
      err: "Expected output to be an Uint8Array"
    },
    {
      args: [
        {
          __Buffer__:
            "0379f8f1ff466f8580708af7a8f6b73adaaf56c28887acf3f400bec3886e43da80"
        },
        true,
        {
          __Bytes__:
            "000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "0379f8f1ff466f8580708af7a8f6b73adaaf56c28887acf3f400bec3886e43da80"
        },
        true,
        {
          __Bytes__:
            "000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
        }
      ],
      err: "Expected output to be an Uint8Array with length 33"
    },
    {
      args: [
        {
          __Buffer__:
            "0379f8f1ff466f8580708af7a8f6b73adaaf56c28887acf3f400bec3886e43da80"
        },
        false,
        {
          __Bytes__:
            "000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "0379f8f1ff466f8580708af7a8f6b73adaaf56c28887acf3f400bec3886e43da80"
        },
        false,
        {
          __Bytes__:
            "000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
        }
      ],
      err: "Expected output to be an Uint8Array with length 65"
    }
  ],
  "secp256k1.publicKeyCombine": [
    {
      args: [null],
      argsAfter: [null],
      err: "Expected public keys to be an Array"
    },
    {
      args: [[]],
      argsAfter: [[]],
      err: "Expected public keys array will have more than zero items"
    },
    {
      args: [[null]],
      argsAfter: [[null]],
      err: "Expected public key to be an Uint8Array"
    },
    {
      args: [
        [
          {
            __Buffer__:
              "5d57e8e08450cf345195361d5bdb549f76af20336af77db07b2e58e2fa531fb5"
          }
        ]
      ],
      argsAfter: [
        [
          {
            __Buffer__:
              "5d57e8e08450cf345195361d5bdb549f76af20336af77db07b2e58e2fa531fb5"
          }
        ]
      ],
      err: "Expected public key to be an Uint8Array with length [33, 65]"
    },
    {
      args: [
        [
          {
            __Bytes__:
              "000000000000000000000000000000000000000000000000000000000000000000"
          }
        ]
      ],
      argsAfter: [
        [
          {
            __Bytes__:
              "000000000000000000000000000000000000000000000000000000000000000000"
          }
        ]
      ],
      err: "Public Key could not be parsed"
    },
    {
      args: [
        [
          {
            __Buffer__:
              "038830fc3fc7dfa09eb41ec65a63f6c665d0a41eadb0fceca2666bf88cc93253cb"
          },
          {
            __Buffer__:
              "028830fc3fc7dfa09eb41ec65a63f6c665d0a41eadb0fceca2666bf88cc93253cb"
          }
        ],
        true
      ],
      argsAfter: [
        [
          {
            __Buffer__:
              "038830fc3fc7dfa09eb41ec65a63f6c665d0a41eadb0fceca2666bf88cc93253cb"
          },
          {
            __Buffer__:
              "028830fc3fc7dfa09eb41ec65a63f6c665d0a41eadb0fceca2666bf88cc93253cb"
          }
        ],
        true
      ],
      err: "The sum of the public keys is not valid"
    },
    {
      args: [
        [
          {
            __Buffer__:
              "03bf1cec19db2d3a2c864b04d2fa4ea6608335cec33b1db06c9531af5615368221"
          }
        ],
        null
      ],
      argsAfter: [
        [
          {
            __Buffer__:
              "03bf1cec19db2d3a2c864b04d2fa4ea6608335cec33b1db06c9531af5615368221"
          }
        ],
        null
      ],
      err: "Expected compressed to be a Boolean"
    },
    {
      args: [
        [
          {
            __Buffer__:
              "0312cb20e2d7a2dde3774d17acb329fbb5bca5f3824f908394a4698848232a6e2e"
          }
        ],
        true,
        null
      ],
      argsAfter: [
        [
          {
            __Buffer__:
              "0312cb20e2d7a2dde3774d17acb329fbb5bca5f3824f908394a4698848232a6e2e"
          }
        ],
        true,
        null
      ],
      err: "Expected output to be an Uint8Array"
    },
    {
      args: [
        [
          {
            __Buffer__:
              "0312cb20e2d7a2dde3774d17acb329fbb5bca5f3824f908394a4698848232a6e2e"
          }
        ],
        true,
        {
          __Bytes__:
            "000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
        }
      ],
      argsAfter: [
        [
          {
            __Buffer__:
              "0312cb20e2d7a2dde3774d17acb329fbb5bca5f3824f908394a4698848232a6e2e"
          }
        ],
        true,
        {
          __Bytes__:
            "000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
        }
      ],
      err: "Expected output to be an Uint8Array with length 33"
    },
    {
      args: [
        [
          {
            __Buffer__:
              "0312cb20e2d7a2dde3774d17acb329fbb5bca5f3824f908394a4698848232a6e2e"
          }
        ],
        false,
        {
          __Bytes__:
            "000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
        }
      ],
      argsAfter: [
        [
          {
            __Buffer__:
              "0312cb20e2d7a2dde3774d17acb329fbb5bca5f3824f908394a4698848232a6e2e"
          }
        ],
        false,
        {
          __Bytes__:
            "000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
        }
      ],
      err: "Expected output to be an Uint8Array with length 65"
    }
  ],
  "secp256k1.publicKeyTweakAdd": [
    {
      args: [
        null,
        {
          __Buffer__:
            "960955b825f128884fcb7d2d17bfaa767db53907c4e366449b856b02558af9b3"
        }
      ],
      argsAfter: [
        null,
        {
          __Buffer__:
            "960955b825f128884fcb7d2d17bfaa767db53907c4e366449b856b02558af9b3"
        }
      ],
      err: "Expected public key to be an Uint8Array"
    },
    {
      args: [
        {
          __Buffer__:
            "67d9890aded5839dea2cb6577f766b542116981e3137d93feb0f456baf769d1e"
        },
        {
          __Buffer__:
            "9af2a39b8eaf43668087036c6d1ab66917db5fd24ab152c9bda3b39e81cbf318"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "67d9890aded5839dea2cb6577f766b542116981e3137d93feb0f456baf769d1e"
        },
        {
          __Buffer__:
            "9af2a39b8eaf43668087036c6d1ab66917db5fd24ab152c9bda3b39e81cbf318"
        }
      ],
      err: "Expected public key to be an Uint8Array with length [33, 65]"
    },
    {
      args: [
        {
          __Bytes__:
            "000000000000000000000000000000000000000000000000000000000000000000"
        },
        {
          __Buffer__:
            "cee62dcf2cea28232885ded0836bafa465160dbaa4c6fc15d4523d650f79265d"
        }
      ],
      argsAfter: [
        {
          __Bytes__:
            "000000000000000000000000000000000000000000000000000000000000000000"
        },
        {
          __Buffer__:
            "cee62dcf2cea28232885ded0836bafa465160dbaa4c6fc15d4523d650f79265d"
        }
      ],
      err: "Public Key could not be parsed"
    },
    {
      args: [
        {
          __Buffer__:
            "02fc27bfb6791c07adc33e3c5c154603cfe1bf5842cfceb0a0969cda604e137265"
        },
        null
      ],
      argsAfter: [
        {
          __Buffer__:
            "02fc27bfb6791c07adc33e3c5c154603cfe1bf5842cfceb0a0969cda604e137265"
        },
        null
      ],
      err: "Expected tweak to be an Uint8Array"
    },
    {
      args: [
        {
          __Buffer__:
            "0339b6b6e0947071ff39cd21d06cab00ce9c4b540099933f30daaa1736157dd831"
        },
        {
          __Buffer__:
            "88fb2d59e3412b28bf2f06d0a8fc9e2f0b2706e3f09b3282d36d936942d071"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "0339b6b6e0947071ff39cd21d06cab00ce9c4b540099933f30daaa1736157dd831"
        },
        {
          __Buffer__:
            "88fb2d59e3412b28bf2f06d0a8fc9e2f0b2706e3f09b3282d36d936942d071"
        }
      ],
      err: "Expected tweak to be an Uint8Array with length 32"
    },
    {
      args: [
        {
          __Buffer__:
            "022e3e4075b97aed8c7b94fdc2f28eaf416648b2a39d488502aa74722b3247bdb4"
        },
        {
          __Buffer__:
            "fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "022e3e4075b97aed8c7b94fdc2f28eaf416648b2a39d488502aa74722b3247bdb4"
        },
        {
          __Buffer__:
            "fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"
        }
      ],
      err: "The tweak was out of range or the resulted private key is invalid"
    },
    {
      args: [
        {
          __Buffer__:
            "0379be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798"
        },
        {
          __Buffer__:
            "0000000000000000000000000000000000000000000000000000000000000001"
        },
        true
      ],
      argsAfter: [
        {
          __Buffer__:
            "0379be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798"
        },
        {
          __Buffer__:
            "0000000000000000000000000000000000000000000000000000000000000001"
        },
        true
      ],
      err: "The tweak was out of range or the resulted private key is invalid"
    },
    {
      args: [
        {
          __Buffer__:
            "022d1db7c23d8e3428531c9ceaa4f8301ff44e64eae302e18f48d42ee5d837cd95"
        },
        {
          __Buffer__:
            "d836246be122cae79b3f752b62236d81f9178e46068738f5b80726c28851687d"
        },
        null
      ],
      argsAfter: [
        {
          __Buffer__:
            "022d1db7c23d8e3428531c9ceaa4f8301ff44e64eae302e18f48d42ee5d837cd95"
        },
        {
          __Buffer__:
            "d836246be122cae79b3f752b62236d81f9178e46068738f5b80726c28851687d"
        },
        null
      ],
      err: "Expected compressed to be a Boolean"
    },
    {
      args: [
        {
          __Buffer__:
            "02058060562d09620c4ab8d0d4612510faba9a68ab0d2af9a213d3c3d9cb5a64a7"
        },
        {
          __Buffer__:
            "9bfebeb70384b48a42bba56c82285afdc23e63953ec3a40b35c5e7da44ebacf2"
        },
        true,
        null
      ],
      argsAfter: [
        {
          __Buffer__:
            "02058060562d09620c4ab8d0d4612510faba9a68ab0d2af9a213d3c3d9cb5a64a7"
        },
        {
          __Buffer__:
            "9bfebeb70384b48a42bba56c82285afdc23e63953ec3a40b35c5e7da44ebacf2"
        },
        true,
        null
      ],
      err: "Expected output to be an Uint8Array"
    },
    {
      args: [
        {
          __Buffer__:
            "02058060562d09620c4ab8d0d4612510faba9a68ab0d2af9a213d3c3d9cb5a64a7"
        },
        {
          __Buffer__:
            "9bfebeb70384b48a42bba56c82285afdc23e63953ec3a40b35c5e7da44ebacf2"
        },
        true,
        {
          __Bytes__:
            "000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "02058060562d09620c4ab8d0d4612510faba9a68ab0d2af9a213d3c3d9cb5a64a7"
        },
        {
          __Buffer__:
            "9bfebeb70384b48a42bba56c82285afdc23e63953ec3a40b35c5e7da44ebacf2"
        },
        true,
        {
          __Bytes__:
            "000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
        }
      ],
      err: "Expected output to be an Uint8Array with length 33"
    },
    {
      args: [
        {
          __Buffer__:
            "02058060562d09620c4ab8d0d4612510faba9a68ab0d2af9a213d3c3d9cb5a64a7"
        },
        {
          __Buffer__:
            "9bfebeb70384b48a42bba56c82285afdc23e63953ec3a40b35c5e7da44ebacf2"
        },
        false,
        {
          __Bytes__:
            "000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "02058060562d09620c4ab8d0d4612510faba9a68ab0d2af9a213d3c3d9cb5a64a7"
        },
        {
          __Buffer__:
            "9bfebeb70384b48a42bba56c82285afdc23e63953ec3a40b35c5e7da44ebacf2"
        },
        false,
        {
          __Bytes__:
            "000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
        }
      ],
      err: "Expected output to be an Uint8Array with length 65"
    }
  ],
  "secp256k1.publicKeyTweakMul": [
    {
      args: [
        null,
        {
          __Buffer__:
            "63207d1f4c34549dc8452ea772e6b181d5823eaf6ef640cb5992e6724444c344"
        }
      ],
      argsAfter: [
        null,
        {
          __Buffer__:
            "63207d1f4c34549dc8452ea772e6b181d5823eaf6ef640cb5992e6724444c344"
        }
      ],
      err: "Expected public key to be an Uint8Array"
    },
    {
      args: [
        {
          __Buffer__:
            "d2b5367530e2adc7cf4a462650dc6303100ff87e96f8256f7eda7f1d4110ca7d"
        },
        {
          __Buffer__:
            "ec46fc26623bfb67d991a1fdb8ec129ff879b867a8ad5ece200b48c902cbb6c3"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "d2b5367530e2adc7cf4a462650dc6303100ff87e96f8256f7eda7f1d4110ca7d"
        },
        {
          __Buffer__:
            "ec46fc26623bfb67d991a1fdb8ec129ff879b867a8ad5ece200b48c902cbb6c3"
        }
      ],
      err: "Expected public key to be an Uint8Array with length [33, 65]"
    },
    {
      args: [
        {
          __Bytes__:
            "000000000000000000000000000000000000000000000000000000000000000000"
        },
        {
          __Buffer__:
            "73a5cda21f7fcdb4081924ec24fe6009c3a2fb28f49350db519d2a3378cd4fbe"
        }
      ],
      argsAfter: [
        {
          __Bytes__:
            "000000000000000000000000000000000000000000000000000000000000000000"
        },
        {
          __Buffer__:
            "73a5cda21f7fcdb4081924ec24fe6009c3a2fb28f49350db519d2a3378cd4fbe"
        }
      ],
      err: "Public Key could not be parsed"
    },
    {
      args: [
        {
          __Buffer__:
            "03d4fd172a271e63651b81556a3a328662dfd7b45a7aa6b5355811e7786fadccbd"
        },
        null
      ],
      argsAfter: [
        {
          __Buffer__:
            "03d4fd172a271e63651b81556a3a328662dfd7b45a7aa6b5355811e7786fadccbd"
        },
        null
      ],
      err: "Expected tweak to be an Uint8Array"
    },
    {
      args: [
        {
          __Buffer__:
            "03fb596bdfaf604a211525c693c7f47d7a200d1174b5b6fff0e6bc41eb17ff6651"
        },
        {
          __Buffer__:
            "744b0907643f2ebb1352195855fd582602e1ae1bdbf77e8e9d18be826eb1b6"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "03fb596bdfaf604a211525c693c7f47d7a200d1174b5b6fff0e6bc41eb17ff6651"
        },
        {
          __Buffer__:
            "744b0907643f2ebb1352195855fd582602e1ae1bdbf77e8e9d18be826eb1b6"
        }
      ],
      err: "Expected tweak to be an Uint8Array with length 32"
    },
    {
      args: [
        {
          __Buffer__:
            "033a85d361e5faef2fd196f571d5ecab18afe5dab9918f35259e9ddf7761a4ca6a"
        },
        {
          __Buffer__:
            "fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "033a85d361e5faef2fd196f571d5ecab18afe5dab9918f35259e9ddf7761a4ca6a"
        },
        {
          __Buffer__:
            "fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"
        }
      ],
      err: "The tweak was out of range or equal to zero"
    },
    {
      args: [
        {
          __Buffer__:
            "02597c2597af205cf24d1e3c61f24a89e8eea6bc1784c8b6c1f5c495b7bb377852"
        },
        {
          __Buffer__:
            "0000000000000000000000000000000000000000000000000000000000000000"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "02597c2597af205cf24d1e3c61f24a89e8eea6bc1784c8b6c1f5c495b7bb377852"
        },
        {
          __Buffer__:
            "0000000000000000000000000000000000000000000000000000000000000000"
        }
      ],
      err: "The tweak was out of range or equal to zero"
    },
    {
      args: [
        {
          __Buffer__:
            "022ef1392b3c9dd8aaae837b0177f46ad5b971898afbff87e630735473640c0d9f"
        },
        {
          __Buffer__:
            "8d844898e482f7079da66fdd7d914b9e43b445c1449b15e48ec764ded5c7217e"
        },
        null
      ],
      argsAfter: [
        {
          __Buffer__:
            "022ef1392b3c9dd8aaae837b0177f46ad5b971898afbff87e630735473640c0d9f"
        },
        {
          __Buffer__:
            "8d844898e482f7079da66fdd7d914b9e43b445c1449b15e48ec764ded5c7217e"
        },
        null
      ],
      err: "Expected compressed to be a Boolean"
    },
    {
      args: [
        {
          __Buffer__:
            "02cf1b392f6bb4aadf494ab48be2e6c7acd404149efd8e860dcd66470d7fae3162"
        },
        {
          __Buffer__:
            "2a715b7a126969d9eb3279e5d8e74cbdd92a1ce3815348dde0db1b7795ab0ef4"
        },
        true,
        null
      ],
      argsAfter: [
        {
          __Buffer__:
            "02cf1b392f6bb4aadf494ab48be2e6c7acd404149efd8e860dcd66470d7fae3162"
        },
        {
          __Buffer__:
            "2a715b7a126969d9eb3279e5d8e74cbdd92a1ce3815348dde0db1b7795ab0ef4"
        },
        true,
        null
      ],
      err: "Expected output to be an Uint8Array"
    },
    {
      args: [
        {
          __Buffer__:
            "02cf1b392f6bb4aadf494ab48be2e6c7acd404149efd8e860dcd66470d7fae3162"
        },
        {
          __Buffer__:
            "2a715b7a126969d9eb3279e5d8e74cbdd92a1ce3815348dde0db1b7795ab0ef4"
        },
        true,
        {
          __Bytes__:
            "000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "02cf1b392f6bb4aadf494ab48be2e6c7acd404149efd8e860dcd66470d7fae3162"
        },
        {
          __Buffer__:
            "2a715b7a126969d9eb3279e5d8e74cbdd92a1ce3815348dde0db1b7795ab0ef4"
        },
        true,
        {
          __Bytes__:
            "000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
        }
      ],
      err: "Expected output to be an Uint8Array with length 33"
    },
    {
      args: [
        {
          __Buffer__:
            "02cf1b392f6bb4aadf494ab48be2e6c7acd404149efd8e860dcd66470d7fae3162"
        },
        {
          __Buffer__:
            "2a715b7a126969d9eb3279e5d8e74cbdd92a1ce3815348dde0db1b7795ab0ef4"
        },
        false,
        {
          __Bytes__:
            "000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "02cf1b392f6bb4aadf494ab48be2e6c7acd404149efd8e860dcd66470d7fae3162"
        },
        {
          __Buffer__:
            "2a715b7a126969d9eb3279e5d8e74cbdd92a1ce3815348dde0db1b7795ab0ef4"
        },
        false,
        {
          __Bytes__:
            "000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
        }
      ],
      err: "Expected output to be an Uint8Array with length 65"
    }
  ],
  "secp256k1.signatureNormalize": [
    {
      args: [null],
      argsAfter: [null],
      err: "Expected signature to be an Uint8Array"
    },
    {
      args: [
        {
          __Buffer__:
            "f727256ba6af5b18376a5cb62b919d051a20a4b52cdeddb5310c84f650818c65b370bdff12aba36c7274352cfb6fd128b8a362cbcfc7466a84394880d1703c"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "f727256ba6af5b18376a5cb62b919d051a20a4b52cdeddb5310c84f650818c65b370bdff12aba36c7274352cfb6fd128b8a362cbcfc7466a84394880d1703c"
        }
      ],
      err: "Expected signature to be an Uint8Array with length 64"
    },
    {
      args: [
        {
          __Buffer__:
            "fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd03641410000000000000000000000000000000000000000000000000000000000000001"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd03641410000000000000000000000000000000000000000000000000000000000000001"
        }
      ],
      err: "Signature could not be parsed"
    },
    {
      args: [
        {
          __Buffer__:
            "00000000000000000000000000000000000000000000000000000000000000017fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "00000000000000000000000000000000000000000000000000000000000000017fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0"
        }
      ],
      res: {
        __Buffer__:
          "00000000000000000000000000000000000000000000000000000000000000017fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0"
      }
    },
    {
      args: [
        {
          __Buffer__:
            "00000000000000000000000000000000000000000000000000000000000000017fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a1"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "00000000000000000000000000000000000000000000000000000000000000017fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0"
        }
      ],
      res: {
        __Buffer__:
          "00000000000000000000000000000000000000000000000000000000000000017fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0"
      }
    }
  ],
  "secp256k1.signatureExport": [
    {
      args: [null],
      argsAfter: [null],
      err: "Expected signature to be an Uint8Array"
    },
    {
      args: [
        {
          __Buffer__:
            "1848bf5436b2cca647068e64301feb012799b6e68362dc2d8f03b2a9fe45ad38178119562e7d015c10a8570a0697672fab926c6465f38f95d2c12613593e3d"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "1848bf5436b2cca647068e64301feb012799b6e68362dc2d8f03b2a9fe45ad38178119562e7d015c10a8570a0697672fab926c6465f38f95d2c12613593e3d"
        }
      ],
      err: "Expected signature to be an Uint8Array with length 64"
    },
    {
      args: [
        {
          __Buffer__:
            "fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd03641410000000000000000000000000000000000000000000000000000000000000001"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd03641410000000000000000000000000000000000000000000000000000000000000001"
        }
      ],
      err: "Signature could not be parsed"
    },
    {
      args: [
        {
          __Buffer__:
            "6e3ff20960c72ba1a5cb83a0054ae20e496c3713f1a0db693e925d906d64fa647bb308435a3d4fbd40a8ea376fbcee25da32266abbbe1f9072983892afaf7485"
        },
        null
      ],
      argsAfter: [
        {
          __Buffer__:
            "6e3ff20960c72ba1a5cb83a0054ae20e496c3713f1a0db693e925d906d64fa647bb308435a3d4fbd40a8ea376fbcee25da32266abbbe1f9072983892afaf7485"
        },
        null
      ],
      err: "Expected output to be an Uint8Array"
    },
    {
      args: [
        {
          __Buffer__:
            "6e3ff20960c72ba1a5cb83a0054ae20e496c3713f1a0db693e925d906d64fa647bb308435a3d4fbd40a8ea376fbcee25da32266abbbe1f9072983892afaf7485"
        },
        {
          __Bytes__:
            "000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "6e3ff20960c72ba1a5cb83a0054ae20e496c3713f1a0db693e925d906d64fa647bb308435a3d4fbd40a8ea376fbcee25da32266abbbe1f9072983892afaf7485"
        },
        {
          __Bytes__:
            "000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
        }
      ],
      err: "Expected output to be an Uint8Array with length 72"
    },
    {
      args: [
        {
          __Buffer__:
            "ad1cbb8504417c5935b52f09b00169b55ca99715b334a3249c2aaf7332d8a3833170d726b69dd4743c8aef4bd853bed5f773509f23724ed5591c4169bd6aedf1"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "ad1cbb8504417c5935b52f09b00169b55ca99715b334a3249c2aaf7332d8a3833170d726b69dd4743c8aef4bd853bed5f773509f23724ed5591c4169bd6aedf1"
        }
      ],
      res: {
        __Bytes__:
          "3045022100ad1cbb8504417c5935b52f09b00169b55ca99715b334a3249c2aaf7332d8a38302203170d726b69dd4743c8aef4bd853bed5f773509f23724ed5591c4169bd6aedf1"
      }
    }
  ],
  "secp256k1.signatureImport": [
    {
      args: [null],
      argsAfter: [null],
      err: "Expected signature to be an Uint8Array"
    },
    {
      args: [
        {
          __Bytes__:
            "000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
        }
      ],
      argsAfter: [
        {
          __Bytes__:
            "000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
        }
      ],
      err: "Signature could not be parsed"
    },
    {
      args: [{ __Buffer__: "3006020101020101" }, null],
      argsAfter: [{ __Buffer__: "3006020101020101" }, null],
      err: "Expected output to be an Uint8Array"
    },
    {
      args: [
        { __Buffer__: "3006020101020101" },
        {
          __Bytes__:
            "000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
        }
      ],
      argsAfter: [
        { __Buffer__: "3006020101020101" },
        {
          __Bytes__:
            "000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
        }
      ],
      err: "Expected output to be an Uint8Array with length 64"
    }
  ],
  "secp256k1.ecdsaSign": [
    {
      args: [null],
      argsAfter: [null],
      err: "Expected message to be an Uint8Array"
    },
    {
      args: [
        {
          __Buffer__:
            "828880b1595b6f26be83bffcccffd7c9df16fc7c6af59f431fee3712007f7a"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "828880b1595b6f26be83bffcccffd7c9df16fc7c6af59f431fee3712007f7a"
        }
      ],
      err: "Expected message to be an Uint8Array with length 32"
    },
    {
      args: [
        {
          __Buffer__:
            "f702d296765245bb985bb5f6a56135df167587144990c5017aecb3fd6c217eb2"
        },
        null
      ],
      argsAfter: [
        {
          __Buffer__:
            "f702d296765245bb985bb5f6a56135df167587144990c5017aecb3fd6c217eb2"
        },
        null
      ],
      err: "Expected private key to be an Uint8Array"
    },
    {
      args: [
        {
          __Buffer__:
            "ee822aa16108dd3f81dbdf462fcebd3042aa15e9ea166eef17d643e6869faa88"
        },
        {
          __Buffer__:
            "924c57ca2adb7f5f63d04854f87ae4b2b47fe851cdec5176fd15aa94ae9524"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "ee822aa16108dd3f81dbdf462fcebd3042aa15e9ea166eef17d643e6869faa88"
        },
        {
          __Buffer__:
            "924c57ca2adb7f5f63d04854f87ae4b2b47fe851cdec5176fd15aa94ae9524"
        }
      ],
      err: "Expected private key to be an Uint8Array with length 32"
    },
    {
      args: [
        {
          __Buffer__:
            "b03754e195e1ac3f44a04bed0a29e710a59db9ad779b00ea357840ea6a8f7de7"
        },
        {
          __Bytes__:
            "0000000000000000000000000000000000000000000000000000000000000000"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "b03754e195e1ac3f44a04bed0a29e710a59db9ad779b00ea357840ea6a8f7de7"
        },
        {
          __Bytes__:
            "0000000000000000000000000000000000000000000000000000000000000000"
        }
      ],
      err:
        "The nonce generation function failed, or the private key was invalid"
    },
    {
      args: [
        {
          __Buffer__:
            "6426557330ca297e8bf74f1b5127578b7de757a99b9ccbec7c168452d8d1419c"
        },
        {
          __Buffer__:
            "fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "6426557330ca297e8bf74f1b5127578b7de757a99b9ccbec7c168452d8d1419c"
        },
        {
          __Buffer__:
            "fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"
        }
      ],
      err:
        "The nonce generation function failed, or the private key was invalid"
    },
    {
      args: [
        {
          __Buffer__:
            "12f08e363a977031d385e0ac7296a09c6b88418c5c7e2acb4ad933db7a820af4"
        },
        {
          __Buffer__:
            "b01553881e751f758482e4be15e3575e1840267bce371dc3f4b205b527443e8c"
        },
        null
      ],
      argsAfter: [
        {
          __Buffer__:
            "12f08e363a977031d385e0ac7296a09c6b88418c5c7e2acb4ad933db7a820af4"
        },
        {
          __Buffer__:
            "b01553881e751f758482e4be15e3575e1840267bce371dc3f4b205b527443e8c"
        },
        null
      ],
      err: "Expected options to be an Object"
    },
    {
      args: [
        {
          __Buffer__:
            "12f08e363a977031d385e0ac7296a09c6b88418c5c7e2acb4ad933db7a820af4"
        },
        {
          __Buffer__:
            "b01553881e751f758482e4be15e3575e1840267bce371dc3f4b205b527443e8c"
        },
        42
      ],
      argsAfter: [
        {
          __Buffer__:
            "12f08e363a977031d385e0ac7296a09c6b88418c5c7e2acb4ad933db7a820af4"
        },
        {
          __Buffer__:
            "b01553881e751f758482e4be15e3575e1840267bce371dc3f4b205b527443e8c"
        },
        42
      ],
      err: "Expected options to be an Object"
    },
    {
      args: [
        {
          __Buffer__:
            "12f08e363a977031d385e0ac7296a09c6b88418c5c7e2acb4ad933db7a820af4"
        },
        {
          __Buffer__:
            "b01553881e751f758482e4be15e3575e1840267bce371dc3f4b205b527443e8c"
        },
        { data: null }
      ],
      argsAfter: [
        {
          __Buffer__:
            "12f08e363a977031d385e0ac7296a09c6b88418c5c7e2acb4ad933db7a820af4"
        },
        {
          __Buffer__:
            "b01553881e751f758482e4be15e3575e1840267bce371dc3f4b205b527443e8c"
        },
        { data: null }
      ],
      err: "Expected options.data to be an Uint8Array"
    },
    {
      args: [
        {
          __Buffer__:
            "12f08e363a977031d385e0ac7296a09c6b88418c5c7e2acb4ad933db7a820af4"
        },
        {
          __Buffer__:
            "b01553881e751f758482e4be15e3575e1840267bce371dc3f4b205b527443e8c"
        },
        { noncefn: null }
      ],
      argsAfter: [
        {
          __Buffer__:
            "12f08e363a977031d385e0ac7296a09c6b88418c5c7e2acb4ad933db7a820af4"
        },
        {
          __Buffer__:
            "b01553881e751f758482e4be15e3575e1840267bce371dc3f4b205b527443e8c"
        },
        { noncefn: null }
      ],
      err: "Expected options.noncefn to be a Function"
    },
    {
      args: [
        {
          __Buffer__:
            "a57ee5b9a84b4fde74e68c9de11b6de7bcc3a4982c0a51581aebe32ebbc043ec"
        },
        {
          __Buffer__:
            "96872b21294b1f547cf37c51065609a857b1009bd520b7b70338e18549b072a8"
        },
        {},
        null
      ],
      argsAfter: [
        {
          __Buffer__:
            "a57ee5b9a84b4fde74e68c9de11b6de7bcc3a4982c0a51581aebe32ebbc043ec"
        },
        {
          __Buffer__:
            "96872b21294b1f547cf37c51065609a857b1009bd520b7b70338e18549b072a8"
        },
        {},
        null
      ],
      err: "Expected output to be an Uint8Array"
    },
    {
      args: [
        {
          __Buffer__:
            "a57ee5b9a84b4fde74e68c9de11b6de7bcc3a4982c0a51581aebe32ebbc043ec"
        },
        {
          __Buffer__:
            "96872b21294b1f547cf37c51065609a857b1009bd520b7b70338e18549b072a8"
        },
        {},
        {
          __Bytes__:
            "000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "a57ee5b9a84b4fde74e68c9de11b6de7bcc3a4982c0a51581aebe32ebbc043ec"
        },
        {
          __Buffer__:
            "96872b21294b1f547cf37c51065609a857b1009bd520b7b70338e18549b072a8"
        },
        {},
        {
          __Bytes__:
            "000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
        }
      ],
      err: "Expected output to be an Uint8Array with length 64"
    }
  ],
  "secp256k1.ecdsaVerify": [
    {
      args: [null],
      argsAfter: [null],
      err: "Expected signature to be an Uint8Array"
    },
    {
      args: [
        {
          __Buffer__:
            "3ca525c74a8f7a90cd9cae0d22e3ffea40aa9a50098a256eb5aae34c9ba57a229d4d1804009e6c53c1a26f198433bbe0555d2477f71237f8303d1a4856ba8f"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "3ca525c74a8f7a90cd9cae0d22e3ffea40aa9a50098a256eb5aae34c9ba57a229d4d1804009e6c53c1a26f198433bbe0555d2477f71237f8303d1a4856ba8f"
        }
      ],
      err: "Expected signature to be an Uint8Array with length 64"
    },
    {
      args: [
        {
          __Buffer__:
            "fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd036414158e8c8d8eb2df6b9238be32f0c9739da371d2bacb31a1899ac370c923ce9fd83"
        },
        {
          __Buffer__:
            "dab989701782cb6850c28b62e76ade183e14386e6f5623a79ec55750c8f0444f"
        },
        {
          __Buffer__:
            "0352a2bc282b9bfe236580b1ec3c82d9e029ac6fa57fbe0d7e3e097e8d6d7901b9"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd036414158e8c8d8eb2df6b9238be32f0c9739da371d2bacb31a1899ac370c923ce9fd83"
        },
        {
          __Buffer__:
            "dab989701782cb6850c28b62e76ade183e14386e6f5623a79ec55750c8f0444f"
        },
        {
          __Buffer__:
            "0352a2bc282b9bfe236580b1ec3c82d9e029ac6fa57fbe0d7e3e097e8d6d7901b9"
        }
      ],
      err: "Signature could not be parsed"
    },
    {
      args: [
        {
          __Buffer__:
            "e70f70a2c59b763d2268b9d3ae6f548b1ee119f2520779d4b3240c21f450253d1a1a34791144c83696c9cf4c2561fc55d19dfac85efa1ce877b18c0b1fea1b51"
        },
        null,
        {
          __Buffer__:
            "039733c818f3aa880db189c9ea8184eaed10f32bffb2204b67f743c393585393a2"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "e70f70a2c59b763d2268b9d3ae6f548b1ee119f2520779d4b3240c21f450253d1a1a34791144c83696c9cf4c2561fc55d19dfac85efa1ce877b18c0b1fea1b51"
        },
        null,
        {
          __Buffer__:
            "039733c818f3aa880db189c9ea8184eaed10f32bffb2204b67f743c393585393a2"
        }
      ],
      err: "Expected message to be an Uint8Array"
    },
    {
      args: [
        {
          __Buffer__:
            "aaf5c44eefb0f913990a3fd2829e36b494fe4b2c5de49f164ebbaf3b6ad62e7d182e22f04cd2e57ef869caa617d08e99bf0b8fa23adb7162b236365ad4e4ace0"
        },
        {
          __Buffer__:
            "484f5ab0862d117fa11cb97dcee15f12fe40125e5dfd29309e0c30da743761"
        },
        {
          __Buffer__:
            "032a5b3c7471164132b9ab718df77751bf209c0e52b588637e92fbe7cb65a12e87"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "aaf5c44eefb0f913990a3fd2829e36b494fe4b2c5de49f164ebbaf3b6ad62e7d182e22f04cd2e57ef869caa617d08e99bf0b8fa23adb7162b236365ad4e4ace0"
        },
        {
          __Buffer__:
            "484f5ab0862d117fa11cb97dcee15f12fe40125e5dfd29309e0c30da743761"
        },
        {
          __Buffer__:
            "032a5b3c7471164132b9ab718df77751bf209c0e52b588637e92fbe7cb65a12e87"
        }
      ],
      err: "Expected message to be an Uint8Array with length 32"
    },
    {
      args: [
        {
          __Buffer__:
            "65277746a1cd1f301c7eacbf50cdea1663ad1c4fbbe9d94716d2cebb65b21cf55748b3ab0c521011c6e341dd9024a4d2c3e3251efbe38c86f53c13baaa08d325"
        },
        {
          __Buffer__:
            "32f0c051d3b5b5322ba33ce85a7ce920bf99a78acc43eba61f4579bbe59a52d6"
        },
        null
      ],
      argsAfter: [
        {
          __Buffer__:
            "65277746a1cd1f301c7eacbf50cdea1663ad1c4fbbe9d94716d2cebb65b21cf55748b3ab0c521011c6e341dd9024a4d2c3e3251efbe38c86f53c13baaa08d325"
        },
        {
          __Buffer__:
            "32f0c051d3b5b5322ba33ce85a7ce920bf99a78acc43eba61f4579bbe59a52d6"
        },
        null
      ],
      err: "Expected public key to be an Uint8Array"
    },
    {
      args: [
        {
          __Buffer__:
            "b60f0d27e1a5260a59cc0a84bf8507128473a0f92935423814b645e5ee965a9435fb7a1aea8970707eccb591d029e60fc0203420c5d9dfd77718446e10bf1723"
        },
        {
          __Buffer__:
            "1b2d76070b1e09bbd5d669e1742885d5c628bd2d4a81d1f280085c91d8f6c0cf"
        },
        {
          __Buffer__:
            "42e5c6b28983eef2e334ec66b17868de47b3b152ea9d187f704229f8d2e858f7"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "b60f0d27e1a5260a59cc0a84bf8507128473a0f92935423814b645e5ee965a9435fb7a1aea8970707eccb591d029e60fc0203420c5d9dfd77718446e10bf1723"
        },
        {
          __Buffer__:
            "1b2d76070b1e09bbd5d669e1742885d5c628bd2d4a81d1f280085c91d8f6c0cf"
        },
        {
          __Buffer__:
            "42e5c6b28983eef2e334ec66b17868de47b3b152ea9d187f704229f8d2e858f7"
        }
      ],
      err: "Expected public key to be an Uint8Array with length [33, 65]"
    },
    {
      args: [
        {
          __Buffer__:
            "3b06d28205f71cea64dc9ddd461827b762417d9598aab7e963e7ac34a4967cf93f54e3e5d860759305a13825e055b15347f0ce1fb25dd9cec93f25cb04c05612"
        },
        {
          __Buffer__:
            "238aca388260d30eec6f45c3518fe47ca5a128921a9826fe973ae00d34574bbd"
        },
        {
          __Buffer__:
            "013f1c2710951aa6b4294881e74e8be175992bcac0c7dfbefc90396aaa01731dc0"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "3b06d28205f71cea64dc9ddd461827b762417d9598aab7e963e7ac34a4967cf93f54e3e5d860759305a13825e055b15347f0ce1fb25dd9cec93f25cb04c05612"
        },
        {
          __Buffer__:
            "238aca388260d30eec6f45c3518fe47ca5a128921a9826fe973ae00d34574bbd"
        },
        {
          __Buffer__:
            "013f1c2710951aa6b4294881e74e8be175992bcac0c7dfbefc90396aaa01731dc0"
        }
      ],
      err: "Public Key could not be parsed"
    },
    {
      args: [
        {
          __Buffer__:
            "11a052cfc1234be184ea494c08b7ae2289d04f39ffd453db1652fb596606a81f7ede980239a1e8ee73413853bf587191ca0e5bd71b68c7abbe5e0a0f0f7475ce"
        },
        {
          __Buffer__:
            "ba8459d0fe37784029de0d84f00c58aed69ead04a3d71a6c6a088fa8283e8f47"
        },
        {
          __Buffer__:
            "0399c61b8f54b812fd6d5dab3d9480aef80d9c0879db1dc68d656685ce8d79bacb"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "11a052cfc1234be184ea494c08b7ae2289d04f39ffd453db1652fb596606a81f7ede980239a1e8ee73413853bf587191ca0e5bd71b68c7abbe5e0a0f0f7475ce"
        },
        {
          __Buffer__:
            "ba8459d0fe37784029de0d84f00c58aed69ead04a3d71a6c6a088fa8283e8f47"
        },
        {
          __Buffer__:
            "0399c61b8f54b812fd6d5dab3d9480aef80d9c0879db1dc68d656685ce8d79bacb"
        }
      ],
      res: true
    },
    {
      args: [
        {
          __Buffer__:
            "11a052cfc1234be184ea494c08b7ae2289d04f39ffd453db1652fb596606a81f7ede980239a1e8ee73413853bf587191ca0e5bd71b68c7abbe5e0a0f0f7475ce"
        },
        {
          __Buffer__:
            "bb8459d0fe37784029de0d84f00c58aed69ead04a3d71a6c6a088fa8283e8f47"
        },
        {
          __Buffer__:
            "0399c61b8f54b812fd6d5dab3d9480aef80d9c0879db1dc68d656685ce8d79bacb"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "11a052cfc1234be184ea494c08b7ae2289d04f39ffd453db1652fb596606a81f7ede980239a1e8ee73413853bf587191ca0e5bd71b68c7abbe5e0a0f0f7475ce"
        },
        {
          __Buffer__:
            "bb8459d0fe37784029de0d84f00c58aed69ead04a3d71a6c6a088fa8283e8f47"
        },
        {
          __Buffer__:
            "0399c61b8f54b812fd6d5dab3d9480aef80d9c0879db1dc68d656685ce8d79bacb"
        }
      ],
      res: false
    },
    {
      args: [
        {
          __Buffer__:
            "00000000000000000000000000000000000000000000000000000000000000007ede980239a1e8ee73413853bf587191ca0e5bd71b68c7abbe5e0a0f0f7475ce"
        },
        {
          __Buffer__:
            "ba8459d0fe37784029de0d84f00c58aed69ead04a3d71a6c6a088fa8283e8f47"
        },
        {
          __Buffer__:
            "0399c61b8f54b812fd6d5dab3d9480aef80d9c0879db1dc68d656685ce8d79bacb"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "00000000000000000000000000000000000000000000000000000000000000007ede980239a1e8ee73413853bf587191ca0e5bd71b68c7abbe5e0a0f0f7475ce"
        },
        {
          __Buffer__:
            "ba8459d0fe37784029de0d84f00c58aed69ead04a3d71a6c6a088fa8283e8f47"
        },
        {
          __Buffer__:
            "0399c61b8f54b812fd6d5dab3d9480aef80d9c0879db1dc68d656685ce8d79bacb"
        }
      ],
      res: false
    },
    {
      args: [
        {
          __Buffer__:
            "11a052cfc1234be184ea494c08b7ae2289d04f39ffd453db1652fb596606a81f0000000000000000000000000000000000000000000000000000000000000000"
        },
        {
          __Buffer__:
            "ba8459d0fe37784029de0d84f00c58aed69ead04a3d71a6c6a088fa8283e8f47"
        },
        {
          __Buffer__:
            "0399c61b8f54b812fd6d5dab3d9480aef80d9c0879db1dc68d656685ce8d79bacb"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "11a052cfc1234be184ea494c08b7ae2289d04f39ffd453db1652fb596606a81f0000000000000000000000000000000000000000000000000000000000000000"
        },
        {
          __Buffer__:
            "ba8459d0fe37784029de0d84f00c58aed69ead04a3d71a6c6a088fa8283e8f47"
        },
        {
          __Buffer__:
            "0399c61b8f54b812fd6d5dab3d9480aef80d9c0879db1dc68d656685ce8d79bacb"
        }
      ],
      res: false
    },
    {
      args: [
        {
          __Buffer__:
            "bb4124ce65ef1e1f32c796020fa00c6e35aa8b1384cfc05f105483febe9dcf107178ce0420ddf61e75b48b348751db4b5197efe5e1e194134ae833d798075437"
        },
        {
          __Buffer__:
            "ce98a7f3a2fa3ba90ef3b693089964165a886b6ea87bc6fb950d906a209ff6ac"
        },
        {
          __Buffer__:
            "0287c4aceff79d0f81862be527fda9dbcbf1318206fd1a9eab4e304445f74712e3"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "bb4124ce65ef1e1f32c796020fa00c6e35aa8b1384cfc05f105483febe9dcf107178ce0420ddf61e75b48b348751db4b5197efe5e1e194134ae833d798075437"
        },
        {
          __Buffer__:
            "ce98a7f3a2fa3ba90ef3b693089964165a886b6ea87bc6fb950d906a209ff6ac"
        },
        {
          __Buffer__:
            "0287c4aceff79d0f81862be527fda9dbcbf1318206fd1a9eab4e304445f74712e3"
        }
      ],
      res: true
    }
  ],
  "secp256k1.ecdsaRecover": [
    {
      args: [null],
      argsAfter: [null],
      err: "Expected signature to be an Uint8Array"
    },
    {
      args: [
        {
          __Buffer__:
            "7ccef1cad0d4e73fe79ab4d306e767d44e5615bb38b30d65df2f0664143ec422d1d9b8e51e6ce0782a68ad1867c6241a4e65e4184767db4de78675f3ee3268"
        },
        0,
        {
          __Buffer__:
            "11c4323193e4ada65b9f9d97d5d22809e215415e668abc6a72dcc33aaf029618"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "7ccef1cad0d4e73fe79ab4d306e767d44e5615bb38b30d65df2f0664143ec422d1d9b8e51e6ce0782a68ad1867c6241a4e65e4184767db4de78675f3ee3268"
        },
        0,
        {
          __Buffer__:
            "11c4323193e4ada65b9f9d97d5d22809e215415e668abc6a72dcc33aaf029618"
        }
      ],
      err: "Expected signature to be an Uint8Array with length 64"
    },
    {
      args: [
        {
          __Buffer__:
            "fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd036414110ff78e4b7e67edc82592e22d2a60f2301fd70c9251d0ade720fcda5c5e4871e"
        },
        0,
        {
          __Buffer__:
            "bbcc0fc65544ca76a337d748ae6acf598cd255c21ae77fde7d231feb09194f50"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd036414110ff78e4b7e67edc82592e22d2a60f2301fd70c9251d0ade720fcda5c5e4871e"
        },
        0,
        {
          __Buffer__:
            "bbcc0fc65544ca76a337d748ae6acf598cd255c21ae77fde7d231feb09194f50"
        }
      ],
      err: "Signature could not be parsed"
    },
    {
      args: [
        {
          __Buffer__:
            "8987cd2d162a01e18cd8135866f9c4545a01beeb8c40411b24c0504c6ab201ed8ba989ef676a1ebf135299e4b566214a7ac8f1ff73631b8fcc6967052855e297"
        },
        null,
        {
          __Buffer__:
            "4f7f5d2ca719813eb08a34eecc8b9282eba0821f32ed10f2b670a7014981b710"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "8987cd2d162a01e18cd8135866f9c4545a01beeb8c40411b24c0504c6ab201ed8ba989ef676a1ebf135299e4b566214a7ac8f1ff73631b8fcc6967052855e297"
        },
        null,
        {
          __Buffer__:
            "4f7f5d2ca719813eb08a34eecc8b9282eba0821f32ed10f2b670a7014981b710"
        }
      ],
      err: "Expected recovery id to be a Number within interval [0, 3]"
    },
    {
      args: [
        {
          __Buffer__:
            "8987cd2d162a01e18cd8135866f9c4545a01beeb8c40411b24c0504c6ab201ed8ba989ef676a1ebf135299e4b566214a7ac8f1ff73631b8fcc6967052855e297"
        },
        4,
        {
          __Buffer__:
            "4f7f5d2ca719813eb08a34eecc8b9282eba0821f32ed10f2b670a7014981b710"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "8987cd2d162a01e18cd8135866f9c4545a01beeb8c40411b24c0504c6ab201ed8ba989ef676a1ebf135299e4b566214a7ac8f1ff73631b8fcc6967052855e297"
        },
        4,
        {
          __Buffer__:
            "4f7f5d2ca719813eb08a34eecc8b9282eba0821f32ed10f2b670a7014981b710"
        }
      ],
      err: "Expected recovery id to be a Number within interval [0, 3]"
    },
    {
      args: [
        {
          __Buffer__:
            "d63eff8a39cd34de02d1273cfa744e40a6932421e8f2ec599e63f0d1ac07e76c65a3b54b76de1d95c28517ba7ec1dbf1f62701927eecca55cfbd77795ccf6f02"
        },
        0,
        null
      ],
      argsAfter: [
        {
          __Buffer__:
            "d63eff8a39cd34de02d1273cfa744e40a6932421e8f2ec599e63f0d1ac07e76c65a3b54b76de1d95c28517ba7ec1dbf1f62701927eecca55cfbd77795ccf6f02"
        },
        0,
        null
      ],
      err: "Expected message to be an Uint8Array"
    },
    {
      args: [
        {
          __Buffer__:
            "b47ef41e71989f22bbc461b2cd52a9ea5df339da6a29adf8bea14cdc49a87cc8396759fb6f00d62842211b5a895238ddfabce7b478b7d663164b121c6358b5d5"
        },
        0,
        {
          __Buffer__:
            "bbf04a4b9646981205d8fc40086a6108f01a714e70d3b076c9dccced3bd35b"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "b47ef41e71989f22bbc461b2cd52a9ea5df339da6a29adf8bea14cdc49a87cc8396759fb6f00d62842211b5a895238ddfabce7b478b7d663164b121c6358b5d5"
        },
        0,
        {
          __Buffer__:
            "bbf04a4b9646981205d8fc40086a6108f01a714e70d3b076c9dccced3bd35b"
        }
      ],
      err: "Expected message to be an Uint8Array with length 32"
    },
    {
      args: [
        {
          __Buffer__:
            "1af87ae2721d3bdcaec96a9a21eba549a2aee7846532886704e87487e4a4d38d33f921aa5430bb0c6a1ac3f8959fe443d6554c10e5664536f78536329d518e74"
        },
        0,
        {
          __Buffer__:
            "28a34fd7dd2c895b1c5f0ee38ba10c87ffc93ed6c08e7887712035c1af1b0a6b"
        },
        null
      ],
      argsAfter: [
        {
          __Buffer__:
            "1af87ae2721d3bdcaec96a9a21eba549a2aee7846532886704e87487e4a4d38d33f921aa5430bb0c6a1ac3f8959fe443d6554c10e5664536f78536329d518e74"
        },
        0,
        {
          __Buffer__:
            "28a34fd7dd2c895b1c5f0ee38ba10c87ffc93ed6c08e7887712035c1af1b0a6b"
        },
        null
      ],
      err: "Expected compressed to be a Boolean"
    },
    {
      args: [
        {
          __Buffer__:
            "328b6dc618ddc8a9c64f2fba8961f44ee6661e25e816906624920a58c3c319f67fa31cce745592102f204e5ccce9de2d4477b0ae2d4abe2054c17f64fb0be511"
        },
        0,
        {
          __Buffer__:
            "e2b785eefd015cd4522e874d02617d2556f58092648d1fbfac48a99c6f03c4f0"
        },
        true,
        null
      ],
      argsAfter: [
        {
          __Buffer__:
            "328b6dc618ddc8a9c64f2fba8961f44ee6661e25e816906624920a58c3c319f67fa31cce745592102f204e5ccce9de2d4477b0ae2d4abe2054c17f64fb0be511"
        },
        0,
        {
          __Buffer__:
            "e2b785eefd015cd4522e874d02617d2556f58092648d1fbfac48a99c6f03c4f0"
        },
        true,
        null
      ],
      err: "Expected output to be an Uint8Array"
    },
    {
      args: [
        {
          __Buffer__:
            "328b6dc618ddc8a9c64f2fba8961f44ee6661e25e816906624920a58c3c319f67fa31cce745592102f204e5ccce9de2d4477b0ae2d4abe2054c17f64fb0be511"
        },
        0,
        {
          __Buffer__:
            "e2b785eefd015cd4522e874d02617d2556f58092648d1fbfac48a99c6f03c4f0"
        },
        true,
        {
          __Bytes__:
            "000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "328b6dc618ddc8a9c64f2fba8961f44ee6661e25e816906624920a58c3c319f67fa31cce745592102f204e5ccce9de2d4477b0ae2d4abe2054c17f64fb0be511"
        },
        0,
        {
          __Buffer__:
            "e2b785eefd015cd4522e874d02617d2556f58092648d1fbfac48a99c6f03c4f0"
        },
        true,
        {
          __Bytes__:
            "000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
        }
      ],
      err: "Expected output to be an Uint8Array with length 33"
    },
    {
      args: [
        {
          __Buffer__:
            "328b6dc618ddc8a9c64f2fba8961f44ee6661e25e816906624920a58c3c319f67fa31cce745592102f204e5ccce9de2d4477b0ae2d4abe2054c17f64fb0be511"
        },
        0,
        {
          __Buffer__:
            "e2b785eefd015cd4522e874d02617d2556f58092648d1fbfac48a99c6f03c4f0"
        },
        false,
        {
          __Bytes__:
            "000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "328b6dc618ddc8a9c64f2fba8961f44ee6661e25e816906624920a58c3c319f67fa31cce745592102f204e5ccce9de2d4477b0ae2d4abe2054c17f64fb0be511"
        },
        0,
        {
          __Buffer__:
            "e2b785eefd015cd4522e874d02617d2556f58092648d1fbfac48a99c6f03c4f0"
        },
        false,
        {
          __Bytes__:
            "000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
        }
      ],
      err: "Expected output to be an Uint8Array with length 65"
    },
    {
      args: [
        {
          __Buffer__:
            "000000000000000000000000000000000000000000000000000000000000000002fa1ef60abcf7526c04e40622751220fe1ac5a73e7d7003e89cd32dec1826da"
        },
        0,
        {
          __Buffer__:
            "0c25c29a20e27d0aa9f4aa20871272c7e8e3572f9b9ec3e44f3266dedb95aacf"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "000000000000000000000000000000000000000000000000000000000000000002fa1ef60abcf7526c04e40622751220fe1ac5a73e7d7003e89cd32dec1826da"
        },
        0,
        {
          __Buffer__:
            "0c25c29a20e27d0aa9f4aa20871272c7e8e3572f9b9ec3e44f3266dedb95aacf"
        }
      ],
      err: "Public key could not be recover"
    },
    {
      args: [
        {
          __Buffer__:
            "a95566939af2256529d485455695b1c4928134119bd0af1ad7bef76f434948be0000000000000000000000000000000000000000000000000000000000000000"
        },
        0,
        {
          __Buffer__:
            "0c25c29a20e27d0aa9f4aa20871272c7e8e3572f9b9ec3e44f3266dedb95aacf"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "a95566939af2256529d485455695b1c4928134119bd0af1ad7bef76f434948be0000000000000000000000000000000000000000000000000000000000000000"
        },
        0,
        {
          __Buffer__:
            "0c25c29a20e27d0aa9f4aa20871272c7e8e3572f9b9ec3e44f3266dedb95aacf"
        }
      ],
      err: "Public key could not be recover"
    },
    {
      args: [
        {
          __Buffer__:
            "a95566939af2256529d485455695b1c4928134119bd0af1ad7bef76f434948be02fa1ef60abcf7526c04e40622751220fe1ac5a73e7d7003e89cd32dec1826da"
        },
        2,
        {
          __Buffer__:
            "0c25c29a20e27d0aa9f4aa20871272c7e8e3572f9b9ec3e44f3266dedb95aacf"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "a95566939af2256529d485455695b1c4928134119bd0af1ad7bef76f434948be02fa1ef60abcf7526c04e40622751220fe1ac5a73e7d7003e89cd32dec1826da"
        },
        2,
        {
          __Buffer__:
            "0c25c29a20e27d0aa9f4aa20871272c7e8e3572f9b9ec3e44f3266dedb95aacf"
        }
      ],
      err: "Public key could not be recover"
    }
  ],
  "secp256k1.ecdh": [
    {
      args: [
        null,
        {
          __Buffer__:
            "410bc90bf69785b2cf5c8bdcb40e090c08cc338c10341fb52bad9343e0a5fbf4"
        }
      ],
      argsAfter: [
        null,
        {
          __Buffer__:
            "410bc90bf69785b2cf5c8bdcb40e090c08cc338c10341fb52bad9343e0a5fbf4"
        }
      ],
      err: "Expected public key to be an Uint8Array"
    },
    {
      args: [
        {
          __Buffer__:
            "4f22baa61b26a069a3c0d89250609d429f8c1b25474cde8ef5fd6621206e5553"
        },
        {
          __Buffer__:
            "a8e988bda37c86e9db4be12ceab3a745137906ca657cb8eb90c3a8b2acdb298d"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "4f22baa61b26a069a3c0d89250609d429f8c1b25474cde8ef5fd6621206e5553"
        },
        {
          __Buffer__:
            "a8e988bda37c86e9db4be12ceab3a745137906ca657cb8eb90c3a8b2acdb298d"
        }
      ],
      err: "Expected public key to be an Uint8Array with length [33, 65]"
    },
    {
      args: [
        {
          __Buffer__:
            "011f757495457eaab6502cde46af2206fe6268c3421fabde49e89f80ba6cdf6783"
        },
        {
          __Buffer__:
            "168d45231ac44d6fff58055b37422cf6567e7358fe759629f87fe2b114b3631e"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "011f757495457eaab6502cde46af2206fe6268c3421fabde49e89f80ba6cdf6783"
        },
        {
          __Buffer__:
            "168d45231ac44d6fff58055b37422cf6567e7358fe759629f87fe2b114b3631e"
        }
      ],
      err: "Public Key could not be parsed"
    },
    {
      args: [
        {
          __Buffer__:
            "02445bfe6e12511703ff6550a5e227da8cf04a2601ba287da35870d3191c58d828"
        },
        null
      ],
      argsAfter: [
        {
          __Buffer__:
            "02445bfe6e12511703ff6550a5e227da8cf04a2601ba287da35870d3191c58d828"
        },
        null
      ],
      err: "Expected private key to be an Uint8Array"
    },
    {
      args: [
        {
          __Buffer__:
            "0242eed9610510cd2f23478184e473b92ae11f4f2c5fdb6939d4a62d8c1daa41fa"
        },
        {
          __Buffer__:
            "efebbc998490f22b887e8063ab9d31344acfa26ee06e7f480cb15ba98eae41"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "0242eed9610510cd2f23478184e473b92ae11f4f2c5fdb6939d4a62d8c1daa41fa"
        },
        {
          __Buffer__:
            "efebbc998490f22b887e8063ab9d31344acfa26ee06e7f480cb15ba98eae41"
        }
      ],
      err: "Expected private key to be an Uint8Array with length 32"
    },
    {
      args: [
        {
          __Buffer__:
            "03b80dde5bbca37a93a8e3ad49b3ad8eedf73e11083cedfbbcbceb7e9139b3f845"
        },
        {
          __Buffer__:
            "fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "03b80dde5bbca37a93a8e3ad49b3ad8eedf73e11083cedfbbcbceb7e9139b3f845"
        },
        {
          __Buffer__:
            "fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"
        }
      ],
      err: "Scalar was invalid (zero or overflow)"
    },
    {
      args: [
        {
          __Buffer__:
            "02a43f7de2291ad47927a1ac333e384503a0bd0a00716454b4527e028089b982c6"
        },
        {
          __Buffer__:
            "0000000000000000000000000000000000000000000000000000000000000000"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "02a43f7de2291ad47927a1ac333e384503a0bd0a00716454b4527e028089b982c6"
        },
        {
          __Buffer__:
            "0000000000000000000000000000000000000000000000000000000000000000"
        }
      ],
      err: "Scalar was invalid (zero or overflow)"
    },
    {
      args: [
        {
          __Buffer__:
            "02a2acb97f34863f398de47381e423cc032f2970bab355fcab15f4988fe50972e4"
        },
        {
          __Buffer__:
            "ecabc098a4956e30ac97ac6faf4adc408b7db217976cafcfb61194dc937e0299"
        },
        null
      ],
      argsAfter: [
        {
          __Buffer__:
            "02a2acb97f34863f398de47381e423cc032f2970bab355fcab15f4988fe50972e4"
        },
        {
          __Buffer__:
            "ecabc098a4956e30ac97ac6faf4adc408b7db217976cafcfb61194dc937e0299"
        },
        null
      ],
      err: "Expected options to be an Object"
    },
    {
      args: [
        {
          __Buffer__:
            "02a2acb97f34863f398de47381e423cc032f2970bab355fcab15f4988fe50972e4"
        },
        {
          __Buffer__:
            "ecabc098a4956e30ac97ac6faf4adc408b7db217976cafcfb61194dc937e0299"
        },
        42
      ],
      argsAfter: [
        {
          __Buffer__:
            "02a2acb97f34863f398de47381e423cc032f2970bab355fcab15f4988fe50972e4"
        },
        {
          __Buffer__:
            "ecabc098a4956e30ac97ac6faf4adc408b7db217976cafcfb61194dc937e0299"
        },
        42
      ],
      err: "Expected options to be an Object"
    },
    {
      args: [
        {
          __Buffer__:
            "02a2acb97f34863f398de47381e423cc032f2970bab355fcab15f4988fe50972e4"
        },
        {
          __Buffer__:
            "ecabc098a4956e30ac97ac6faf4adc408b7db217976cafcfb61194dc937e0299"
        },
        { data: null }
      ],
      argsAfter: [
        {
          __Buffer__:
            "02a2acb97f34863f398de47381e423cc032f2970bab355fcab15f4988fe50972e4"
        },
        {
          __Buffer__:
            "ecabc098a4956e30ac97ac6faf4adc408b7db217976cafcfb61194dc937e0299"
        },
        { data: null }
      ],
      err: "Expected options.data to be an Uint8Array"
    },
    {
      args: [
        {
          __Buffer__:
            "02a2acb97f34863f398de47381e423cc032f2970bab355fcab15f4988fe50972e4"
        },
        {
          __Buffer__:
            "ecabc098a4956e30ac97ac6faf4adc408b7db217976cafcfb61194dc937e0299"
        },
        { hashfn: null }
      ],
      argsAfter: [
        {
          __Buffer__:
            "02a2acb97f34863f398de47381e423cc032f2970bab355fcab15f4988fe50972e4"
        },
        {
          __Buffer__:
            "ecabc098a4956e30ac97ac6faf4adc408b7db217976cafcfb61194dc937e0299"
        },
        { hashfn: null }
      ],
      err: "Expected options.hashfn to be a Function"
    },
    {
      args: [
        {
          __Buffer__:
            "039fb399291f00d8671d861bbc458d0ce60dc8f7b2c7a16d669c265ce8d2d6c0fc"
        },
        {
          __Buffer__:
            "3e6b6559a96dc2909a036223d9d185fee6c49faf468fc33e26d410df7725de85"
        },
        {},
        null
      ],
      argsAfter: [
        {
          __Buffer__:
            "039fb399291f00d8671d861bbc458d0ce60dc8f7b2c7a16d669c265ce8d2d6c0fc"
        },
        {
          __Buffer__:
            "3e6b6559a96dc2909a036223d9d185fee6c49faf468fc33e26d410df7725de85"
        },
        {},
        null
      ],
      err: "Expected output to be an Uint8Array"
    },
    {
      args: [
        {
          __Buffer__:
            "039fb399291f00d8671d861bbc458d0ce60dc8f7b2c7a16d669c265ce8d2d6c0fc"
        },
        {
          __Buffer__:
            "3e6b6559a96dc2909a036223d9d185fee6c49faf468fc33e26d410df7725de85"
        },
        {},
        {
          __Bytes__:
            "000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "039fb399291f00d8671d861bbc458d0ce60dc8f7b2c7a16d669c265ce8d2d6c0fc"
        },
        {
          __Buffer__:
            "3e6b6559a96dc2909a036223d9d185fee6c49faf468fc33e26d410df7725de85"
        },
        {},
        {
          __Bytes__:
            "000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
        }
      ],
      err: "Expected output to be an Uint8Array with length 32"
    },
    {
      args: [
        {
          __Buffer__:
            "02601dde92f4bbeac34692a042719439573b9a411f96717274819fcff417ad4d75"
        },
        {
          __Buffer__:
            "4da23f448c132e31b7343eb3a5840799c533bffc806a8593e82cd2c64bfe5aec"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "02601dde92f4bbeac34692a042719439573b9a411f96717274819fcff417ad4d75"
        },
        {
          __Buffer__:
            "4da23f448c132e31b7343eb3a5840799c533bffc806a8593e82cd2c64bfe5aec"
        }
      ],
      res: {
        __Bytes__:
          "950d2d36b0e2226822370d54990aba72a2a09831a14426e218262a5d8d741338"
      }
    },
    {
      args: [
        {
          __Buffer__:
            "032321eebb4cfd3b1e8006345b51a83b9885a9bd4194119f3730ffd73e0c589faf"
        },
        {
          __Buffer__:
            "9ff0664c75c5be1f47a55acc0353a99e71eff4c2abce116de0489533b510e150"
        }
      ],
      argsAfter: [
        {
          __Buffer__:
            "032321eebb4cfd3b1e8006345b51a83b9885a9bd4194119f3730ffd73e0c589faf"
        },
        {
          __Buffer__:
            "9ff0664c75c5be1f47a55acc0353a99e71eff4c2abce116de0489533b510e150"
        }
      ],
      res: {
        __Bytes__:
          "950d2d36b0e2226822370d54990aba72a2a09831a14426e218262a5d8d741338"
      }
    }
  ]
};
