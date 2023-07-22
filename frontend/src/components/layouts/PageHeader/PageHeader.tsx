import { Row, RowProps } from "@/components/containers";
import { Merge, mergeSx } from "@/utils";
import styles from "./styles";

type BaseProps = RowProps;
type OwnProps = {};
type PageHeaderProps = Merge<BaseProps, OwnProps>;

const PageHeader: React.FC<PageHeaderProps> = (props) => {
  const { sx, ...rest } = props;
  return <Row sx={mergeSx(styles.root, sx)} {...rest} />;
};

export default PageHeader;
