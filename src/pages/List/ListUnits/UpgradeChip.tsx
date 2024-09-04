import {Divider, Chip, Button, IconButton, Icon, Typography} from "@mui/material";
import {Clear as ClearIcon} from "@mui/icons-material";
import {CardIcon} from "@legion-hq/components";
import loadoutIcon from "@legion-hq/assets/loadout.png";
import {useCards} from "@legion-hq/data-access/hooks/useCards";
import {LegionCard} from "@legion-hq/types";

type UpgradeLabelProps = {
  card: LegionCard;
  handleSwapUpgrade?: () => void;
  handleChangeLoadout: () => void;
};

function UpgradeLabel({card, handleSwapUpgrade, handleChangeLoadout}: UpgradeLabelProps) {
  if (handleChangeLoadout) {
    return (
      <div style={{display: "flex", alignItems: "center"}}>
        <Typography variant="body2">
          {`${card.displayName ? card.displayName : card.cardName} (${card.cost})`}
        </Typography>
        {Boolean(handleChangeLoadout) && (
          <IconButton
            size="small"
            onClick={handleChangeLoadout}
            style={{zIndex: 1, marginLeft: 4, width: 26, height: 26}}
          >
            <Icon>
              <img
                alt="loadout"
                src={loadoutIcon}
                style={{width: 14, height: 19, marginBottom: 1}}
              />
            </Icon>
          </IconButton>
        )}
      </div>
    );
  }
  return (
    <div style={{display: "flex", alignItems: "center"}}>
      <Button
        disableRipple
        size="small"
        onClick={handleSwapUpgrade}
        style={{textTransform: "none"}}
      >
        <Typography variant="body2">
          {`${card.displayName ? card.displayName : card.cardName} (${card.cost})`}
        </Typography>
      </Button>
      {Boolean(handleChangeLoadout) && (
        <IconButton
          size="small"
          onClick={handleChangeLoadout}
          style={{zIndex: 1, marginLeft: 4, width: 26, height: 26}}
        >
          <Icon>
            <img
              alt="loadout"
              src={loadoutIcon}
              style={{width: 14, height: 19, marginBottom: 1}}
            />
          </Icon>
        </IconButton>
      )}
    </div>
  );
}

type LoadoutLabelProps = {
  upgradeCard: LegionCard;
  loadoutCard: LegionCard;
  handleChangeLoadout: () => void;
  handleDeleteLoadout: () => void;
};

function LoadoutLabel({
  upgradeCard,
  loadoutCard,
  handleChangeLoadout,
  handleDeleteLoadout,
}: LoadoutLabelProps) {
  return (
    <div style={{alignItems: "flex-start", flexFlow: "column nowrap"}}>
      <UpgradeLabel card={upgradeCard} handleChangeLoadout={handleChangeLoadout} />
      <Divider />
      <div style={{display: "flex", alignItems: "center"}}>
        <Typography variant="body2">
          {`${
            loadoutCard.displayName ? loadoutCard.displayName : loadoutCard.cardName
          } (${loadoutCard.cost})`}
        </Typography>
        <IconButton size="small" onClick={handleDeleteLoadout} style={{marginLeft: 4}}>
          <ClearIcon fontSize="small" />
        </IconButton>
      </div>
    </div>
  );
}

type UpgradeAvatarProps = {
  card: LegionCard;
  handleClick: () => void;
};

function UpgradeAvatar({card, handleClick}: UpgradeAvatarProps) {
  return (
    <CardIcon
      size="small"
      cardType="upgrade"
      cardName={card.cardName}
      imageName={card.imageName}
      handleClick={handleClick}
    />
  );
}

type Props = {
  chipSize?: "small" | "medium";
  upgradeInteractions?: Record<string, number>;
  upgradeId: string;
  loadoutId?: string;
  handleClick: () => void;
  handleSwap?: () => void;
  handleDelete?: () => void;
  handleChangeLoadout: () => void;
  handleDeleteLoadout: () => void;
};

export function UpgradeChip({
  chipSize = "medium",
  upgradeInteractions,
  upgradeId,
  loadoutId,
  handleClick,
  handleSwap,
  handleDelete,
  handleChangeLoadout,
  handleDeleteLoadout,
}: Props) {
  const {cards} = useCards();
  const upgradeCard = cards[upgradeId];
  const loadoutCard = loadoutId ? cards[loadoutId] : undefined;
  let pointDelta = 0;
  if (upgradeInteractions && upgradeId in upgradeInteractions) {
    pointDelta = upgradeInteractions[upgradeId];
  }
  return (
    <Chip
      size={chipSize}
      label={
        loadoutCard ? (
          <LoadoutLabel
            upgradeCard={{...upgradeCard, cost: upgradeCard.cost + pointDelta}}
            loadoutCard={loadoutCard}
            handleChangeLoadout={handleChangeLoadout}
            handleDeleteLoadout={handleDeleteLoadout}
          />
        ) : (
          <UpgradeLabel
            card={{...upgradeCard, cost: upgradeCard.cost + pointDelta}}
            handleSwapUpgrade={handleSwap}
            handleChangeLoadout={handleChangeLoadout}
          />
        )
      }
      avatar={<UpgradeAvatar card={upgradeCard} handleClick={handleClick} />}
      style={{marginRight: 4, marginTop: 4, marginBottom: 6, height: "auto"}}
      onDelete={handleDelete}
    />
  );
}
