import * as React from "react";
import {Box, Container, Paper, styled} from "@mui/material";
import {ControlPanel} from "./ControlPanel";
import AttackDie from "./AttackDie";
import {
  AttackDiceType,
  BLACK_DICE,
  DefenceDiceType,
  RED_DICE,
  WHITE_DICE,
} from "@legion-hq/types";
import {PageColumn, PageTitle} from "@legion-hq/components/PageLayout";

const DiceRow = styled("div")({
  display: "flex",
  flexFlow: "row wrap",
  alignItems: "center",
  justifyContent: "center",
});

const ControlWrapper = styled("div")({
  display: "flex",
  flexFlow: "column nowrap",
  alignItems: "center",
  justifyContent: "center",
  flexGrow: 1,
});

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

function Stats() {
  const [isRolling, setIsRolling] = React.useState(false);
  const [numRedAttackDice, setNumRedAttackDice] = React.useState(0);
  const [redAttackResults, setRedAttackResults] = React.useState<number[]>([]);
  const [numBlackAttackDice, setNumBlackAttackDice] = React.useState(0);
  const [blackAttackResults, setBlackAttackResults] = React.useState<number[]>([]);
  const [numWhiteAttackDice, setNumWhiteAttackDice] = React.useState(0);
  const [whiteAttackResults, setWhiteAttackResults] = React.useState<number[]>([]);

  const handleSetDice = (
    type: "attack" | "defense",
    color: AttackDiceType | DefenceDiceType,
    num: number,
  ) => {
    if (type === "attack") {
      if (color === RED_DICE) {
        setNumRedAttackDice(num);
        setRedAttackResults(redAttackResults.slice(0, num));
      }
      if (color === BLACK_DICE) {
        setNumBlackAttackDice(num);
        setBlackAttackResults(blackAttackResults.slice(0, num));
      }
      if (color === WHITE_DICE) {
        setNumWhiteAttackDice(num);
        setWhiteAttackResults(whiteAttackResults.slice(0, num));
      }
    } else if (type === "defense") {
      if (color === RED_DICE) {
        // TODO: Defence dice logic
      }
      if (color === WHITE_DICE) {
        // TODO: Defence dice logic
      }
    }
  };

  const handleRollDice = () => {
    setIsRolling(true);
    for (let i = 0; i < numRedAttackDice; i++) {
      if (i < redAttackResults.length) {
        redAttackResults[i] = getRandomInt(16);
      } else redAttackResults.push(getRandomInt(16));
    }
    for (let i = 0; i < numBlackAttackDice; i++) {
      if (i < blackAttackResults.length) {
        blackAttackResults[i] = getRandomInt(16);
      } else blackAttackResults.push(getRandomInt(16));
    }
    for (let i = 0; i < numWhiteAttackDice; i++) {
      if (i < whiteAttackResults.length) {
        whiteAttackResults[i] = getRandomInt(16);
      } else whiteAttackResults.push(getRandomInt(16));
    }
    setTimeout(() => setIsRolling(false), 500);
  };

  return (
    <Container maxWidth="md">
      <PageColumn>
        <PageTitle>Dice Roller</PageTitle>
        <Paper elevation={3} square={false} sx={{alignSelf: "stretch"}}>
          <Box
            display="flex"
            alignSelf="stretch"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            p={2}
          >
            <ControlWrapper>
              <ControlPanel
                numRedAttackDice={numRedAttackDice}
                numBlackAttackDice={numBlackAttackDice}
                numWhiteAttackDice={numWhiteAttackDice}
                handleSetDice={handleSetDice}
                handleRollDice={handleRollDice}
              />
            </ControlWrapper>
          </Box>
        </Paper>
        <Paper elevation={3} square={false} sx={{alignSelf: "stretch"}}>
          <Box
            display="flex"
            alignSelf="stretch"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="80px"
            px={2}
            pt={1}
            pb={3}
          >
            {[
              {dice: RED_DICE, attackResult: redAttackResults},
              {dice: BLACK_DICE, attackResult: blackAttackResults},
              {dice: WHITE_DICE, attackResult: whiteAttackResults},
            ].map(({dice, attackResult}) => (
              <DiceRow key={dice}>
                {attackResult.map((result, i) => (
                  <AttackDie
                    key={`${dice}_${result}_${i}`}
                    color={dice as AttackDiceType}
                    faceIndex={result}
                    isRolling={isRolling}
                  />
                ))}
              </DiceRow>
            ))}
          </Box>
        </Paper>
      </PageColumn>
    </Container>
  );
}

export default Stats;
