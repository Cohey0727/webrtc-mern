import { Components } from "@mui/material/styles/components";
import palette from "./palette";

const { primary, success, error } = palette;

const components = {
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        backgroundColor: palette.primary.main,
      },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      formControl: {
        // 移動をクリック時に動かないように固定
        position: "static",
        transform: "none",
        transition: "none",
        // クリックを可能に
        pointerEvents: "auto",
        cursor: "pointer",
        // 幅いっぱいを解除
        display: "inline",
        alignSelf: "start",
        // タイポグラフィを指定
        fontWeight: "bold",
        fontSize: "0.75rem",
        // テーマの Composition を使えば以下のようにも書ける
        // base.typography.subtitle2
      },
    },
  },
  MuiInputBase: {
    styleOverrides: {
      root: {
        "&.Mui-disabled": {
          "& .MuiInputAdornment-root": {
            opacity: 0.5,
          },
        },
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        // デフォルトだと、
        // ラベルをはみ出させるための小さなmarginがある
        marginTop: 0,
        borderRadius: "18px",
        "&.MuiInputBase-multiline": {
          padding: "4px 16px",
        },
      },
      input: {
        paddingTop: "10px",
        paddingBottom: "8px",
        height: "auto",
      },
      notchedOutline: {
        // デフォルトだと、 position が absolute、
        // ラベルをはみ出させるため上に少しの余白がある
        top: 0,
        legend: {
          // 内包された legend 要素によって、四角の左側の切り欠きが実現されているので、
          // 表示されないように。
          // (SCSS と同様にネスト記述が可能です。)
          display: "none",
        },
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: "18px",
        fontWeight: "bold",
        whiteSpace: "nowrap",
        border: `1px solid ${primary.main}`,
      },
      outlined: {
        color: "#888",
      },
    },
  },
  MuiList: {
    styleOverrides: {
      root: {
        padding: 0,
      },
    },
  },
  MuiListItem: {
    defaultProps: {
      disablePadding: true,
    },
    styleOverrides: {
      root: {
        backgroundColor: "#fff",
        boxSizing: "border-box",
      },
    },
  },
  MuiListItemButton: {
    styleOverrides: {
      root: {
        boxSizing: "border-box",
        fontSize: 14,
        borderRight: `3px solid ${primary.main}00`,
        "&.Mui-selected": {
          backgroundColor: `${primary.main}22`,
          color: primary.main,
          borderRight: `3px solid ${primary.main}`,
        },
        "&.Mui-selected:hover": {
          backgroundColor: "#eee",
          color: primary.main,
        },
        "&:hover": {
          backgroundColor: "#eee",
          color: primary.main,
        },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        padding: 0,
        boxShadow: "none",
      },
    },
  },
  MuiTab: {
    styleOverrides: {
      root: {
        "&.Mui-selected": {
          color: primary.main,
          fontWeight: "bold",
        },
      },
    },
  },
  MuiAutocomplete: {
    styleOverrides: {
      root: {
        "& .MuiOutlinedInput-root .MuiAutocomplete-input": {
          padding: "0 4px",
        },
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        "&.MuiChip-outlined.MuiChip-colorPrimary": {
          backgroundColor: `${primary.main}22`,
        },
        "&.MuiChip-outlined.MuiChip-colorSuccess": {
          backgroundColor: `${success.main}22`,
        },
        "&.MuiChip-outlined.MuiChip-colorError": {
          backgroundColor: `${error.main}22`,
        },
        "&.MuiChip-outlined.MuiChip-colorInfo": {
          color: "#4173C5",
          borderColor: "#4173C5",
          backgroundColor: `#4173C522`,
        },
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      paperWidthLg: {
        height: "80vh",
      },
      paperWidthXl: {
        height: "92vh",
      },
    },
  },
  MuiDialogActions: {
    styleOverrides: {
      root: {
        padding: "0px 24px 12px",
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        "& .MuiPickersYear-yearButton": {
          lineHeight: 1,
        },
      },
    },
  },
  MuiAlert: {
    styleOverrides: {
      standardError: {
        backgroundColor: palette.error.light,
      },
      standardInfo: {
        backgroundColor: palette.info.light,
      },
    },
  },

  // MuiDataGrid
  MuiDataGrid: {
    styleOverrides: {
      root: {
        border: 0,
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: "#fafafa",
          borderTop: "1px solid #f0f0f0",
          borderLeft: "1px solid #f0f0f0",
        },
        "& .MuiDataGrid-virtualScrollerRenderZone": {
          borderLeft: "1px solid #f0f0f0",
        },
      },
    },
  },
  MuiDialogTitle: {
    styleOverrides: {
      root: {
        fontWeight: "bold",
      },
    },
  },
} as Components;

export default components;
