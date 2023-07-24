"use client";
import { forwardRef } from "react";
import Box, { BoxProps } from "@mui/material/Box";
import { useSx } from "@/utils";
import styles from "./styles";

type BaseProps = BoxProps;
type CenterProps = Omit<BaseProps, "ref">;

const Center = forwardRef<HTMLDivElement, CenterProps>(function Center(props, ref) {
  const { sx, ...rest } = props;
  return <Box sx={useSx(styles.root, sx)} {...rest} ref={ref} />;
});

export type { CenterProps };
export default Center;
