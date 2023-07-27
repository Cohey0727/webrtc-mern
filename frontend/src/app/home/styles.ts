import { Styles, palette } from "@/utils";

const layoutStyles = {
  root: {
    height: "100%",
    width: "100%",
    overflow: "hidden",
  },
  navHeader: (theme) => ({
    alignItems: "center",
    justifyContent: "center",
    padding: "0 8px",
    height: "64px",
    width: "100%",
    overflow: "hidden",
    ...theme.mixins.toolbar,
  }),
  navigation: {
    borderRight: `2px solid ${palette.primary.light}`,
  },
  navigationTop: {
    flex: "1 1 auto",
  },
  navigationBottom: {
    flex: "0 0 auto",
  },
  headerLogo: {
    height: "100%",
    padding: "8px 0",
  },
  headerToggleButton: {
    flex: "0 0 auto",
  },
  menuItem: {
    display: "block",
  },
  menuItemButton: {
    minHeight: "48px",
    px: "20px",
  },
  menuItemIcon: {
    minWidth: 0,
    fontWeight: "bold",
    justifyContent: "center",
  },
  menuTitle: {
    fontWeight: "bold",
    color: "#333",
    "& .MuiListItemText-primary": {
      fontWeight: "bold",
    },
  },
  main: {
    flex: "1 1 0",
    height: "100%",
    overflowX: "hidden",
    backgroundColor: "background.default",
  },
  avatarImage: {
    width: "24px",
    height: "24px",
  },
  avatarName: {
    fontWeight: "bold",
  },
} satisfies Styles;

const styles = {
  root: {
    height: "100%",
    width: "100%",
  },
  userListContainer: {
    height: "100%",
  },
  useList: {
    width: "324px",
  },
  useListItem: {
    borderBottom: `2px solid ${palette.primary.light}`,
  },
} satisfies Styles;

export default styles;
export { layoutStyles };
