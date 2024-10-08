import * as React from "react";
import {
  Typography,
  IconButton,
  Collapse,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grow,
  Divider,
} from "@mui/material";
import {Add as AddIcon, ExpandMore as ExpandMoreIcon} from "@mui/icons-material";
import {type ChipSize, CardChip, KeywordChips} from "@legion-hq/components";
import {UpgradeType, type LegionCard} from "@legion-hq/types";
import {CardIcon, IconBadge, UpgradeBar} from "@legion-hq/components";

interface CardProps {
  card: LegionCard;
  chipSize?: ChipSize;
}

interface ClickableCardProps extends CardProps {
  handleClick?: (event: React.SyntheticEvent) => void;
}

function capitalizeFirstLetters(words: string) {
  const strings = words.split(" ").map((string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  });
  return strings.join(" ");
}

function ReverseWrapper({children}: {children: React.ReactNode}) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-end",
      }}
    >
      {children}
    </div>
  );
}

function TextCardHeader({card, handleClick}: ClickableCardProps) {
  if (card.cardType === "unit") {
    return <UnitCardHeader card={card} handleClick={handleClick} />;
  } else if (card.cardType === "upgrade") {
    return <UpgradeCardHeader card={card} handleClick={handleClick} />;
  } else if (card.cardType === "counterpart") {
    return <CounterpartCardHeader card={card} handleClick={handleClick} />;
  } else if (card.cardType === "command") {
    return <CommandCardHeader card={card} handleClick={handleClick} />;
  } else if (card.cardType === "battle") {
    return <BattleCardHeader card={card} handleClick={handleClick} />;
  } else {
    return null;
  }
}

function TextCardContent({card, chipSize}: CardProps) {
  if (card.cardType === "unit") {
    return <UnitCardContent card={card} chipSize={chipSize} />;
  } else if (card.cardType === "upgrade") {
    return <UpgradeCardContent card={card} chipSize={chipSize} />;
  } else if (card.cardType === "counterpart") {
    return <CounterpartCardContent card={card} chipSize={chipSize} />;
  } else if (card.cardType === "command") {
    return <CommandCardContent card={card} chipSize={chipSize} />;
  } else if (card.cardType === "battle") {
    return <BattleCardContent card={card} chipSize={chipSize} />;
  } else {
    return null;
  }
}

function CounterpartCardHeader({card, handleClick}: ClickableCardProps) {
  const {isUnique, displayName, cardName, imageName} = card;
  const avatar = <CardIcon cardName={cardName} cardType="unit" imageName={imageName} />;
  const action = (
    <IconButton size="medium" onClick={handleClick} style={{margin: 8}}>
      <AddIcon />
    </IconButton>
  );
  return (
    <CardHeader
      avatar={avatar}
      title={`${isUnique ? "• " : ""}${displayName ? displayName : cardName}`}
      subheader={capitalizeFirstLetters(card.cardSubtype)}
      action={action}
      style={{padding: 8}}
    />
  );
}

function BattleCardHeader({card, handleClick}: ClickableCardProps) {
  const {cardName, cardType} = card;
  const action = (
    <IconButton size="medium" onClick={handleClick} style={{margin: 8}}>
      <AddIcon />
    </IconButton>
  );
  const isSkirmish = card.keywords?.includes("Skirmish");
  return (
    <CardHeader
      title={cardName}
      subheader={
        capitalizeFirstLetters(cardType) + "Card" + isSkirmish ? "(Skirmish)" : ""
      }
      action={action}
      style={{padding: 8}}
    />
  );
}

function CommandCardHeader({card, handleClick}: ClickableCardProps) {
  const {cardName, cardType, imageName} = card;
  const avatar = (
    <CardIcon cardName={cardName} cardType={cardType} imageName={imageName} />
  );
  const action = (
    <IconButton size="medium" onClick={handleClick} style={{margin: 8}}>
      <AddIcon />
    </IconButton>
  );
  return (
    <CardHeader
      avatar={avatar}
      title={cardName}
      subheader={capitalizeFirstLetters(cardType)}
      action={action}
      style={{padding: 8}}
    />
  );
}

function UpgradeCardHeader({card, handleClick}: ClickableCardProps) {
  const {isUnique, displayName, cardName, cardType, cardSubtype, imageName} = card;
  const avatar = (
    <IconBadge
      upgradeType={cardType === "upgrade" ? (cardSubtype as UpgradeType) : undefined}
      avatar={<CardIcon cardName={cardName} cardType={cardType} imageName={imageName} />}
    />
  );
  const action = (
    <IconButton size="medium" onClick={handleClick} style={{margin: 8}}>
      <AddIcon />
    </IconButton>
  );
  return (
    <CardHeader
      avatar={avatar}
      title={`${isUnique ? "• " : ""}${displayName ? displayName : cardName}`}
      subheader={capitalizeFirstLetters(cardSubtype)}
      action={action}
      style={{padding: 8}}
    />
  );
}

function UnitCardHeader({card, handleClick}: ClickableCardProps) {
  const {rank, isUnique, displayName, cardName, cardSubtype} = card;
  const avatar = (
    <IconBadge
      rank={rank}
      avatar={
        <CardIcon
          cardName={card.cardName}
          cardType={card.cardType}
          imageName={card.imageName}
        />
      }
    />
  );
  const action = (
    <IconButton size="medium" onClick={handleClick} style={{margin: 8}}>
      <AddIcon />
    </IconButton>
  );
  return (
    <CardHeader
      avatar={avatar}
      title={`${isUnique ? "• " : ""}${displayName ? displayName : cardName}`}
      subheader={capitalizeFirstLetters(cardSubtype)}
      action={action}
      style={{padding: 8}}
    />
  );
}

function CounterpartCardContent({card, chipSize}: CardProps) {
  const {cost, wounds} = card;
  return (
    <CardContent style={{padding: 8, textAlign: "right"}}>
      <ReverseWrapper>
        <Typography variant="body2" color="textSecondary">
          Cost
        </Typography>
        <div style={{flexGrow: 1}} />
        <CardChip type="points" value={cost} size={chipSize} />
      </ReverseWrapper>
      <Divider style={{marginBottom: 4}} />
      <ReverseWrapper>
        <Typography variant="body2" color="textSecondary">
          Stats
        </Typography>
        <div style={{flexGrow: 1}} />
        <CardChip type="wounds" value={wounds ?? 0} size={chipSize} />
      </ReverseWrapper>
    </CardContent>
  );
}

function CommandCardContent({card}: CardProps) {
  const {cardSubtype} = card;
  return (
    <CardContent style={{padding: 8, textAlign: "right"}}>
      <ReverseWrapper>
        <Typography variant="body2" color="textSecondary">
          Pips
        </Typography>
        <div style={{flexGrow: 1}} />
        <Typography variant="body1" style={{marginRight: 16}}>
          {cardSubtype}
        </Typography>
      </ReverseWrapper>
    </CardContent>
  );
}

function BattleCardContent({card}: CardProps) {
  const {cardSubtype} = card;
  return (
    <CardContent style={{padding: 8, textAlign: "right"}}>
      <ReverseWrapper>
        <Typography variant="body2" color="textSecondary">
          Type
        </Typography>
        <div style={{flexGrow: 1}} />
        <Typography variant="body1" style={{marginRight: 16}}>
          {capitalizeFirstLetters(cardSubtype)}
        </Typography>
      </ReverseWrapper>
    </CardContent>
  );
}

function UpgradeCardContent({card, chipSize}: CardProps) {
  const {cost} = card;
  return (
    <CardContent style={{padding: 8, textAlign: "right"}}>
      <ReverseWrapper>
        <Typography variant="body2" color="textSecondary">
          Cost
        </Typography>
        <div style={{flexGrow: 1}} />
        <CardChip type="points" value={cost} size={chipSize} />
      </ReverseWrapper>
    </CardContent>
  );
}

function UnitCardContent({card, chipSize}: CardProps) {
  const {cost, wounds, resilience, courage, speed, defense, surges, upgradeBar} = card;
  return (
    <CardContent style={{padding: 8, textAlign: "right"}}>
      <ReverseWrapper>
        <Typography variant="body2" color="textSecondary">
          Cost
        </Typography>
        <div style={{flexGrow: 1}} />
        <CardChip type="points" value={cost} size={chipSize} />
      </ReverseWrapper>
      <Divider style={{marginBottom: 4}} />
      <ReverseWrapper>
        <Typography variant="body2" color="textSecondary">
          Stats
        </Typography>
        <div style={{flexGrow: 1}} />
        <CardChip type="wounds" value={wounds ?? 0} size={chipSize} />
        {resilience ? (
          <CardChip type="resilience" value={resilience} size={chipSize} />
        ) : (
          <CardChip type="courage" value={courage} size={chipSize} />
        )}
        <CardChip type="speed" value={speed} size={chipSize} />
        <CardChip type="defense" value={defense} size={chipSize} />
        <CardChip type="surges" value={surges ?? []} size={chipSize} />
      </ReverseWrapper>
      <Divider style={{marginBottom: 4}} />
      <ReverseWrapper>
        <Typography variant="body2" color="textSecondary">
          Upgrades
        </Typography>
        <div style={{flexGrow: 1}} />
        <UpgradeBar upgradeBar={upgradeBar ?? []} />
      </ReverseWrapper>
    </CardContent>
  );
}

function TextCardActions({
  isExpanded,
  handleExpandClick,
}: {
  isExpanded: boolean;
  handleExpandClick: (event: React.SyntheticEvent) => void;
}) {
  return (
    <CardActions disableSpacing style={{padding: "0 8px 8px"}}>
      <IconButton
        size="medium"
        onClick={handleExpandClick}
        sx={[
          {
            transform: "rotate(0deg)",
            marginLeft: "auto",
            transition: (theme) =>
              theme.transitions.create("transform", {
                duration: theme.transitions.duration.shortest,
              }),
          },
          isExpanded && {
            transform: "rotate(180deg)",
          },
        ]}
      >
        <ExpandMoreIcon />
      </IconButton>
    </CardActions>
  );
}

function TextCardCollapsedContent({
  card,
  chipSize,
  isExpanded,
  handleCardZoom,
}: CardProps & {
  isExpanded: boolean;
  handleCardZoom: (event: React.SyntheticEvent) => void;
}) {
  const {keywords} = card;
  return (
    <Collapse unmountOnExit timeout="auto" in={isExpanded}>
      {keywords.length > 0 && (
        <CardContent style={{padding: 8}}>
          <KeywordChips size={chipSize} keywords={keywords} />
        </CardContent>
      )}
      <CardActions>
        <Button size="medium" style={{marginLeft: "auto"}} onClick={handleCardZoom}>
          Show more
        </Button>
      </CardActions>
    </Collapse>
  );
}

type TextCardProps = {
  card: LegionCard;
  handleClick?: (event: React.SyntheticEvent) => void;
  handleCardZoom: (event: React.SyntheticEvent) => void;
};

export function TextCard({card, handleClick, handleCardZoom}: TextCardProps) {
  const chipSize = "small";
  const [isExpanded, setIsExpanded] = React.useState(false);
  const handleExpandClick = () => setIsExpanded(!isExpanded);
  return (
    <Grow unmountOnExit in={true}>
      <Card sx={{width: 315, marginRight: 4, marginBottom: 4}}>
        <TextCardHeader card={card} handleClick={handleClick} />
        <TextCardContent card={card} chipSize={chipSize} />
        <TextCardActions
          // card={card}
          // chipSize={chipSize}
          isExpanded={isExpanded}
          handleExpandClick={handleExpandClick}
        />
        <TextCardCollapsedContent
          card={card}
          isExpanded={isExpanded}
          chipSize={chipSize}
          handleCardZoom={handleCardZoom}
        />
      </Card>
    </Grow>
  );
}
