import { Styles } from "@/utils";

const styles = {
  root: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    "& video": {
      borderRadius: "6px",
      objectFit: "cover",
    },
    "& .small-video-call": {
      position: "absolute",
      bottom: "0%",
      right: "0%",
      padding: "12px",
      width: "20%",
      height: "20%",
      zIndex: 1,
    },
    "& .large-video-call": {
      width: "100%",
      height: "100%",
      position: "relative",
      padding: "4px",
    },
  },
} satisfies Styles;

export default styles;
