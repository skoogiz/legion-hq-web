import React from "react";
import {Collapse, Typography, Divider, IconButton} from "@mui/material";
import {ExpandMore as ExpandMoreIcon} from "@mui/icons-material";
import {LegionCard} from "@legion-hq/components";

const styles: Record<string, React.CSSProperties> = {
  expandOpen: {transform: "rotate(180deg)"},
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
  validIds?: string[];
  invalidIds?: string[];
  equippedIds?: string[];
  handleClick: (id: string) => void;
  handleCardZoom: (id: string) => void;
};
/**
 * @deprecated
 * @param param0
 * @returns
 */
export function MultiSelectorContent({
  validIds = [],
  invalidIds = [],
  equippedIds = [],
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
  }
  return (
    <div style={styles.columnContainer}>
      <div style={{...styles.rowContainerWrap, alignItems: "center"}}>
        <Typography style={{marginRight: 8}}>Eligible Commands</Typography>
        <Divider style={styles.divider} />
      </div>
      <div style={styles.rowContainerWrap}>
        {validIds.map((id) => (
          <LegionCard
            key={id}
            id={id}
            isSelected={equippedIds.includes(id)}
            handleClick={() => handleClick(id)}
            handleCardZoom={() => handleCardZoom(id)}
          />
        ))}
      </div>
      {invalidIds.length > 0 && (
        <div style={styles.rowContainerNoWrap}>
          <Typography style={{marginRight: 8}}>Ineligible Commands</Typography>
          <Divider style={styles.divider} />
          <IconButton
            size="small"
            sx={(theme) => ({
              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
              // marginLeft: "auto",
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
