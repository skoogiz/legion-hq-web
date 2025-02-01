import {IconButton, Icon} from "@mui/material";
import {UpgradeType} from "@legion-hq/types";
import {UpgradeIcon} from "@legion-hq/components/UpgradeIcon";

type Props = {
  type: UpgradeType;
  handleClick: () => void;
};

export function AddUpgradeButton({type, handleClick}: Props) {
  const size = 32;
  return (
    <IconButton size="small" style={{marginBottom: 4}} onClick={handleClick}>
      <Icon style={{height: size, width: size}}>
        <UpgradeIcon type={type} />
      </Icon>
    </IconButton>
  );
}
