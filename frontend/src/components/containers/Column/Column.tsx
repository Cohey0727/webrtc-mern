"use client";
import { forwardRef } from "react";
import Box, { BoxProps } from "@mui/material/Box";
import { useSx } from "@/utils";
import styles from "./styles";

type BaseProps = BoxProps;
type ColumnProps = Omit<BaseProps, "ref">;

const Column = forwardRef<HTMLDivElement, ColumnProps>(function Column(props, ref) {
  const { sx, ...rest } = props;
  return <Box sx={useSx(styles.root, sx)} {...rest} ref={ref} />;
});

export type { ColumnProps };
export default Column;
