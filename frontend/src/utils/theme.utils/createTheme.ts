import { createTheme as muiCreateTheme } from "@mui/material/styles";
import components from "./components";
import palette from "./palette";
import typography from "./typography";

const createTheme = () => muiCreateTheme({ palette, typography, components });

export default createTheme;
