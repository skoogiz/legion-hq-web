import React from "react";
import {
  Menu,
  MenuItem,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import {Info as InfoIcon, Warning as WarningIcon} from "@mui/icons-material";
import {makeStyles} from "@mui/styles";
import legionModes from "@legion-hq/constants/legionModes";
import battleForcesDict from "@legion-hq/constants/battleForcesDict";
import {ModeButton} from "./ModeButton";
import {TitleField} from "./TitleField";
import {KillPointsField} from "./KillPointsField";
import {FactionButton} from "./FactionButton";
import {useListBuilder} from "@legion-hq/hooks/list/useList";
import {useCurrentList} from "@legion-hq/hooks/list/useCurrentList";

const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  battleForceContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
  },
  columnContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {marginRight: 6},
  valError: {
    display: "flex",
    alignItems: "start",
    justifyContent: "start",
  },
});

export function ListHeader() {
  const {
    handleSetBattleForce,
    currentKillPoints,
    isKillPointMode,
    handleChangeTitle,
    handleChangeMode,
    validationIssues,
  } = useListBuilder();
  const {faction, units, battleForce, mode, title, pointTotal} = useCurrentList();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isBattleForceDialogOpen, setIsBattleForceDialogOpen] = React.useState(false);
  const [isValidationDialogOpen, setValidationDialogOpen] = React.useState(false);
  const handleFactionMenuOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleFactionMenuClose = () => setAnchorEl(null);
  const handleOpenBFDialog = () => setIsBattleForceDialogOpen(true);
  const handleCloseBFDialog = () => setIsBattleForceDialogOpen(false);
  const numActivations = units.reduce((num, unit) => {
    num += unit.count;
    return num;
  }, 0);

  const validBattleForces = Object.values(battleForcesDict).filter(
    (bf) => bf.faction === faction,
  );

  var minValidationError = validationIssues.reduce((highest, e) => {
    return e.level > highest ? e.level : highest;
  }, 0);

  return (
    <div id="list-header" className={classes.columnContainer}>
      <div className={classes.container}>
        <Menu
          keepMounted
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleFactionMenuClose}
        >
          {faction !== "fringe" && (
            <MenuItem
              key="none"
              selected={!battleForce || battleForce === ""}
              onClick={() => {
                handleSetBattleForce("");
                handleFactionMenuClose();
              }}
            >
              No Battle Force
            </MenuItem>
          )}
          {validBattleForces.map((battleForce) => {
            return (
              <MenuItem
                key={battleForce.name}
                selected={battleForce === battleForce.name}
                onClick={() => {
                  handleSetBattleForce(battleForce.name);
                  handleFactionMenuClose();
                }}
              >
                {battleForce.name}
              </MenuItem>
            );
          })}
        </Menu>
        <div className={classes.item}>
          <FactionButton faction={faction} onClick={handleFactionMenuOpen} />
        </div>
        <div className={classes.item}>
          <TitleField
            activations={numActivations}
            title={title}
            handleChange={(e) => {
              e.persist();
              handleChangeTitle(e.target.value);
            }}
          />
        </div>
        <div className={classes.item}>
          <ModeButton
            currentMode={mode}
            points={pointTotal}
            maxPoints={legionModes[mode].maxPoints}
            handleChangeMode={handleChangeMode}
          />
        </div>
        {validationIssues.length > 0 && (
          <div className={classes.battleForceContainer}>
            <IconButton onClick={() => setValidationDialogOpen(true)}>
              <WarningIcon style={{color: minValidationError < 2 ? "yellow" : "red"}} />
            </IconButton>

            <Dialog
              open={isValidationDialogOpen}
              onClose={() => setValidationDialogOpen(false)}
            >
              <DialogTitle>List Errors</DialogTitle>
              <DialogContent>
                <div className={classes.valError}>
                  <WarningIcon className={classes.item} style={{color: "yellow"}} />
                  <DialogContentText>
                    Work in progress... double-check your army rules and unit cards!
                  </DialogContentText>
                </div>
                {validationIssues.map((el, i) => (
                  <div key={i} className={classes.valError}>
                    <WarningIcon
                      className={classes.item}
                      style={{color: el.level === 1 ? "yellow" : "red"}}
                    />
                    <DialogContentText>{el.text}</DialogContentText>
                  </div>
                ))}
                <br />
                <DialogContentText>
                  All Star Wars: Legion documents are located on the Atomic Mass Games{" "}
                  <a
                    style={{textDecoration: "none"}}
                    href="https://atomicmassgames.com/star-wars-legion-documents"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    website
                  </a>
                  .
                </DialogContentText>
              </DialogContent>
            </Dialog>
          </div>
        )}
        {isKillPointMode && (
          <div className={classes.item}>
            <KillPointsField killPoints={currentKillPoints} />
          </div>
        )}
      </div>
      {battleForce && (
        <div className={classes.battleForceContainer}>
          <Button
            endIcon={<InfoIcon />}
            variant="outlined"
            size="small"
            onClick={handleOpenBFDialog}
          >
            {battleForce}
          </Button>
          <Dialog open={isBattleForceDialogOpen} onClose={handleCloseBFDialog}>
            <DialogTitle>{battleForce} List Requirements</DialogTitle>
            <DialogContent>
              <DialogContentText>
                The list building rules for the {battleForce} battleforce is{" "}
                <a
                  style={{textDecoration: "none"}}
                  href={battleForcesDict[battleForce].ruleUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  here
                </a>
                .
              </DialogContentText>
              <br />
              <DialogContentText>
                All Star Wars: Legion documents are located on the Atomic Mass Games{" "}
                <a
                  style={{textDecoration: "none"}}
                  href="https://atomicmassgames.com/star-wars-legion-documents"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  website
                </a>
                .
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
}
