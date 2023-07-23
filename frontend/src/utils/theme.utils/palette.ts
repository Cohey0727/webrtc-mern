import { PaletteOptions } from "@mui/material/styles/createPalette";

const palette = {
  mode: "light",
  primary: {
    main: "#2f2f4a",
    dark: "#13132e",
    light: "#3f3f55",
  },
  secondary: {
    main: "#333333",
  },
  error: {
    light: "#ffe5e9",
    main: "#d32f2f",
    dark: "#9d0214",
  },
  warning: {
    main: "#ed6c02",
    light: "#ff9800",
    dark: "#e65100",
  },
  info: {
    main: "#333333",
    light: "#f4f4f4",
  },
  success: {
    light: "#e5f1e3",
    main: "#67ad5b",
    dark: "#518e47",
  },
  text: {
    primary: "#000000d9",
    secondary: "#333333",
  },
  background: {
    default: "#f5f5f5",
    paper: "#ffffff",
  },
} satisfies PaletteOptions;

export default palette;
