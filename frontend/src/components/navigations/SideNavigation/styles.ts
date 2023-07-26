import { CSSObject, Theme } from "@mui/material/styles";
import { Style } from "@/utils";

const sidebarWidth = 240;
const closedSidebarWidth = 64;

const openedStyles = (theme: Theme): CSSObject => ({
  width: sidebarWidth,
  flex: `0 0 ${sidebarWidth}px`,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedStyles = (theme: Theme): CSSObject => ({
  width: closedSidebarWidth,
  flex: `0 0 ${closedSidebarWidth}px`,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
});

const styles =
  (open: boolean): Style =>
  (theme: Theme) => ({
    ...(open && {
      ...openedStyles(theme),
      "& .MuiDrawer-paper": openedStyles(theme),
    }),
    ...(!open && {
      ...closedStyles(theme),
      "& .MuiDrawer-paper": closedStyles(theme),
    }),
    whiteSpace: "nowrap",
  });

export default styles;
