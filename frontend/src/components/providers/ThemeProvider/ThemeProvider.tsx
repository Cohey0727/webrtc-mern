"use client";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme } from "@/utils";
import { useMemo } from "react";

type ThemeProviderProps = {
  children: React.ReactNode;
};

const ThemeProvider: React.FC<ThemeProviderProps> = (props) => {
  const { children } = props;
  const theme = useMemo(() => createTheme(), []);
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export type { ThemeProviderProps };
export default ThemeProvider;
