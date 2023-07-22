"use client";
import { forwardRef } from "react";
import Box, { BoxProps } from "@mui/material/Box";
import { useSx } from "@/utils";
import styles from "./styles";

type BaseProps = BoxProps;
type RowProps = Omit<BaseProps, "ref">;

const Row = forwardRef<HTMLDivElement, RowProps>((props, ref) => {
  const { sx, ...rest } = props;
  return <Box sx={useSx(styles.root, sx)} {...rest} ref={ref} />;
});

Row.displayName = "Row";

export type { RowProps };
export default Row;
