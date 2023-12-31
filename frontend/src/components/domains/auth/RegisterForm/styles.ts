import { Styles, styleVars } from "@/utils";

const styles = {
  root: {
    backgroundColor: styleVars.color.primary.light,
    padding: "2rem",
    borderRadius: "0.5rem",
  },
  title: {},
  actions: {
    marginTop: "2rem",
  },
} satisfies Styles;

export default styles;
