import { Merge } from "@/utils";
import {
  InputAdornment,
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from "@mui/material";

type BaseProps = MuiTextFieldProps;
type OwnProps = {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  InputProps?: Omit<MuiTextFieldProps["InputProps"], "startAdornment" | "endAdornment">;
};
type TextFieldProps = Merge<BaseProps, OwnProps>;

const TextField: React.FC<TextFieldProps> = (props) => {
  const { startIcon, endIcon, InputProps, defaultValue = "", ...rest } = props;
  return (
    <MuiTextField
      {...rest}
      defaultValue={defaultValue}
      InputProps={{
        startAdornment: <InputAdornment position="start">{startIcon}</InputAdornment>,
        endAdornment: <InputAdornment position="end">{endIcon}</InputAdornment>,
        ...InputProps,
      }}
    />
  );
};

export type { TextFieldProps };
export default TextField;
