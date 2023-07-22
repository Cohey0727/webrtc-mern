import { Column, ColumnProps } from "@/components/containers";
import { Merge } from "@/utils";
import styles from "./styles";

type BaseProps = ColumnProps;
type OwnProps = {};
type PageProps = Merge<BaseProps, OwnProps>;

const Page: React.FC<PageProps> = (props) => {
  return <Column sx={styles.root} {...props} />;
};

export type { PageProps };
export default Page;
