const fs = require("fs");

// // Read users.json file
// fs.readFile("./src/data/2.5.3/cards.json", function (err, data) {
//   // Check for errors
//   if (err) throw err;

//   // Converting to JSON
//   const users = JSON.parse(data);
//   console.log(data); // Print users
// });

const cards = require("../src/data/2.5.3/cards.json");
const keywords = require("../src/data/2.5.3/keywords.json");

const usedKeywords = new Set();
const undiscripedKeywords = new Set();
const unusedKeywords = new Set();

Object.values(cards).forEach((card) => {
  if (card.keywords) {
    card.keywords.forEach((keyword) => {
      usedKeywords.add(keyword);
    });
  }
});

// const keywordKeys = Object.keys(keywords).map((key) => key.toLowerCase());

usedKeywords.forEach((keyword) => {
  if (!keywords[keyword]) {
    undiscripedKeywords.add(keyword);
  }
});

Object.keys(keywords).forEach((keyword) => {
  if (!usedKeywords.has(keyword)) {
    unusedKeywords.add(keyword);
  }
});

// usedKeywords.forEach((keyword) => {
//   if (!keywordKeys.includes(keyword.toLowerCase())) {
//     undiscripedKeywords.add(keyword);
//   }
// });

// console.log("Undescribed keywords: ", [...undiscripedKeywords].length);

// const json = Object.keys(map).reduce(
//   (acc, key) => ({
//     ...acc,
//     [key]: [...map[key]],
//   }),
//   {},
// );

fs.writeFile(
  "missing-keywords.json",
  JSON.stringify({
    described: [...Object.keys(keywords)],
    used: [...usedKeywords],
    unused: [...unusedKeywords],
    missingDescription: [...undiscripedKeywords],
  }),
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

// let cardGroups = {};

// Object.values(cards).forEach((card) => {
//   if (!cardGroups[card.cardType]) {
//     cardGroups[card.cardType] = [];
//   }
//   cardGroups[card.cardType].push(card);
// });

// console.log(Object.keys(cardGroups));

// STEP 3: Writing to a file
// Object.keys(cardGroups).forEach((key) => {
//   fs.writeFile(
//     `${key}.json`,
//     JSON.stringify(cardGroups[key]),
//     {
//       encoding: "utf8",
//       flag: "w",
//       mode: 0o666,
//     },
//     (err) => {
//       // Checking for errors
//       if (err) throw err;

//       // Success
//       console.log(`Done writing file ${key}.json`);
//     },
//   );
// });
