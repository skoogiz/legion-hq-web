import React from "react";
import {Collapse, Typography, Divider, IconButton} from "@mui/material";
import {ExpandMore as ExpandMoreIcon} from "@mui/icons-material";
import {LegionCard} from "@legion-hq/components";
import {ListActionType} from "@legion-hq/state/list";

const styles: Record<string, React.CSSProperties> = {
  rowContainerWrap: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  rowContainerNoWrap: {
    display: "flex",
    flexWrap: "nowrap",
    alignItems: "center",
    padding: 4,
  },
  columnContainer: {
    display: "flex",
    flexDirection: "column",
  },
  item: {
    marginRight: 4,
    marginBottom: 4,
  },
  divider: {
    flexGrow: 1,
  },
};

function CollapsedContent({
  children,
  isExpanded,
}: {
  children: React.ReactNode;
  isExpanded: boolean;
}) {
  return (
    <Collapse unmountOnExit timeout="auto" in={isExpanded}>
      {children}
    </Collapse>
  );
}

type Props = {
  action: ListActionType;
  validIds?: string[];
  invalidIds?: string[];
  handleClick: (id: string) => void;
  handleCardZoom: (id: string) => void;
};

export function SelectorContent({
  action,
  validIds = [],
  invalidIds = [],
  handleClick,
  handleCardZoom,
}: Props) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const handleExpandClick = () => setIsExpanded(!isExpanded);
  if (validIds.length === 0) {
    return (
      <div style={styles.columnContainer}>
        <Typography>No eligible cards found</Typography>
      </div>
    );
  } else if (!action.includes("UPGRADE")) {
    return (
      <div style={styles.rowContainerWrap}>
        {validIds.map((id) => (
          <LegionCard
            key={id}
            id={id}
            handleClick={() => handleClick(id)}
            handleCardZoom={() => handleCardZoom(id)}
          />
        ))}
      </div>
    );
  }
  return (
    <div style={styles.columnContainer}>
      <div style={{...styles.rowContainerWrap, alignItems: "center"}}>
        <Typography style={{marginRight: 8}}>Equippable upgrades</Typography>
        <Divider style={styles.divider} />
      </div>
      <div style={styles.rowContainerWrap}>
        {validIds.map((id) => (
          <LegionCard
            key={id}
            id={id}
            handleClick={() => handleClick(id)}
            handleCardZoom={() => handleCardZoom(id)}
          />
        ))}
      </div>
      {invalidIds.length > 0 && (
        <div style={styles.rowContainerNoWrap}>
          <Typography style={{marginRight: 8}}>Unequippable upgrades</Typography>
          <Divider style={styles.divider} />
          <IconButton
            size="small"
            sx={(theme) => ({
              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
              marginLeft: 8,
              transition: theme.transitions.create("transform", {
                duration: theme.transitions.duration.shortest,
              }),
            })}
            onClick={handleExpandClick}
          >
            <ExpandMoreIcon />
          </IconButton>
        </div>
      )}
      <CollapsedContent isExpanded={isExpanded}>
        <div style={styles.rowContainerWrap}>
          {invalidIds.map((id) => (
            <LegionCard
              key={id}
              id={id}
              isBasic={true}
              handleCardZoom={() => handleCardZoom(id)}
            />
          ))}
        </div>
      </CollapsedContent>
    </div>
  );
}
