import createPalette from "@mui/material/styles/createPalette";

const themes = {
  palettes: {
    dark: createPalette({
      mode: "dark",
      primary: {main: "#fafafa"},
      secondary: {main: "#1F2125"},
      background: {default: "#141414"},
    }),

    light: createPalette({
      mode: "light",
      primary: {main: "#1e2125"},
      secondary: {main: "#fff"},
      background: {default: "#fff"},
    }),

    blue: createPalette({
      mode: "dark",
      primary: {main: "#b72c2c"},
      secondary: {main: "#0e232d"},
      background: {default: "#243c47"},
    }),
  },
};

export default themes;
