import {styled} from "@mui/material";
import {BrightnessAuto as ActivationIcon} from "@mui/icons-material";
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

type Props = {
  activations: number;
};

export function ActivationBadge({activations}: Props) {
  return (
    <IconContainer>
      <ActivationIcon />
      <Text>{activations}</Text>
    </IconContainer>
  );
}
