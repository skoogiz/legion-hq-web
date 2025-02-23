const fs = require("fs");

const cards = require("../src/data/2.5.3/cards.json");

const helpers = require("./convert-helpers.cjs");

const cardList = Object.values(cards).filter(helpers.noCustomCards);

const avatars = [];
const images = [];

const cdn = "https://d2j4aq9mja0i3a.cloudfront.net";

function getImageUrl({cardType, imageName}) {
  return {
    avatarUrl: `${cdn}/${cardType}Icons/${imageName}`,
    imageUrl: `${cdn}/${cardType}Cards/${imageName}`,
  };
}

const units = cardList.forEach(({cardType, imageName}) => {
  if (imageName) {
    const {avatarUrl, imageUrl} = getImageUrl({cardType, imageName});
    avatars.push(avatarUrl);
    images.push(imageUrl);
  }
});

console.log("Card image stats:", {
  cards: cardList.length,
  avatars: avatars.length,
  images: images.length,
});

fs.writeFile(
  "image-assets.txt",
  [...avatars, ...images].join("\n"),
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
