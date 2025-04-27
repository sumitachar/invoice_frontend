import { useState, useEffect, useMemo } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";

import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

import routes from "routes";
import appRoutes from "app.routes";

import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";

import brandWhite from "assets/logo/WhiteonTransparent.png";
import brandDark from "assets/logo/companyLogoGrayScale.png";

import { useStateManage } from "contextApi/SateManage";
import useAuthCheck from "hooks/useAuthCheck";
import PrivateRoute from "PrivateRoute";
import ProtectedLayout from "ProtectedLayout";

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor, transparentSidenav, whiteSidenav, darkMode } = controller;

  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  const { setShop_id, auth, authLoading,setAuth,setAuthLoading } = useStateManage();

  // Auth check hook
  useAuthCheck();

  // Initialize auth from localStorage on first load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuth(true); // Set to true if token exists
    } else {
      setAuth(false); // Set to false if token is deleted
    }
    setAuthLoading(false); // Set loading to false once the check is done

    // Add event listener for localStorage changes
    const storageListener = () => {
      const token = localStorage.getItem("token");
      setAuth(!!token); // Update auth state based on token
    };

    // Listen for changes to localStorage (token)
    window.addEventListener("storage", storageListener);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("storage", storageListener);
    };
  }, []);

  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });
    setRtlCache(cacheRtl);
  }, []);

  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) return getRoutes(route.collapse);

      if (route.route) {
        const isPrivate = route.private;
        return (
          <Route
            exact
            path={route.route}
            key={route.key}
            element={
              isPrivate ? (
                <PrivateRoute auth={auth}>{route.component}</PrivateRoute>
              ) : (
                route.component
              )
            }
          />
        );
      }

      return null;
    });

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  if (authLoading) {
    return (
      <ThemeProvider theme={darkMode ? themeDark : theme}>
        <CssBaseline />
        <div style={{ padding: "2rem", textAlign: "center" }}>Loading...</div>
      </ThemeProvider>
    );
  }


  return (
    <>
      {auth ? (
        direction === "rtl" ? (
          <CacheProvider value={rtlCache}>
            <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
              <CssBaseline />
              {layout === "dashboard" && (
                <>
                  <Sidenav
                    color={sidenavColor}
                    brand={
                      (transparentSidenav && !darkMode) || whiteSidenav
                        ? brandDark
                        : brandWhite
                    }
                    brandName="Techgenia"
                    routes={routes}
                    onMouseEnter={handleOnMouseEnter}
                    onMouseLeave={handleOnMouseLeave}
                  />
                  <Configurator />
                  {configsButton}
                </>
              )}
              {layout === "vr" && <Configurator />}
              <Routes>
                <Route path="/" element={<ProtectedLayout setAuth={setAuth} />}>
                  {getRoutes(routes)}
                  <Route path="*" element={<Navigate to="/dashboards/analytics" />} />
                </Route>
              </Routes>
            </ThemeProvider>
          </CacheProvider>
        ) : (
          <ThemeProvider theme={darkMode ? themeDark : theme}>
            <CssBaseline />
            {layout === "dashboard" && (
              <>
                <Sidenav
                  color={sidenavColor}
                  brand={
                    (transparentSidenav && !darkMode) || whiteSidenav
                      ? brandDark
                      : brandWhite
                  }
                  brandName="Techgenia"
                  routes={routes}
                  onMouseEnter={handleOnMouseEnter}
                  onMouseLeave={handleOnMouseLeave}
                />
                <Configurator />
                {configsButton}
              </>
            )}
            {layout === "vr" && <Configurator />}
            <Routes>
              <Route path="/" element={<ProtectedLayout setAuth={setAuth} />}>
                {getRoutes(appRoutes)}
                <Route path="*" element={<Navigate to="/dashboards/sales" />} />
              </Route>
            </Routes>
          </ThemeProvider>
        )
      ) : (
        <ThemeProvider theme={darkMode ? themeDark : theme}>
          <CssBaseline />
          <Routes>
            {getRoutes(appRoutes)}
            <Route
              path="*"
              element={<Navigate to="/authentication/sign-in/basic" />}
            />
          </Routes>
        </ThemeProvider>
      )}
    </>
  );
}
