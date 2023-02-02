import { createTheme } from "@mui/material";

export const redTheme = createTheme({
    palette: {
      mode: "light",
      common: {
        black: "#1D1E2A",
      },
      primary: {
        main: "#cb1d1d",
        contrastText: "#1D1E2A",
      },
      secondary: {
        main: "#1D1E2A",
      },
      info: {
        main: "#5C95FF",
      },
      text: {
        primary: "#1D1E2A",
        secondary: "#7F7F7F",
      },
      background: {
        paper: '#29164700',
        default: '#29164700'
      }
    },
    typography: {
      fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"].join(","),
    },
    components: {
      MuiDatePicker: {
        styleOverrides: {
          root: {
            backgroundColor: "#cb1d1d",
          },
        },
      },
    },
  });