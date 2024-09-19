import React from "react";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Box,
  Container,
  styled,
  AppBar,
  Toolbar,
} from "@mui/material";
import {Warning as WarningIcon} from "@mui/icons-material";
import {ModeButton} from "./ModeButton";
import {KillPointsField} from "./KillPointsField";
import {FactionButton} from "./FactionButton";
import {useListBuilder} from "@legion-hq/hooks/list/useList";
import {useCurrentList} from "@legion-hq/hooks/list/useCurrentList";
import {BattleForceNotice} from "./BattleForceNotice";
import {RankSelector} from "../RankSelector";
import {ListMenu} from "../ListMenu";

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

const ObserverListener = styled("div")({
  height: 1,
  marginTop: -1,
});

type Props = {
  elevation?: number;
};

export function ListToolbar({elevation = 3}: Props) {
  const {toolbar} = useListBuilder();
  // const theme = useTheme();

  const containerRef = React.useRef<HTMLDivElement>(null);

  // const [isVisible, setIsVisible] = React.useState(false);

  const callbackSetVisible = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    console.log("ENTRY", entry);
    if (toolbar.isSticky !== entry.isIntersecting)
      toolbar.setIsSticky(entry.isIntersecting);
  };

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  };

  React.useEffect(() => {
    const observer = new IntersectionObserver(callbackSetVisible, options);

    const currentRef = containerRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [containerRef, options]);

  const [isValidationDialogOpen, setValidationDialogOpen] = React.useState(false);

  const {
    handleSetBattleForce,
    currentKillPoints,
    isKillPointMode,
    handleChangeMode,
    validationIssues,
  } = useListBuilder();
  const {faction, units, battleForce, mode} = useCurrentList();

  const numActivations = units.reduce((num, unit) => {
    num += unit.count;
    return num;
  }, 0);

  const minValidationError = validationIssues.reduce((highest, e) => {
    return e.level > highest ? e.level : highest;
  }, 0);

  console.log("VISIBLE", toolbar.isSticky);

  return (
    <>
      <ObserverListener ref={containerRef} />
      <AppBar
        component="div"
        position="sticky"
        elevation={elevation}
        sx={(theme) => ({
          backgroundColor: theme.palette.secondary.main,
        })}
      >
        <Toolbar>
          <Container maxWidth="xl" disableGutters>
            <Box display="flex" alignItems="center" columnGap={2}>
              <FactionButton
                currentFaction={faction}
                currentBattleForce={battleForce}
                onClick={handleSetBattleForce}
              />
              <ModeButton currentMode={mode} handleChangeMode={handleChangeMode} />
              {validationIssues.length > 0 && (
                <div style={styles.battleForceContainer}>
                  <IconButton onClick={() => setValidationDialogOpen(true)}>
                    <WarningIcon
                      style={{color: minValidationError < 2 ? "yellow" : "red"}}
                    />
                  </IconButton>

                  <Dialog
                    open={isValidationDialogOpen}
                    onClose={() => setValidationDialogOpen(false)}
                  >
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
                        All Star Wars: Legion documents are located on the Atomic Mass
                        Games{" "}
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
                <div style={styles.item}>
                  <KillPointsField killPoints={currentKillPoints} />
                </div>
              )}
              {battleForce && <BattleForceNotice battleForce={battleForce} />}
              {/* </div> */}
              {/* </Box> */}
              <div
                style={{
                  display: "flex",
                  flexGrow: 1,
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <div>{`${numActivations} ${numActivations === 1 ? "activation" : "activations"}`}</div>
                <RankSelector />
              </div>
              {/* </Box> */}
              <ListMenu />
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
    </>
  );
}
