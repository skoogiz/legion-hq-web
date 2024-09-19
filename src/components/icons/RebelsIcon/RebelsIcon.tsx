import {SvgIcon as MuiSvgIcon, SvgIconProps, styled} from "@mui/material";

const SvgIcon = styled(MuiSvgIcon, {
  name: "RebelsIcon",
  shouldForwardProp: (prop) => prop !== "fill",
})<SvgIconProps>(() => ({
  fill: "currentColor",
}));

export function RebelsIcon({
  x = "0px",
  y = "0px",
  viewBox = "0 0 2000 2000",
  inheritViewBox = false,
  ...props
}: SvgIconProps) {
  return (
    <SvgIcon viewBox={viewBox} x={x} y={y} inheritViewBox={inheritViewBox} {...props}>
      <g>
        <g>
          <path
            d="M7.48,975.61C19.73,657.57,184.26,364.24,485.03,170.4c0.89,0.33,8.68-2.45,5.12,4.15
			c-23.83,21.64-452.17,517.32-57.89,908.58c0,0,207.16,195.09,367.8,9.98c0,0,158.52-201.03-2.01-505.76
			c0,0-40.63-99.5-187.02-161.22L728.93,298.7c0,0,99.62,41.87,176.77,155.45c0,0,4.11-119.57-89.39-246.99L999.09,4l180.95,201.24
			c0,0-83.21,115.48-89.34,250.81c0,0,56.83-91.6,178.84-157.35l115.77,127.42c0,0-111.32,35.93-185.9,159.92
			c-64.12,114.88-113.49,360.57,2.89,511.27c0,0,130.24,180.91,359.34-10.68c0,0,421.23-369.73-43.2-904.29
			c0,0-25.38-21.97,3.12-10.03c205.27,146.4,451.06,339.47,476.44,821.29C1987.98,1577.9,1588.57,1995,1005.33,1995
			C434.27,1994.99-9.66,1528.16,7.48,975.61"
          />
        </g>
      </g>
    </SvgIcon>
  );
}
