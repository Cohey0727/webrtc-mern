import { MutableRefObject } from "react";
import { Merge } from "@/utils";
import { Column } from "@/components";
import styles from "./styles";

type BaseProps = {};
type OwnProps = {
  ownVideoRef: MutableRefObject<HTMLVideoElement>;
  partnerVideoRef: MutableRefObject<HTMLVideoElement>;
};

type CallPanelProps = Merge<BaseProps, OwnProps>;

const CallPanel: React.FC<CallPanelProps> = (props) => {
  const { ownVideoRef, partnerVideoRef, ...rest } = props;
  return (
    <Column sx={styles.root} {...rest}>
      <video
        ref={ownVideoRef}
        playsInline
        muted
        autoPlay
        // className={toggle ? "SmallVideoCall" : "largeVideoCall"}
        // onClick={() => setToggle((prev) => !prev)}
      />
      <video
        ref={partnerVideoRef}
        playsInline
        autoPlay
        // className={toggle ? "SmallVideoCall" : "largeVideoCall"}
        // onClick={() => setToggle((prev) => !prev)}
      />
    </Column>
  );
};

export type { CallPanelProps };
export default CallPanel;
