import {Badge, IconButton, Avatar, BadgeProps} from "@mui/material";
import ranks from "@legion-hq/constants/ranks";
import {LargerTooltip} from "@legion-hq/components";
import {RankType} from "@legion-hq/types";

type Props = {
  count: number;
  rank: RankType;
  handleClick: () => void;
} & Pick<BadgeProps, "color">;

export function RankButton({rank, color, count, handleClick}: Props) {
  return (
    <LargerTooltip title={ranks[rank].title}>
      <IconButton size="small" onClick={handleClick}>
        <Badge showZero max={100} color={color} badgeContent={count}>
          <Avatar alt={rank} src={ranks[rank].icon} style={{width: 32, height: 32}} />
        </Badge>
      </IconButton>
    </LargerTooltip>
  );
}
