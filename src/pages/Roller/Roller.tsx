import * as React from "react";
import {Typography} from "@mui/material";
import {ControlPanel} from "./ControlPanel";
import AttackDie from "./AttackDie";
import {
  AttackDiceType,
  BLACK_DICE,
  DefenceDiceType,
  RED_DICE,
  WHITE_DICE,
} from "@legion-hq/types";

const styles: Record<string, React.CSSProperties> = {
  row: {
    display: "flex",
    flexFlow: "row wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  column: {
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "center",
    flexGrow: 1,
  },
};

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
    <div style={styles.column}>
      <div style={styles.row}>
        <Typography variant="h5">Dice Roller</Typography>
      </div>
      <div style={{...styles.row, ...styles.column}}>
        <ControlPanel
          numRedAttackDice={numRedAttackDice}
          numBlackAttackDice={numBlackAttackDice}
          numWhiteAttackDice={numWhiteAttackDice}
          handleSetDice={handleSetDice}
          handleRollDice={handleRollDice}
        />
      </div>
      <div style={styles.row}>
        {redAttackResults.map((result, i) => (
          <AttackDie
            key={`red_${result}_${i}`}
            color={RED_DICE}
            faceIndex={result}
            isRolling={isRolling}
          />
        ))}
      </div>
      <div style={styles.row}>
        {blackAttackResults.map((result, i) => (
          <AttackDie
            key={`black_${result}_${i}`}
            color={BLACK_DICE}
            faceIndex={result}
            isRolling={isRolling}
          />
        ))}
      </div>
      <div style={styles.row}>
        {whiteAttackResults.map((result, i) => (
          <AttackDie
            key={`white_${result}_${i}`}
            color={WHITE_DICE}
            faceIndex={result}
            isRolling={isRolling}
          />
        ))}
      </div>
    </div>
  );
}

export default Stats;
