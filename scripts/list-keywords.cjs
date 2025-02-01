const fs = require("fs");

// const keywords = require("../src/data/2.6.0/keywords-tta.json");

// const keywordRecord = keywords.reduce(
//   (
//     acc,
//     {
//       name,
//       description,
//       description_short,
//       has_magnitude,
//       is_action,
//       weapon,
//       upgrade_and_command,
//     },
//   ) => {
//     let type = "unit";
//     if (weapon) type = "weapon";
//     if (upgrade_and_command) type = "upgrade_and_command";
//     return {
//       ...acc,
//       [name]: {
//         name,
//         description,
//         summary: description_short ?? undefined,
//         hasQuantifier: has_magnitude ?? false,
//         isAction: is_action ?? false,
//         type,
//       },
//     };
//   },
//   {},
// );

const keywords = require("../src/data/2.6.0/keywords.json");

const keys = Object.keys(keywords);

const keywordRecord = Object.values(keywords).reduce((acc, keyword) => {
  let key = keyword.name;
  if (key.endsWith(" X") && !keys.includes(key.substring(0, key.length - 2))) {
    key = keyword.name.substring(0, keyword.name.length - 2);
  }
  return {
    ...acc,
    [key]: {
      ...keyword,
      name: key,
      rulesName: key !== keyword.name ? keyword.name : undefined,
    },
  };
}, {});

// Object.values(cards).forEach((card) => {
//   if (card.keywords) {
//     card.keywords.forEach((keyword) => {
//       usedKeywords.add(keyword);
//     });
//   }
// });

// const keywordKeys = Object.keys(keywords).map((key) => key.toLowerCase());

// usedKeywords.forEach((keyword) => {
//   if (!keywords[keyword]) {
//     undiscripedKeywords.add(keyword);
//   }
// });

// Object.keys(keywords).forEach((keyword) => {
//   if (!usedKeywords.has(keyword)) {
//     unusedKeywords.add(keyword);
//   }
// });

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
  "tta-keywords.json",
  JSON.stringify(keywordRecord),
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
