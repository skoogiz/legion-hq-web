const fs = require("fs");

const process = require("process");

const cards = require("../src/data/2.5.3/cards.json");

const helpers = require("./convert-upgrade-cards.cjs");

const mappers = require("./convert-mappers.cjs");

const {isEmpty, before, after, constant, add} = require("lodash");

const cardTypes = new Set();

process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});

const typesIndex = process.argv.indexOf("--types");
if (
  typesIndex > 0 &&
  process.argv.length > typesIndex &&
  process.argv[typesIndex + 1] &&
  !process.argv[typesIndex + 1]?.startsWith("--")
) {
  process.argv[typesIndex + 1].split(",").forEach((type) => cardTypes.add(type));
}

const isLegacyFile = process.argv.indexOf("--legacy") > 0;

console.log({cardTypes: cardTypes.size > 0 ? cardTypes : "all", isLegacyFile});

const typeMap = {
  flaw: mappers.convertFlaws,
  upgrade: mappers.convertUpgrades,
  battle: mappers.convertBattles,
  command: mappers.convertCommands,
  unit: mappers.convertUnits,
  counterpart: mappers.convertCounterparts,
};

let data = (cardTypes.size > 0 ? [...cardTypes] : Object.keys(typeMap)).reduce(
  (acc, key) =>
    typeMap[key]
      ? {
          ...acc,
          [key]: typeMap[key](cards),
        }
      : acc,
  {},
);

const directoryPath = "./.tmp";

// Check if the directory exists
if (!fs.existsSync(directoryPath)) {
  // If it doesn't exist, create the directory
  fs.mkdirSync(directoryPath);
  console.log(`Directory '${directoryPath}' created.`);
} else {
  console.log(`Directory '${directoryPath}' already exists.`);
}

if (typesIndex > 0) {
  Object.keys(data).forEach((key) => {
    const {file, fileData} = isLegacyFile
      ? {
          file: `.tmp/legacy-${key}.json`,
          fileData: data[key].reduce(
            (add, card) => ({
              ...add,
              [card.identifiers.legionhqId]: card,
            }),
            {},
          ),
        }
      : {file: `.tmp/${key}.json`, fileData: data[key]};

    fs.writeFile(
      file,
      JSON.stringify(fileData),
      {
        encoding: "utf8",
        flag: "w",
        mode: 0o666,
      },
      (err) => {
        // Checking for errors
        if (err) throw err;

        // Success
        console.log(`Done writing file!`);
      },
    );
  });
} else {
  const {file, fileData} = isLegacyFile
    ? {
        file: `.tmp/legacy-all.json`,
        fileData: Object.values(data)
          .reduce((acc, list) => [...acc, ...list], [])
          .reduce(
            (add, card) => ({
              ...add,
              [card.identifiers.legionhqId]: card,
            }),
            {},
          ),
      }
    : {file: `.tmp/all.json`, fileData: data};

  fs.writeFile(
    file,
    JSON.stringify(fileData),
    {
      encoding: "utf8",
      flag: "w",
      mode: 0o666,
    },
    (err) => {
      // Checking for errors
      if (err) throw err;

      // Success
      console.log(`Done writing file!`);
    },
  );
}
