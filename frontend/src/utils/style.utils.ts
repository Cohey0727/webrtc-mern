import { SxProps, Theme } from "@mui/material/styles";
import { SystemStyleObject } from "@mui/system";
import { useMemo } from "react";

type Style = SxProps<Theme>;
type Styles = Record<string, Style>;

// sxをマージする
function mergeSx(
  ...styles: (Style | undefined | null | false)[]
): ((theme: Theme) => SystemStyleObject<Theme>) | SystemStyleObject<Theme> {
  if (styles.length === 0) {
    return {} as SystemStyleObject;
  }
  // 関数が一つもない場合は、そのままマージする
  const noDynamicStyle = styles.every((style) => typeof style !== "function");
  if (!noDynamicStyle) {
    return styles.reduce<SystemStyleObject>((acc, style) => {
      if (style === undefined || style === null || style === false) {
        return acc;
      } else {
        return { ...acc, ...style } as SystemStyleObject;
      }
    }, {} as SystemStyleObject);
  }

  // 関数が一つでもある場合は、すべて関数化する
  return (theme: Theme) =>
    styles.reduce<SystemStyleObject>((acc, style) => {
      if (style === undefined || style === null || style === false) {
        return acc;
      } else if (typeof style === "function") {
        return {
          ...acc,
          ...((style as any)(theme) as Style),
        } as SystemStyleObject;
      } else {
        return { ...acc, ...style } as SystemStyleObject;
      }
    }, {} as SystemStyleObject);
}

// mergeSxのhooks版
function useSx(
  ...styles: (Style | undefined | null | false)[]
): ((theme: Theme) => SystemStyleObject<Theme>) | SystemStyleObject<Theme> {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => mergeSx(...styles), styles);
}

const styleVars = {
  color: {
    primary: {
      main: "var(--color-primary-main)",
      light: "var(--color-primary-light)",
      dark: "var(--color-primary-dark)",
    },
  },
};

export type { Styles, Style };
export { mergeSx, useSx, styleVars };
