import { useState } from "react"; // 🌟 Inputni ochib-yopish uchun qo'shildi
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Tooltip,
  InputBase, // 🌟 Qidiruv yozish uchun qo'shildi
  alpha,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import SearchIcon from "@mui/icons-material/Search";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import CodeIcon from "@mui/icons-material/Code";

// 🌟 App.jsx dan yuborilgan props'larni qabul qilamiz
export default function Navbar({ toggleColorMode, mode, setSearchQuery }) {
  const location = useLocation();
  const [showSearch, setShowSearch] = useState(false); // Qidiruv inputini ko'rsatish state'i

  // 🌟 YANGICHA CREATIVE DIZAYN (Hover va Active effektlar) - O'zgarishsiz qoldi
  const navButtonStyle = (path) => {
    const isActive = location.pathname === path;
    
    return {
      position: "relative",
      color: isActive ? "primary.main" : "text.secondary",
      fontWeight: isActive ? 700 : 500,
      textTransform: "none",
      fontSize: "1rem",
      px: 2,
      py: 1,
      background: "transparent",
      transition: "color 0.3s ease",
      "&:hover": { 
        color: "primary.main", 
        background: "transparent" 
      },
      "&::after": {
        content: '""',
        position: "absolute",
        bottom: "6px",
        left: "50%",
        transform: "translateX(-50%) scaleX(0)",
        width: "70%",
        height: "3px",
        borderRadius: "4px",
        backgroundColor: "primary.main",
        transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      },
      "&:hover::after": {
        transform: "translateX(-50%) scaleX(1)",
      },
      ...(isActive && {
        "&::after": {
          transform: "translateX(-50%) scaleX(1)",
          boxShadow: (theme) => theme.palette.mode === 'dark' 
            ? "0 0 10px rgba(102, 178, 255, 0.8)" 
            : "0 0 10px rgba(25, 118, 210, 0.6)",
        },
      }),
    };
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: (theme) =>
          theme.palette.mode === "light"
            ? "rgba(255, 255, 255, 0.8)"
            : "rgba(18, 18, 18, 0.8)",
        backdropFilter: "blur(12px)",
        borderBottom: 1,
        height: "9vh",
        justifyContent: "center",
        borderColor: "divider",
        zIndex: 1200,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", py: 0.5 }}>
        {/* CHAP TOMON: LOGOTIP QISMI */}
        <Box
          sx={{ display: "flex", alignItems: "center", textDecoration: "none" }}
          component={Link}
          to="/"
        >
          <Box
            sx={{
              bgcolor: "primary.main",
              color: "white",
              p: 0.5,
              borderRadius: 1.5,
              display: "flex",
              mr: 1.5,
              boxShadow: "0 2px 10px rgba(25,118,210,0.3)",
            }}
          >
            <CodeIcon fontSize="small" />
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              color: "text.primary",
              letterSpacing: "-0.5px",
              display: { xs: "none", sm: "block" } // Mobil versiyada qidiruvga joy qolishi uchun
            }}
          >
            IT-Savodxonlik
          </Typography>
        </Box>

        {/* O'RTADAGI MENYULAR */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 2,
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <Button component={Link} to="/" disableRipple sx={navButtonStyle("/")}>
            Maqolalar
          </Button>
          <Button component={Link} to="/darslar" disableRipple sx={navButtonStyle("/darslar")}>
            Darslar
          </Button>
          <Button component={Link} to="/loyihalar" disableRipple sx={navButtonStyle("/loyihalar")}>
            Loyihalar
          </Button>
        </Box>

        {/* O'NG TOMON: IKONKALAR VA ADMIN */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          
          {/* 🔍 QIDIRUV QISMI */}
          <Box sx={{ 
            display: "flex", 
            alignItems: "center", 
            bgcolor: showSearch ? alpha("#999", 0.1) : "transparent",
            borderRadius: 2,
            px: showSearch ? 1 : 0,
            transition: "all 0.3s ease"
          }}>
            {showSearch && (
              <InputBase
                placeholder="Qidirish..."
                autoFocus
                onChange={(e) => setSearchQuery(e.target.value)} // 🌟 Qidiruvni ulash
                sx={{ 
                  ml: 1, 
                  width: { xs: "100px", sm: "180px" }, 
                  fontSize: "0.9rem",
                  color: "text.primary"
                }}
              />
            )}
            <Tooltip title="Qidirish">
              <IconButton 
                onClick={() => setShowSearch(!showSearch)} 
                sx={{ color: showSearch ? "primary.main" : "text.secondary" }}
              >
                <SearchIcon />
              </IconButton>
            </Tooltip>
          </Box>

          <Tooltip title={mode === "dark" ? "Kun rejimi" : "Tun rejimi"}>
            <IconButton
              onClick={toggleColorMode}
              color="inherit"
              sx={{ color: "text.secondary" }}
            >
              {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>

          <Box sx={{ width: "1px", height: "24px", bgcolor: "divider", mx: 1 }} />

          <Tooltip title="Boshqaruv Paneli">
            <IconButton
              component={Link}
              to="/admin"
              sx={{
                color:
                  location.pathname === "/admin"
                    ? "primary.main"
                    : "text.disabled",
                "&:hover": { color: "primary.main" },
              }}
            >
              <AdminPanelSettingsIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}