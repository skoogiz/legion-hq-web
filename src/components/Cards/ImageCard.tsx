import React from "react";
import {
  Grow,
  IconButton,
  Collapse,
  Button,
  Card,
  CardMedia,
  CardActions,
  CardActionArea,
} from "@mui/material";
import {ExpandMore as ExpandMoreIcon} from "@mui/icons-material";
import {CardChip, HelpChip, KeywordChips} from "@legion-hq/components";
import urls from "@legion-hq/constants/urls";
import {LegionCard} from "@legion-hq/types";
import {CSSProperties} from "@mui/styles";

const styles: Record<string, CSSProperties> = {
  selected: {border: "1px solid lightblue"},
  card: {marginRight: 4, marginBottom: 4},
  unitCard: {maxWidth: 315},
  commandCard: {maxWidth: 225},
  upgradeCard: {maxWidth: 150},
  unitImage: {width: 315, height: 225},
  upgradeImage: {width: 150, height: 232.5},
  commandImage: {width: 225, height: 315},
  doubleUpgrade: {width: 300},
};

const getStyles = (styleMap: [CSSProperties, boolean][]): CSSProperties => {
  let style = {};

  styleMap.forEach(([css, isTruthy]) => {
    if (isTruthy) style = {...style, ...css};
  });

  return style;
};

type Props = {
  isSelected: boolean;
  card: LegionCard;
  handleClick?: (event: React.SyntheticEvent) => void;
  handleCardZoom: (event: React.SyntheticEvent) => void;
};

export function ImageCard({isSelected, card, handleClick, handleCardZoom}: Props) {
  const chipSize = "small";
  const {cost, cardType, cardName, displayName, keywords, imageName} = card;
  const [isExpanded, setIsExpanded] = React.useState(false);
  const handleExpandClick = () => setIsExpanded(!isExpanded);
  const isDoubleSided = cardType === "upgrade" && keywords.includes("Reconfigure");
  const isSkirmish = card.keywords.includes("Skirmish");

  return (
    <Grow unmountOnExit in={true}>
      <Card
        sx={{
          ...styles.card,
          ...getStyles([
            [styles.selected, isSelected],
            [styles.unitCard, cardType === "unit"],
            [styles.unitCard, cardType === "battle" && !isSkirmish],
            [styles.commandCard, cardType === "battle" && isSkirmish],
            [styles.upgradeCard, cardType === "upgrade" && !isDoubleSided],
            [styles.doubleUpgrade, isDoubleSided],
            [styles.commandCard, cardType === "command"],
          ]),
        }}
      >
        <CardActionArea onClick={handleClick}>
          <CardMedia
            title={displayName ? displayName : cardName}
            image={`${urls.cdn}/${cardType}Cards/${imageName}`}
            sx={getStyles([
              [styles.unitImage, cardType === "unit" || cardType === "counterpart"],
              [styles.unitImage, cardType === "battle" && !isSkirmish],
              [styles.commandImage, cardType === "battle" && isSkirmish],
              [styles.upgradeImage, cardType === "upgrade"],
              [styles.commandImage, cardType === "command"],
              [styles.doubleUpgrade, isDoubleSided],
            ])}
          />
        </CardActionArea>
        <CardActions disableSpacing>
          {(cost || cost === 0) && (
            <CardChip type="points" value={cost} size={chipSize} />
          )}
          {cardName === "Storm Tide Commander" && <HelpChip size={chipSize} />}
          <IconButton
            size="small"
            aria-expanded={isExpanded}
            onClick={handleExpandClick}
            sx={(theme) => ({
              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
              marginLeft: "auto",
              transition: theme.transitions.create("transform", {
                duration: theme.transitions.duration.shortest,
              }),
            })}
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse unmountOnExit timeout="auto" in={isExpanded}>
          {keywords.length > 0 && (
            <CardActions sx={styles.card}>
              <KeywordChips size={chipSize} keywords={keywords} />
            </CardActions>
          )}
          <CardActions>
            <Button size="small" sx={{marginLeft: "auto"}} onClick={handleCardZoom}>
              Show More
            </Button>
          </CardActions>
        </Collapse>
      </Card>
    </Grow>
  );
}
