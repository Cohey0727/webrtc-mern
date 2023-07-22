import Typography, { TypographyProps } from "@mui/material/Typography";
import { Merge } from "@/utils";

type BaseProps = TypographyProps;
type OwnProps = {};
type PageTitleProps = Merge<BaseProps, OwnProps>;

const PageTitle: React.FC<PageTitleProps> = (props) => {
  return <Typography {...props} variant="h2" />;
};

export default PageTitle;
