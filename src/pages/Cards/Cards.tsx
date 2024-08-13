import React from "react";
import {Alert} from "@mui/material";
import {CardModal} from "@legion-hq/common/CardModal";
import cards from "@legion-hq/constants/cards";
import BasicCardChips from "./BasicCardChips";
import {republicUnitCards} from "@legion-hq/components/SpriteCard/SpriteCard.data";
import {SpriteCards} from "@legion-hq/components/SpriteCard";

export function Cards() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalContent, setModalContent] = React.useState<string | undefined>();
  const handleCardZoom = (cardId: string) => {
    setModalContent(cardId);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContent(undefined);
  };
  const unitCards: Record<string, string[]> = {
    trooper: [],
    counterpart: [],
    vehicle: [],
  };
  const upgradeCards: Record<string, string[]> = {
    "heavy weapon": [],
    personnel: [],
    force: [],
    command: [],
    hardpoint: [],
    gear: [],
    grenades: [],
    comms: [],
    pilots: [],
    training: [],
    generator: [],
    armament: [],
    crew: [],
    ordnance: [],
  };
  const commandCards: Record<string, string[]> = {"1": [], "2": [], "3": [], "4": []};
  const battleCards: Record<string, string[]> = {
    objective: [],
    deployment: [],
    condition: [],
  };
  Object.keys(cards)
    .sort((a, b) => {
      const cardA = cards[a];
      const cardB = cards[b];
      const nameA = cardA.displayName ? cardA.displayName : cardA.cardName;
      const nameB = cardB.displayName ? cardB.displayName : cardB.cardName;
      if (nameA > nameB) return 1;
      if (nameA < nameB) return -1;
      return 0;
    })
    .forEach((id: string) => {
      const card = cards[id];
      if (card.cardType === "unit") {
        if (card.cardSubtype.includes("trooper")) {
          unitCards.trooper.push(id);
        } else if (card.cardSubtype.includes("vehicle")) {
          unitCards.vehicle.push(id);
        }
      } else if (card.cardType === "counterpart") {
        unitCards.counterpart.push(id);
      } else if (card.cardType === "upgrade") {
        if (card.cardSubtype in upgradeCards) {
          upgradeCards[card.cardSubtype].push(id);
        }
      } else if (card.cardType === "command") {
        if (card.cardSubtype in commandCards) {
          commandCards[card.cardSubtype].push(id);
        }
      } else if (card.cardType === "battle") {
        if (card.cardSubtype in battleCards) {
          battleCards[card.cardSubtype].push(id);
        }
      }
    });
  return (
    <div style={{padding: 8, display: "flex", flexFlow: "column nowrap"}}>
      <Alert variant="filled" severity="info" style={{marginBottom: 8}}>
        This page is still under construction!
      </Alert>
      <CardModal id={modalContent} isOpen={isModalOpen} handleClose={handleCloseModal} />
      <BasicCardChips
        title="Unit Cards"
        cardDict={unitCards}
        handleCardZoom={handleCardZoom}
      />
      <BasicCardChips
        title="Upgrade Cards"
        cardDict={upgradeCards}
        handleCardZoom={handleCardZoom}
      />
      <BasicCardChips
        title="Command Cards"
        cardDict={commandCards}
        handleCardZoom={handleCardZoom}
      />
      <BasicCardChips
        title="Battle Cards"
        cardDict={battleCards}
        handleCardZoom={handleCardZoom}
      />

      <SpriteCards />
    </div>
  );
}
