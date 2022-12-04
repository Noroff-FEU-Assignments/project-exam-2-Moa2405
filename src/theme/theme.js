export const light = {
  breakpoints: {
    values: {
      xxs: 0,
      xs: 500,
      sm: 600,
      md: 960,
      lg: 1200,
      xl: 1920,
    },
  },
  palette: {
    mode: "light",
    primary: {
      main: "#58C190",
      light: "#A2EFCB",
      dark: "#54CE95",
      contrastText: "#000000",
    },
    secondary: {
      main: "#FFFFFF",
      light: "#E6E6E6",
      dark: "#D0D0D0",
      contrastText: "#000000",
    },
    error: {
      main: "#CF6679",
      light: "#FF91A5",
      dark: "#DD4C66",
      contrastText: "#000000",
    },
    secondaryLightTheme: {
      main: "#000000",
      light: "#000000",
      dark: "#000000",
      contrastText: "#FFFFFF",
    },
    background: {
      paper: "#DEDEDE",
      default: "#DEDEDE",
      defaultChannel: "222 222 222",
    },
  },
};

export const dark = {
  breakpoints: {
    values: {
      xxs: 0,
      xs: 500,
      sm: 600,
      md: 960,
      lg: 1200,
      xl: 1920,
    },
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#6CF0B2",
      light: "#A2EFCB",
      dark: "#54CE95",
      contrastText: "#000000",
    },
    secondary: {
      main: "#FFFFFF",
      light: "#E6E6E6",
      dark: "#D0D0D0",
      contrastText: "#000000",
    },
    typography: {
      fontSize: 12,
    },
    error: {
      main: "#CF6679",
      light: "#FF91A5",
      dark: "#DD4C66",
      contrastText: "#000000",
    },
    background: {
      paper: "#0d1117",
      default: "#0d1117",
      defaultChannel: "13 17 23",
    },
  },
};