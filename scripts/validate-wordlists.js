const fs = require("fs");
const https = require("https");
const assert = require("assert");

const WORDLIST_NAMES = {
  czech: "czech",
  english: "english",
  french: "french",
  italian: "italian",
  japanese: "japanese",
  korean: "korean",
  "simplified-chinese": "chinese_simplified",
  spanish: "spanish",
  "traditional-chinese": "chinese_traditional"
};

const download = name =>
  new Promise((resolve, reject) => {
    {
      name = WORDLIST_NAMES[name];
      const url = `https://raw.githubusercontent.com/bitcoin/bips/master/bip-0039/${name}.txt`;
      const req = https.get(url, { encoding: "utf8" }, res => {
        const chunks = [];
        res.on("data", chunk => chunks.push(chunk));
        res.on("end", () => {
          resolve(
            Buffer.concat(chunks)
              .toString("utf8")
              .trim()
              .split("\n")
          );
        });
      });
      req.on("error", reject);
      req.end();
    }
  });

const files = fs
  .readdirSync(__dirname + "/../bip39/wordlists")
  .filter(f => f.endsWith(".js"));

(async () => {
  try {
    for (const file of files) {
      const actual = require(`../bip39/wordlists/${file}`).wordlist;
      let expected = await download(file.slice(0, -3));
      assert.deepStrictEqual(actual, expected);
      console.log(`CHECKED: ${file}`);
    }
  } catch (e) {
    console.log("ERROR", e);
    process.exit(1);
  }
})();
