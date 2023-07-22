import { Row, RowProps } from "@/components/containers";
import { Merge, mergeSx } from "@/utils";
import styles from "./styles";

type BaseProps = RowProps;
type OwnProps = {
  direction?: "row" | "column";
};
type PageBodyProps = Merge<BaseProps, OwnProps>;

const PageBody: React.FC<PageBodyProps> = (props) => {
  const { sx, direction = "row", ...rest } = props;
  return (
    <Row
      sx={mergeSx(styles.root, direction === "column" && styles.directionColumn, sx)}
      {...rest}
    />
  );
};

export default PageBody;
