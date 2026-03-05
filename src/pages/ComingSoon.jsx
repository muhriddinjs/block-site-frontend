import { Box, Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import ConstructionIcon from "@mui/icons-material/Construction";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// Bu sahifa "title" va "message" degan o'zgaruvchilarni qabul qilib oladi
export default function ComingSoon({ title, message }) {
  return (
    <Box
      sx={{
        minHeight: "91vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        bgcolor: "background.default",
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        {/* Aylanib turuvchi yoki yonib turuvchi Ikonka effekti */}
        <Box
          sx={{
            display: "inline-flex",
            p: 3,
            borderRadius: "50%",
            bgcolor: "primary.main",
            color: "white",
            mb: 4,
            boxShadow: "0 10px 30px rgba(25,118,210,0.4)",
          }}
        >
          <ConstructionIcon sx={{ fontSize: "4rem" }} />
        </Box>

        {/* Sarlavha (Katta va gradientli) */}
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 800,
            mb: 2,
            fontSize: { xs: "2.5rem", md: "3.5rem" },
            background: (theme) =>
              theme.palette.mode === "dark"
                ? "linear-gradient(90deg, #66B2FF 0%, #007FFF 100%)"
                : "linear-gradient(90deg, #007FFF 0%, #004C99 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {title}
        </Typography>

        {/* Matn (Props orqali keladi) */}
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ mb: 5, lineHeight: 1.6, fontWeight: 400 }}
        >
          {message}
        </Typography>

        {/* Orqaga qaytish tugmasi */}
        <Button
          component={Link}
          to="/"
          variant="outlined"
          size="large"
          startIcon={<ArrowBackIcon />}
          sx={{
            borderRadius: "12px",
            px: 4,
            py: 1.5,
            fontWeight: "bold",
            textTransform: "none",
            fontSize: "1.05rem",
            borderColor: "divider",
            color: "text.primary",
            "&:hover": { bgcolor: "action.hover" },
          }}
        >
          Bosh sahifaga qaytish
        </Button>
      </Container>
    </Box>
  );
}
