import * as React from "react";
import {
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  styled,
} from "@mui/material";
import {GppBad as GppBadIcon, GppGood as GppGoodIcon} from "@mui/icons-material";
import {useListBuilder} from "@legion-hq/hooks/list/useList";
import RichTooltip from "./RichTooltip";
import {Warning as WarningIcon} from "@mui/icons-material";

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {marginRight: 6},
  valError: {
    display: "flex",
    alignItems: "start",
    justifyContent: "start",
  },
};

const IconContainer = styled("div")`
  font-size: 20px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    font-size: inherit;
    height: 1em;
    width: 1em;
    opacity: 0.6;
  }
`;

export function ValidationBadge() {
  const {/*currentList, */ validationIssues} = useListBuilder();
  // const [isValidationDialogOpen, setValidationDialogOpen] = React.useState(false);

  // const numActivations = currentList.units.reduce((num, unit) => {
  //   num += unit.count;
  //   return num;
  // }, 0);

  // const validBattleForces = Object.values(battleForcesDict).filter(
  //   (bf) => bf.faction === currentList.faction,
  // );

  // const minValidationError = validationIssues.reduce((highest, e) => {
  //   return e.level > highest ? e.level : highest;
  // }, 0);

  const [open, setOpen] = React.useState(false);

  return (
    <RichTooltip
      content={
        <Stack maxWidth={480}>
          <DialogTitle>List Errors</DialogTitle>
          <DialogContent>
            <div style={styles.valError}>
              <WarningIcon style={{...styles.item, color: "yellow"}} />
              <DialogContentText>
                Work in progress... double-check your army rules and unit cards!
              </DialogContentText>
            </div>
            {validationIssues.map((el, i) => (
              <div key={i} style={styles.valError}>
                <WarningIcon
                  style={{
                    ...styles.item,
                    color: el.level === 1 ? "yellow" : "red",
                  }}
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
        </Stack>
      }
      open={open}
      placement="top"
      arrow
      onClose={() => setOpen(false)}
    >
      <IconContainer onClick={() => setOpen(!open)}>
        {validationIssues.length > 0 ? <GppBadIcon /> : <GppGoodIcon />}
        {/* {validationIssues.length > 0 && (
        <div className={classes.battleForceContainer}>
          <IconButton onClick={() => setValidationDialogOpen(true)}>
            <WarningIcon style={{color: minValidationError < 2 ? "yellow" : "red"}} />
          </IconButton>


          <DialogTitle>List Errors</DialogTitle>
          <DialogContent>
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
          </DialogContent>
        </div>
      )} */}
      </IconContainer>
    </RichTooltip>
  );
}
