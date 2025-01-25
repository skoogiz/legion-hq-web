const fs = require("fs");

// // Read users.json file
// fs.readFile("./src/data/2.5.3/cards.json", function (err, data) {
//   // Check for errors
//   if (err) throw err;

//   // Converting to JSON
//   const users = JSON.parse(data);
//   console.log(data); // Print users
// });

const cards = require("./src/data/2.5.3/cards.json");

const cardTypes = new Set();

Object.values(cards).forEach((card) => {
  cardTypes.add(`${card.cardType}`.toLocaleLowerCase());
});

const types = [...cardTypes].reduce(
  (acc, cardType) => ({
    ...acc,
    [cardType.toUpperCase()]: cardType,
  }),
  {},
);

console.log(types);

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
