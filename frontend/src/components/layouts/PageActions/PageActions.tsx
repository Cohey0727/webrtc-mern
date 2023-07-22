import { Row, RowProps } from "@/components/containers";
import { Merge, mergeSx } from "@/utils";
import styles from "./styles";

type BaseProps = RowProps;
type OwnProps = {};
type PageActionsProps = Merge<BaseProps, OwnProps>;

const PageActions: React.FC<PageActionsProps> = (props) => {
  const { sx, ...rest } = props;
  return <Row sx={mergeSx(styles.root, sx)} {...rest} />;
};

export default PageActions;
