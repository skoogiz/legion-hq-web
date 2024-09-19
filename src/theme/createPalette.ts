import {Theme} from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    rebels: Palette["primary"];
    empire: Palette["primary"];
    republic: Palette["primary"];
    separatists: Palette["primary"];
    mercenaries: Palette["primary"];
    accent?: Palette["primary"];
  }

  interface PaletteOptions {
    rebels?: PaletteOptions["primary"];
    empire?: PaletteOptions["primary"];
    republic?: PaletteOptions["primary"];
    separatists?: PaletteOptions["primary"];
    mercenaries?: PaletteOptions["primary"];
    accent?: PaletteOptions["primary"];
  }
}

export interface LegionColorPalette {
  rebels: true;
  empire: true;
  republic: true;
  separatists: true;
  mercenaries: true;
  accent: true;
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    rebels: true;
    empire: true;
    republic: true;
    separatists: true;
    mercenaries: true;
    accent: true;
  }
}

declare module "@mui/material/Chip" {
  interface ChipPropsColorOverrides {
    rebels: true;
    empire: true;
    republic: true;
    separatists: true;
    mercenaries: true;
    accent: true;
  }
}

export const createPalette = (theme: Theme) => ({
  palette: {
    rebels: theme.palette.augmentColor({
      color: {
        main: "#982B1C",
      },
      name: "rebels",
    }),
    empire: theme.palette.augmentColor({
      color: {
        main: "#85586F",
      },
      name: "empire",
    }),
    republic: theme.palette.augmentColor({
      color: {
        main: "#9D9482", //"#E1D4BB",
      },
      name: "republic",
    }),
    separatists: theme.palette.augmentColor({
      color: {
        main: "#124076",
      },
      name: "rebels",
    }),
    mercenaries: theme.palette.augmentColor({
      color: {
        main: "#3F4441", // "#532E1C" "#603601"
      },
      name: "mercenaries",
    }),
    accent: theme.palette.augmentColor({
      color: {
        main: "#FFB000",
      },
      name: "accent",
    }),
  },
});
