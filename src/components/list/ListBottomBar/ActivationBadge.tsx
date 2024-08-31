import {styled} from "@mui/material";
import {BrightnessAuto as ActivationIcon} from "@mui/icons-material";
import {useList} from "@legion-hq/hooks/list/useList";
import {Text} from "./ListBottomComponents";

const IconContainer = styled("div")`
  display: flex;
  align-items: center;
  column-gap: 0.2em;
  svg {
    font-size: 18px;
    line-height: 1;
    height: 1em;
    width: 1em;
    opacity: 0.4;
  }
`;

export function ActivationBadge() {
  const {currentList} = useList();

  const numActivations = currentList.units.reduce((num, unit) => {
    num += unit.count;
    return num;
  }, 0);

  return (
    <IconContainer>
      <ActivationIcon />
      <Text>{numActivations}</Text>
    </IconContainer>
  );
}
