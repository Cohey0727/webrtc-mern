import { Merge } from "@/utils";
import { Center, Column, ColumnProps } from "@/components";
import styles from "./styles";

type BaseProps = ColumnProps;
type OwnProps = {
  children: React.ReactNode;
  overlay?: React.ReactNode;
};

type OverlayProps = Merge<BaseProps, OwnProps>;

const Overlay: React.FC<OverlayProps> = (props) => {
  const { children, overlay, ...rest } = props;
  return (
    <Column sx={styles.root} {...rest}>
      {children}
      {overlay ? <Center sx={styles.overlay}>{overlay}</Center> : null}
    </Column>
  );
};

export type { OverlayProps };
export default Overlay;
