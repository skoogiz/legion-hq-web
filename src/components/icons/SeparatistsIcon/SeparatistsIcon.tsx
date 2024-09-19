import {SvgIcon as MuiSvgIcon, SvgIconProps, styled} from "@mui/material";

const SvgIcon = styled(MuiSvgIcon, {
  name: "SeparatistsIcon",
  shouldForwardProp: (prop) => prop !== "fill",
})<SvgIconProps>(() => ({
  fill: "currentColor",
  height: "1em",
  width: "1em",
}));

export function SeparatistsIcon({
  x = "0px",
  y = "0px",
  viewBox = "265 275 360 360",
  inheritViewBox = false,
  ...props
}: SvgIconProps) {
  return (
    <SvgIcon viewBox={viewBox} x={x} y={y} inheritViewBox={inheritViewBox} {...props}>
      <g>
        <path d="M349.994,604.455 L350,604.445 L261.089,450.448 L379.801,450.448 L379.801,450.448 L261.089,450.448 L350,296.451 L349.994,296.441 L350.005,296.441 L527.826,296.441 L468.515,399.171 L468.521,399.181 L527.837,296.441 L616.753,450.448 L498.019,450.448 L498.019,450.448 L616.753,450.448 L527.837,604.455 L468.45,501.594 L468.439,501.594 L527.826,604.455 L349.994,604.455 z M462.979,501.594 L414.842,501.594 L364.332,589.079 L513.488,589.079 L462.979,501.594 z M597.138,455.071 L495.35,455.071 L471.666,496.092 L522.561,584.244 L597.138,455.071 z M382.47,455.071 L281.73,455.071 L356.308,584.244 L406.678,497 L382.47,455.071 z M522.561,315.681 L471.436,404.231 L494.89,444.854 L597.138,444.854 L522.561,315.681 z M356.308,315.681 L281.73,444.854 L382.93,444.854 L406.908,403.322 L356.308,315.681 z M513.488,310.845 L364.332,310.845 L415.302,399.127 L462.518,399.127 L513.488,310.845 z" />
      </g>
    </SvgIcon>
  );
}
