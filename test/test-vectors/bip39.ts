import { assert } from "chai";

export function createTests(
  generateMnemonic: (wordlist: string[], strength?: number) => string,
  mnemonicToEntropy: (mnemonic: string, wordlist: string[]) => Buffer,
  entropyToMnemonic: (entropy: Buffer, wordlist: string[]) => string,
  validateMnemonic: (mnemonic: string, wordlist: string[]) => boolean,
  mnemonicToSeed: (mnemonic: string, passphrase?: string) => Promise<Buffer>,
  mnemonicToSeedSync: (mnemonic: string, passphrase?: string) => Buffer,
  englishWordlist: string[],
  spanishWordlist: string[]
) {
  describe("BIP39", function() {
    describe("Mnemonic generation", function() {
      it("should create a valid menomic", function() {
        const mnemonic = generateMnemonic(englishWordlist, 128);
        assert.isTrue(validateMnemonic(mnemonic, englishWordlist));
      });
    });

    describe("Mnemonic validation", function() {
      it("should accept valid menomics", function() {
        assert.isTrue(
          validateMnemonic(
            "jump police vessel depth mutual idea cable soap trophy dust hold wink",
            englishWordlist
          )
        );

        assert.isTrue(
          validateMnemonic(
            "koala óxido urbe crudo momia idioma boina rostro títere dilema himno víspera",
            spanishWordlist
          )
        );
      });

      it("should reject invalid menomics", function() {
        assert.isFalse(validateMnemonic("asd", englishWordlist));
        assert.isFalse(
          validateMnemonic(
            generateMnemonic(englishWordlist, 128),
            spanishWordlist
          )
        );
      });
    });

    describe("Entropy-mnemonic convertions", function() {
      describe("Should convert from mnemonic to entropy and back", function() {
        it("should work with the English wodlist", function() {
          const mnemonic = generateMnemonic(englishWordlist, 128);
          const entropy = mnemonicToEntropy(mnemonic, englishWordlist);

          assert.equal(entropyToMnemonic(entropy, englishWordlist), mnemonic);
        });

        it("should work with the Spanish wodlist", function() {
          const mnemonic = generateMnemonic(spanishWordlist, 128);
          const entropy = mnemonicToEntropy(mnemonic, spanishWordlist);

          assert.equal(entropyToMnemonic(entropy, spanishWordlist), mnemonic);
        });
      });
    });

    describe("Menonic to seed", function() {
      describe("Without passphrase", function() {
        const MENMONIC =
          "koala óxido urbe crudo momia idioma boina rostro títere dilema himno víspera";

        const SEED = Buffer.from(
          "e9dc495a155c2c5b577847874323853efc11e2379cc25fdcd26f3ad2ecca8b05d2a0e995fb6738dbcf65760e571863e0e8f518b5626b7865ac74f2ab814c050f",
          "hex"
        );

        describe("Sync", function() {
          it("Should recover the right seed", function() {
            const recoveredSeed = mnemonicToSeedSync(MENMONIC);
            assert.isTrue(SEED.equals(recoveredSeed));
          });
        });

        describe("Async", function() {
          it("Should recover the right seed", async function() {
            const recoveredSeed = await mnemonicToSeed(MENMONIC);
            assert.isTrue(SEED.equals(recoveredSeed));
          });
        });
      });

      describe("With passphrase", function() {
        const MENMONIC =
          "koala óxido urbe crudo momia idioma boina rostro títere dilema himno víspera";

        const PASSPHRASE = "passphrase";

        const SEED = Buffer.from(
          "c54939df37bf94ab65973c6c1b8e5eaf855dc4ab200698961c398685714c99f9d9e5c8518769619ba606bdaf5254d4ef34c0789089a2e4f21e357a1aae906f9d",
          "hex"
        );

        describe("Sync", function() {
          it("Should recover the right seed", function() {
            const recoveredSeed = mnemonicToSeedSync(MENMONIC, PASSPHRASE);
            assert.isTrue(SEED.equals(recoveredSeed));
          });
        });

        describe("Async", function() {
          it("Should recover the right seed", async function() {
            const recoveredSeed = await mnemonicToSeed(MENMONIC, PASSPHRASE);
            assert.isTrue(SEED.equals(recoveredSeed));
          });
        });
      });
    });
  });
}
