const fs = require("fs");

const pkg = JSON.parse(fs.readFileSync(__dirname + "/../package.json", "utf8"));

const files = fs
  .readdirSync(__dirname + "/../pure")
  .filter(f => f.endsWith(".js"));

for (const file of files) {
  const mapping = pkg.browser["./" + file];
  const expected = "./pure/" + file;

  if (mapping !== expected) {
    console.error(
      `Incorrect or missing mappnig of ${file} in the package.browser`
    );

    console.error(`It should be "${expected}" but is "${mapping}"`);

    process.exit(1);
  }
}
