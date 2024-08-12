/*

    ab: {
      cardType: "unit",
      defense: "white",
      surges: ["crit", "block"],
      speed: 2,
      wounds: 6,
      courage: 2,
      cardSubtype: "trooper",
      cardName: "Leia Organa",
      title: "Fearless and Inventive",
      isUnique: true,
      rank: "commander",
      cost: 75,
      prevCost: 80,
      faction: "rebels",
      imageName: "Leia Organa.jpeg",
      keywords: ["Take Cover", "Inspire", "Nimble", "Sharpshooter", "Pierce"],
      upgradeBar: ["command", "command", "gear"],
      history: [
        {
          date: "27 October 2021",
          description: "Cost reduced from 90 to 80 points.",
        },
        {
          date: "5 June 2023",
          description: "Cost reduced from 80 to 75 points.",
        },
      ],
      id: "ab",
    },

*/

export interface LegionCard {
  cardName: string;
  cardType: string;
  displayName: string;
  cardSubtype: string;
  imageName: string;
  isUnique?: boolean;
  keywords: string[];
  rank: string;
  cost: number;
  courage: number;
  wounds?: number;
  resilience?: number;
  speed: number;
  defense: "white" | "black" | "red";
  surges: string[];
  upgradeBar: string[];
}
