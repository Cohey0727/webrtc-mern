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
type TextInputProps = Merge<BaseProps, OwnProps>;

const TextInput: React.FC<TextInputProps> = (props) => {
  const { startIcon, endIcon, InputProps, ...rest } = props;
  return (
    <MuiTextField
      {...rest}
      InputProps={{
        startAdornment: <InputAdornment position="start">{startIcon}</InputAdornment>,
        endAdornment: <InputAdornment position="end">{endIcon}</InputAdornment>,
        ...InputProps,
      }}
    />
  );
};

export type { TextInputProps };
export default TextInput;
