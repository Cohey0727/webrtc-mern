import { Column } from "@/components/containers";
import { Typography } from "@mui/material";
import styles from "./styles";

type RegisterFormProps = {};

const RegisterForm: React.FC<RegisterFormProps> = () => {
  return (
    <Column sx={styles.root}>
      <Typography variant="h3">Welcome</Typography>
    </Column>
  );
};

export type { RegisterFormProps };
export default RegisterForm;
