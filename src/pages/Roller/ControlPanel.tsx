import React from "react";
import {Typography, Button, Slider} from "@mui/material";
import symbols from "@legion-hq/constants/symbols";
import {AttackDiceType, DefenceDiceType} from "@legion-hq/types";

type Props = {
  numRedAttackDice: number;
  numBlackAttackDice: number;
  numWhiteAttackDice: number;
  handleSetDice: (
    type: "attack" | "defense",
    color: AttackDiceType | DefenceDiceType,
    num: number,
  ) => void;
  handleRollDice: () => void;
};

function valuetext(value: number) {
  return `${value} dice`;
}

export function ControlPanel({
  numRedAttackDice,
  numBlackAttackDice,
  numWhiteAttackDice,
  handleSetDice,
  handleRollDice,
}: Props) {
  const {attack} = symbols;
  const {red, black, white} = attack;
  const [isDisabled, setIsDisabled] = React.useState(false);
  return (
    <div style={{padding: 16, width: "calc(100% + 100px)"}}>
      <div
        style={{
          display: "flex",
          flexFlow: "column nowrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography>Attack Dice</Typography>
        <div style={{display: "flex", width: "100%", marginBottom: 4}}>
          <img alt="red attack die" src={red} style={{height: 28, marginRight: 12}} />
          <Slider
            marks
            step={1}
            min={0}
            max={15}
            defaultValue={0}
            valueLabelDisplay="auto"
            getAriaValueText={() => valuetext(numRedAttackDice)}
            onChange={(e, value) => {
              e.preventDefault();
              handleSetDice("attack", "red", value as number);
            }}
          />
        </div>
        <div style={{display: "flex", width: "100%", marginBottom: 4}}>
          <img alt="black attack die" src={black} style={{height: 28, marginRight: 12}} />
          <Slider
            marks
            step={1}
            min={0}
            max={15}
            defaultValue={0}
            valueLabelDisplay="auto"
            getAriaValueText={() => valuetext(numBlackAttackDice)}
            onChange={(e, value) => {
              e.preventDefault();
              handleSetDice("attack", "black", value as number);
            }}
          />
        </div>
        <div style={{display: "flex", width: "100%", marginBottom: 4}}>
          <img alt="white attack die" src={white} style={{height: 29, marginRight: 12}} />
          <Slider
            marks
            step={1}
            min={0}
            max={15}
            defaultValue={0}
            valueLabelDisplay="auto"
            getAriaValueText={() => valuetext(numWhiteAttackDice)}
            onChange={(e, value) => {
              e.preventDefault();
              handleSetDice("attack", "white", value as number);
            }}
          />
        </div>
        <Button
          variant="contained"
          disabled={isDisabled}
          style={{marginTop: 8}}
          onClick={() => {
            setIsDisabled(true);
            handleRollDice();
            setTimeout(() => setIsDisabled(false), 500);
          }}
        >
          Roll Dice!
        </Button>
      </div>
    </div>
  );
}
