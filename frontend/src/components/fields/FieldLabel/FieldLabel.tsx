import { Typography } from "@mui/material";
import { mergeSx, Style } from "@/utils";
import styles from "./styles";

type FieldLabelProps = {
  required?: boolean;
  children: React.ReactNode;
  sx?: Style;
};

const FieldLabel: React.FC<FieldLabelProps> = (props) => {
  const { required, children, sx } = props;
  return (
    <Typography sx={mergeSx(styles.root, sx)} variant="caption">
      {required && <span>*</span>}
      {children}
    </Typography>
  );
};

export type { FieldLabelProps };
export default FieldLabel;
