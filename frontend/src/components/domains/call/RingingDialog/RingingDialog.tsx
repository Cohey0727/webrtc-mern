import { Merge } from "@/utils";
import { Column } from "@/components";
import styles from "./styles";
import { Button, Dialog, DialogActions, DialogTitle, List } from "@mui/material";

type BaseProps = {};
type OwnProps = {
  ringing: boolean;
  onAccept: () => void;
  onReject: () => void;
};

type RingingDialogProps = Merge<BaseProps, OwnProps>;

const RingingDialog: React.FC<RingingDialogProps> = (props) => {
  const { ringing, onAccept, onReject, ...rest } = props;
  return (
    <Dialog onClose={onReject} open={ringing}>
      <DialogTitle>Set backup account</DialogTitle>
      <DialogActions>
        <Button onClick={onAccept}>Accept</Button>
        <Button onClick={onReject}>Reject</Button>
      </DialogActions>
    </Dialog>
  );
};

export type { RingingDialogProps };
export default RingingDialog;
