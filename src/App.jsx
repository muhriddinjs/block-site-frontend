import { useState, useMemo } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ArticleDetail from "./pages/ArticleDetail";
import Admin from "./pages/Admin";
import Footer from "./components/Footer";
import ComingSoon from "./pages/ComingSoon";
import Login from "./pages/Login";

function App() {
  const location = useLocation();

  // 1. Layout (Navbar va Footer) chiqmasligi kerak bo'lgan sahifalar
  const hideLayout =
    location.pathname === "/login" || location.pathname === "/admin";

  // 2. LIGHT/NIGHT MODE STATE
  const [mode, setMode] = useState("dark");

  // 3. SEARCH STATE
  const [searchQuery, setSearchQuery] = useState("");

  // 4. MUI MAVZUSI
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#1976d2",
          },
          background: {
            default: mode === "dark" ? "#0a1929" : "#f5f5f5",
            paper: mode === "dark" ? "#132f4c" : "#ffffff",
          },
        },
        typography: {
          fontFamily: '"Inter", "Roboto", "Arial", sans-serif',
        },
      }),
    [mode],
  );

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* 🛡️ NAVBAR: Faqat Login va Admin bo'lmasa chiqadi */}
      {/* {!hideLayout && (
        <Navbar
          toggleColorMode={toggleColorMode}
          mode={mode}
          setSearchQuery={setSearchQuery}
        />
      )} */}

      <Navbar
          toggleColorMode={toggleColorMode}
          mode={mode}
          setSearchQuery={setSearchQuery}
        />

      <Routes>
        <Route path="/" element={<Home searchQuery={searchQuery} />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
        <Route path="/login" element={<Login />} />

        {/* 🔒 ADMIN PROTECTED ROUTE */}
        <Route
          path="/admin"
          element={
            localStorage.getItem("token") ? (
              <Admin />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/darslar"
          element={
            <ComingSoon
              title="Darslar bo'limi"
              message="Tez orada bu yerda Node.js, ReactJS va kompyuter savodxonligiga oid premium darslar joylanadi."
            />
          }
        />
        <Route
          path="/loyihalar"
          element={
            <ComingSoon
              title="Amaliy Loyihalar"
              message="Tez orada bu yerda real loyihalarimiz namoyish etiladi."
            />
          }
        />
      </Routes>

      {/* 🛡️ FOOTER: Faqat Login va Admin bo'lmasa chiqadi */}
      {!hideLayout && <Footer />}
    </ThemeProvider>
  );
}

export default App;
