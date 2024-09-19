import React from "react";
import {Chip, Menu, MenuItem} from "@mui/material";
import {FactionType} from "@legion-hq/types";
import battleForcesDict from "@legion-hq/constants/battleForcesDict";
import {
  EmpireIcon,
  RebelsIcon,
  RepublicIcon,
  SeparatistsIcon,
  ShadowCollectiveIcon,
} from "@legion-hq/components/icons";
import {factions} from "@legion-hq/constants";
import {colorName} from "@legion-hq/theme/themeUtils";
import {ArrowDropDown} from "@mui/icons-material";

type Props = {
  currentFaction: FactionType;
  currentBattleForce: string;
  onClick: (newBattleForce: string) => void;
};

export const Icon = ({faction}: {faction: FactionType}) => {
  switch (faction) {
    case "rebels":
      return (
        <RebelsIcon
          sx={{
            fontSize: "20px",
          }}
        />
      );
    case "empire":
      return (
        <EmpireIcon
          sx={{
            fontSize: "22px",
          }}
        />
      );
    case "republic":
      return (
        <RepublicIcon
          sx={{
            fontSize: "22px",
          }}
        />
      );
    case "separatists":
      return <SeparatistsIcon />;
    case "fringe":
      return (
        <ShadowCollectiveIcon
          sx={{
            fontSize: "22px",
          }}
        />
      );
    default:
      return undefined;
  }
};

export function FactionButton({currentFaction, currentBattleForce, onClick}: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleFactionMenuOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleFactionMenuClose = () => setAnchorEl(null);

  const validBattleForces = Object.values(battleForcesDict).filter(
    (bf) => bf.faction === currentFaction,
  );

  const {longName} = factions[currentFaction];

  return (
    <>
      <Chip
        clickable
        variant="filled"
        icon={<Icon faction={currentFaction} />}
        label={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>{currentBattleForce || longName}</span>
            <ArrowDropDown />
          </div>
        }
        onClick={handleFactionMenuOpen}
        color={colorName(currentFaction) ?? "accent"}
        size="small"
        sx={{
          fontWeight: 500,
          textTransform: "uppercase",
          borderRadius: "6px",
          svg: {pl: "4px"},
          ".MuiChip-label": {pr: "4px"},
        }}
      />
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleFactionMenuClose}
      >
        {currentFaction !== "fringe" && (
          <MenuItem
            key="none"
            selected={!currentBattleForce || currentBattleForce === ""}
            onClick={() => {
              onClick("");
              handleFactionMenuClose();
            }}
          >
            {longName}
          </MenuItem>
        )}
        {validBattleForces.map((battleForce) => {
          return (
            <MenuItem
              key={battleForce.name}
              selected={currentBattleForce === battleForce.name}
              onClick={() => {
                onClick(battleForce.name);
                handleFactionMenuClose();
              }}
            >
              {battleForce.name}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
}
