export {ThemeProvider} from "./ThemeProvider";
export * as ThemeUtils from "./themeUtils";

declare module "@mui/material/Chip" {
  interface ChipPropsColorOverrides {
    rebels: true;
    empire: true;
    republic: true;
    separatists: true;
    mercenaries: true;
  }
}
