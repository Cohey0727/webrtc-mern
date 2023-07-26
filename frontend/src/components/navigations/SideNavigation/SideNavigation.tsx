import Drawer, { DrawerProps } from "@mui/material/Drawer";
import { Merge } from "@/utils";
import styles from "./styles";

type BaseProps = DrawerProps;
type OnwProps = {};
type SideNavigationProps = Merge<BaseProps, OnwProps>;

const SideNavigation: React.FC<SideNavigationProps> = (props) => {
  const { sx, open = false, ...rest } = props;
  return <Drawer sx={styles(open)} open={open} variant="permanent" {...rest} />;
};

export type { SideNavigationProps };
export default SideNavigation;
