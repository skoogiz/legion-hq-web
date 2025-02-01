import {type AppSettings} from "@legion-hq/constants/settings";
import themes from "@legion-hq/constants/themes";
import {
  type Theme,
  createTheme as createMuiTheme,
  responsiveFontSizes,
} from "@mui/material";
import {createPalette} from "./createPalette";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xxs: true;
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
  }
}

const createTheme = (settings: AppSettings): Theme => {
  const theme = responsiveFontSizes(
    createMuiTheme({
      palette: themes.palettes[settings.themeMode],
      breakpoints: {
        values: {
          xxs: 0,
          xs: 375,
          sm: 768,
          md: 992,
          lg: 1200,
          xl: 1536,
        },
      },
    }),
  );

  return createMuiTheme(theme, {
    ...createPalette(theme),
  });
};

export {createTheme};
