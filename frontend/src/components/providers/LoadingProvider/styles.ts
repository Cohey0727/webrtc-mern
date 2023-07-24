import { Styles } from "@/utils";

const styles = {
  loading: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    zIndex: 9999,
  },
  hidden: {
    display: "none",
  },
} satisfies Styles;

export default styles;
