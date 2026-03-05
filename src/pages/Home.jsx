import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Grid,
  CircularProgress,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ArticleCard from "../components/ArticleCard";

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function Home({ searchQuery }) {
  const theme = useTheme();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  // Bazadan maqolalarni tortib kelamiz
  useEffect(() => {
    setLoading(true);
    // 🌟 Qidiruv so'zi bo'lsa API ga "?search=..." qilib yuboramiz
    const url = searchQuery
      ? `${API_URL}/articles?search=${encodeURIComponent(searchQuery)}`
      : `${API_URL}/articles`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setArticles(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Xatolik:", err);
        setLoading(false);
      });
  }, [searchQuery]); //MUHIM: Bu massiv ichida searchQuery bo'lishi shart!

  // 🌟 PARTICLES NASTROYKASI
  const particlesOptions = useMemo(
    () => ({
      fullScreen: { enable: false }, // 🌟 QUTQARUVCHI KOD: Faqat Hero Section ichida qoladi!
      background: {
        color: { value: "transparent" },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onHover: { enable: true, mode: "grab" },
        },
        modes: {
          grab: { distance: 180, links: { opacity: 0.8 } },
        },
      },
      particles: {
        color: { value: theme.palette.mode === "dark" ? "#66B2FF" : "#1976d2" },
        links: {
          color: theme.palette.mode === "dark" ? "#66B2FF" : "#1976d2",
          distance: 150,
          enable: true,
          opacity: 0.4,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: { default: "bounce" },
          random: false,
          speed: 1.5,
          straight: false,
        },
        number: {
          density: { enable: true, area: 800 },
          value: 80,
        },
        opacity: { value: 0.5 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 3 } },
      },
      detectRetina: true,
    }),
    [theme.palette.mode],
  );

  return (
    <Box sx={{ minHeight: "100vh", pb: 8 }}>
      {/* KUTIB OLISH QISMI (HERO SECTION) */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          bgcolor: "background.default",
          pt: { xs: 12, md: 12 },
          pb: { xs: 10, md: 10 },
          mb: 6,
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          minHeight: "91vh",
        }}
      >
        {/* 🌟 PARTICLES EKRANGA CHIZILYAPTI (Absolute bilan faqat shu Box ichida) */}
        {init && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 0,
            }}
          >
            <Particles
              id="tsparticles"
              options={particlesOptions}
              style={{ width: "100%", height: "100%" }}
            />
          </Box>
        )}

        {/* ASOSIY MATNLAR VA TUGMALAR */}
        <Container
          maxWidth="md"
          sx={{ position: "relative", zIndex: 1, pointerEvents: "none" }}
        >
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              px: 2,
              py: 0.75,
              mb: 4,
              borderRadius: "50px",
              border: "1px solid",
              borderColor: "divider",
              bgcolor: "background.paper",
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "text.secondary",
              boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
            }}
          >
            <Box
              component="span"
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: "primary.main",
                mr: 1.5,
                display: "inline-block",
                boxShadow: "0 0 8px rgba(25,118,210,0.8)",
              }}
            />
            Zamonaviy IT Platforma
          </Box>

          <Typography
            variant="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "2.75rem", sm: "3.5rem", md: "4.5rem" },
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              mb: 3,
              color: "text.primary",
            }}
          >
            Texnologiyalar olamiga{" "}
            <Box
              component="span"
              sx={{
                background: (theme) =>
                  theme.palette.mode === "dark"
                    ? "linear-gradient(90deg, #66B2FF 0%, #007FFF 100%)"
                    : "linear-gradient(90deg, #007FFF 0%, #004C99 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              professional nigoh
            </Box>
          </Typography>

          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              mb: 5,
              fontWeight: 400,
              lineHeight: 1.6,
              fontSize: { xs: "1.1rem", md: "1.25rem" },
              maxWidth: "700px",
              mx: "auto",
            }}
          >
            Kompyuter savodxonligidan tortib, chuqur dasturlash sirlari va
            apparat ta'minotigacha. Fikrlang, o'qing va so'nggi texnologiyalar
            bilan hamnafas bo'ling.
          </Typography>
        </Container>
      </Box>

      {/* MAQOLALAR SETKASI (GRID) */}
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: "bold",
            borderBottom: 2,
            borderColor: "primary.main",
            display: "inline-block",
            pb: 1,
            mb: 4,
          }}
        >
          So'nggi Maqolalar
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            <CircularProgress />
          </Box>
        ) : articles.length === 0 ? (
          <Typography textAlign="center" color="text.secondary" variant="h6">
            Hali maqolalar qo'shilmagan...
          </Typography>
        ) : (
          <Grid container spacing={4}>
            {articles.map((article) => (
              <Grid key={article._id} size={{ xs: 12, sm: 6, md: 4 }}>
                <ArticleCard article={article} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
