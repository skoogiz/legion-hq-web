import {styled} from "@mui/material";
import {GppBad as GppBadIcon, GppGood as GppGoodIcon} from "@mui/icons-material";
import {useList} from "@legion-hq/hooks/list/useList";

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
  const {/*currentList, */ validationIssues} = useList();
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

  return (
    <IconContainer>
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
  );
}
