import {styled} from "@mui/material";

const Hero = styled("div")`
  position: absolute;
  top: 0;
  left: 0;
  // height: 100vh;
  width: 100%;
  // background-color: hotpink;
  // background-image: url();
  background-size: cover;
  background-position: center center;
  z-index: 0;
`;

const Header = styled("header")`
  max-height: 56px;
`;

const Main = styled("main")`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height: calc(100vh - 48px);
`;

const Footer = styled("footer")(({theme}) => ({
  backgroundColor: theme.palette.secondary.main,
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(6),
}));

export {Hero, Header, Main, Footer};
