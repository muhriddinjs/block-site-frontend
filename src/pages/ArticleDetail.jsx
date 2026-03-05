import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Chip,
  Button,
  CircularProgress,
  Divider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function ArticleDetail() {
  const { id } = useParams(); // URL dagi id ni ushlab olamiz
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sahifa ochilishi bilan backend'dan aynan shu id ga tegishli maqolani so'raymiz
  useEffect(() => {
    fetch(`${API_URL}/articles/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setArticle(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Xatolik:", err);
        setLoading(false);
      });
  }, [id]);

  // Agar ma'lumot hali yetib kelmagan bo'lsa
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Agar id xato bo'lsa yoki maqola o'chirib tashlangan bo'lsa
  if (!article || article.message) {
    return (
      <Box sx={{ textAlign: "center", py: 10 }}>
        <Typography variant="h4" color="error" fontWeight="bold">
          Maqola topilmadi 🚫
        </Typography>
        <Button component={Link} to="/" sx={{ mt: 3 }} variant="outlined">
          Bosh sahifaga qaytish
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", pb: 10 }}>
      {/* 1. TEPADAGI MUQOVA RASMI (Cover Image) */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: "300px", md: "400px" },
          backgroundImage: `url(${article.imageUrl || "https://via.placeholder.com/1200x600?text=IT+Savodxonlik"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          // Rasm ustidan tushadigan qora qoplama (gradient)
          "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.95) 100%)",
          },
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            height: "100%",
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            pb: { xs: 6, md: 8 },
          }}
        >
          <Box>
            <Chip
              label={article.category || "Umumiy"}
              color="primary"
              sx={{
                fontWeight: "bold",
                mb: 2,
                borderRadius: "8px",
                fontSize: "0.9rem",
              }}
            />
            <Typography
              variant="h2"
              component="h1"
              sx={{
                color: "white",
                fontWeight: 800,
                fontSize: { xs: "2rem", md: "3.5rem" },
                lineHeight: 1.2,
                mb: 3,
                letterSpacing: "-1px",
              }}
            >
              {article.title}
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 4,
                color: "rgba(255,255,255,0.7)",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CalendarTodayIcon fontSize="small" />
                <Typography variant="body1">
                  {new Date(article.publishedDate).toLocaleDateString()}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <VisibilityIcon fontSize="small" />
                <Typography variant="body1">
                  {article.views} marta o'qildi
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* 2. MAQOLANING ASOSIY MATNI (Overlap dizayn) */}
      {/* "mt: -5" bu matnni qutisini tepadagi rasmning ustiga biroz chiqarib qo'yadi */}
      <Container
        maxWidth="md"
        sx={{ mt: { xs: -3, md: -5 }, position: "relative", zIndex: 2 }}
      >
        <Box
          sx={{
            bgcolor: "background.paper",
            p: { xs: 3, sm: 5, md: 7 },
            borderRadius: "24px",
            boxShadow: (theme) =>
              theme.palette.mode === "light"
                ? "0 10px 40px rgba(0,0,0,0.08)"
                : "0 10px 40px rgba(0,0,0,0.5)",
          }}
        >
          <Button
            component={Link}
            to="/"
            startIcon={<ArrowBackIcon />}
            sx={{
              mb: 5,
              textTransform: "none",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
          >
            Barcha maqolalarga qaytish
          </Button>

          {/* MATN QISMI (ReactQuill html formatini to'g'ri ko'rsatish uchun) */}
          <Box
            dangerouslySetInnerHTML={{ __html: article.content }}
            sx={{
              fontSize: "1.15rem",
              lineHeight: 1.8,
              color: "text.primary",

              // 🌟 MATN TOSHIB KETMASLIGI UCHUN QUTQARUVCHI KODLAR 🌟
              wordBreak: "break-word",
              overflowWrap: "break-word",
              width: "100%",
              overflow: "hidden",

              // ReactQuill qo'shadigan HTML teglarga avtomatik uslub:
              "& p": { mb: 3, whiteSpace: "pre-wrap" }, // pre-wrap so'zlarni joyiga soladi
              "& h1, & h2, & h3": {
                color: "text.primary",
                fontWeight: "bold",
                mt: 5,
                mb: 2,
                lineHeight: 1.3,
                wordBreak: "break-word",
              },
              "& img": {
                maxWidth: "100%",
                borderRadius: "12px",
                my: 3,
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              },
              "& pre": {
                bgcolor: (theme) =>
                  theme.palette.mode === "dark" ? "#1e1e1e" : "#f5f5f5",
                p: 3,
                borderRadius: "12px",
                overflowX: "auto", // Kod uzun bo'lsa gorizontal skroll chiqadi
                border: "1px solid",
                borderColor: "divider",
                whiteSpace: "pre-wrap",
              },
              "& code": {
                fontFamily: "monospace",
                color: "primary.main",
                fontWeight: "bold",
              },
              "& a": {
                color: "primary.main",
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              },
              "& blockquote": {
                borderLeft: "4px solid",
                borderColor: "primary.main",
                pl: 2,
                ml: 0,
                fontStyle: "italic",
                color: "text.secondary",
              },
            }}
          />

          <Divider sx={{ my: 5 }} />

          {/* TEGLAR QISMI */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ mr: 1, fontWeight: "bold" }}
            >
              Teglar:
            </Typography>
            {article.tags &&
              article.tags.map((tag) =>
                tag ? (
                  <Chip
                    key={tag}
                    label={`#${tag}`}
                    variant="outlined"
                    sx={{ fontWeight: 500 }}
                  />
                ) : null,
              )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
