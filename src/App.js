import { Switch, Route, Redirect } from "react-router-dom";

// Assets

// CSS styles
import "./App.css";
import "./styles/css/mainStyle.css";
import "./styles/css/margins.css";

// MUI - application theming
import { ThemeProvider, createTheme } from "@material-ui/core";

// redux
import { useSelector } from "react-redux";

// Routes
import defaultRoutes from "./routes";

function App() {
  const helper = useSelector((state) => state.helper);

  // theming
  let themeOptions = {
    priLight: "rgba(0,125,0,0.1)",
    error: "#be1e2d",
    warn: "#ee5700",
    teal: "#2accc888",
    hover: "rgba(0,0,0,0.1)",
    link: "#ee5700",
  };

  if (helper.themeName === "light") {
    themeOptions.type = "light";
    themeOptions.bg = "#fff";
    themeOptions.paperLight = "#ecf0ec";
    themeOptions.primary = "#3399ff";
    themeOptions.secondary = "#1f5f5b";
    themeOptions.tertiary = "#06373a";
    themeOptions.textPrimary = "#061a23";
    themeOptions.textSecondary = "#697a98";
    themeOptions.textTertiary = "#bfb8d6";
    themeOptions.divider = "#e4e4e4";
    themeOptions.dark = "#06373a";
  } else {
    themeOptions.type = "dark";
    themeOptions.bg = "#090c09";
    themeOptions.paperLight = "#061a23";
    themeOptions.primary = "#1144aa";
    themeOptions.secondary = "#1f5f5b";
    themeOptions.tertiary = "#06373a";
    themeOptions.textPrimary = "#faf7fc";
    themeOptions.textSecondary = "#ccc";
    themeOptions.textTertiary = "#bfb8d6";
    themeOptions.divider = "#06373a";
    themeOptions.dark = "#062229";
  }

  const appTheme = createTheme({
    palette: {
      type: themeOptions.type,
      background: {
        dark: themeOptions.dark,
        bg: themeOptions.bg,
        paper: themeOptions.paperLight,
        paperLight: themeOptions.paperLight,
        paperDark: themeOptions.paperDark,
      },
      action: {
        hover: themeOptions.hover,
      },
      primary: {
        main: themeOptions.primary,
        light: themeOptions.priLight,
      },
      secondary: {
        main: themeOptions.secondary,
      },
      tertiary: {
        main: themeOptions.tertiary,
      },
      text: {
        primary: themeOptions.textPrimary,
        secondary: themeOptions.textSecondary,
        tertiary: themeOptions.textTertiary,
        link: themeOptions.link,
        white: "#fff",
      },
      divider: themeOptions.divider,
      teal: themeOptions.teal,
      error: {
        main: themeOptions.error,
      },
      warning: {
        main: themeOptions.warn,
      },
    },
  });

  return (
    <ThemeProvider theme={appTheme}>
      <div className="App">
        <Switch>
          {defaultRoutes.map((route, i) => {
            return <Route key={i} {...route} path={`${route.path}`} />;
          })}
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
