import CircularProgress from "@mui/material/CircularProgress";
import { Center } from "../../containers";

type LoadingProps = React.ComponentProps<typeof CircularProgress>;

const Loading: React.FC<LoadingProps> = (props) => {
  return (
    <Center>
      <CircularProgress {...props} />
    </Center>
  );
};

export default Loading;
