import {IconButton, Icon, Avatar} from "@mui/material";
import upgradeTypes from "@legion-hq/constants/upgradeTypes";
import {UpgradeType} from "@legion-hq/types";

type Props = {
  type: UpgradeType;
  handleClick: () => void;
};

export function AddUpgradeButton({type, handleClick}: Props) {
  const size = 32;
  return (
    <IconButton size="small" style={{marginBottom: 4}} onClick={handleClick}>
      <Icon style={{height: size, width: size}}>
        <Avatar
          alt={type}
          src={upgradeTypes[type].icon}
          style={{height: size, width: size}}
        />
      </Icon>
    </IconButton>
  );
}
