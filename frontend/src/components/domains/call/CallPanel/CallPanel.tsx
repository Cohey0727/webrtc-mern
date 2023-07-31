"use client";
import { MutableRefObject, useState } from "react";
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
  const [focusMe, setFocusMe] = useState(false);
  return (
    <Column sx={styles.root} {...rest}>
      <video
        ref={ownVideoRef}
        playsInline
        muted
        autoPlay
        className={focusMe ? "large-video-call" : "small-video-call"}
        onClick={() => {
          setFocusMe(true);
        }}
      />
      <video
        ref={partnerVideoRef}
        playsInline
        autoPlay
        className={focusMe ? "small-video-call" : "large-video-call"}
        onClick={() => setFocusMe(false)}
      />
    </Column>
  );
};

export type { CallPanelProps };
export default CallPanel;
