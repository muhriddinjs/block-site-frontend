import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Button,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function ArticleCard({ article }) {
  // Matn ichidagi HTML teglarni tozalab, faqat toza yozuvni o'zini ajratib oladigan funksiya (ReactQuill dan qolgan teglarni yashirish uchun)
  const stripHtml = (html) => {
    let tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const plainText = stripHtml(article.content);

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "0.3s",
        "&:hover": { transform: "translateY(-5px)", boxShadow: 6 },
      }}
    >
      {/* Maqola rasmi */}
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="200"
          image={
            article.imageUrl ||
            "https://via.placeholder.com/800x400?text=IT+Savodxonlik"
          }
          alt={article.title}
        />
        {/* Kategoriya yorlig'i */}
        <Chip
          label={article.category || "Umumiy"}
          color="primary"
          size="small"
          sx={{ position: "absolute", top: 10, right: 10, fontWeight: "bold" }}
        />
      </Box>

      {/* Maqola matni qismi */}
      <CardContent
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <Typography
          component={Link}
          to={`/article/${article._id}`}
          gutterBottom
          variant="h6"
        //   component="h2"
          sx={{ fontWeight: "bold", lineHeight: 1.3, mb: 2, color: "black", textDecoration: "none" }}
        >
          {article.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2, flexGrow: 1 }}
        >
          {plainText.length > 120
            ? plainText.substring(0, 120) + "..."
            : plainText}
        </Typography>

        {/* Teglar */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 2 }}>
          {article.tags &&
            article.tags.map((tag) =>
              tag ? (
                <Chip
                  key={tag}
                  label={`#${tag}`}
                  size="small"
                  variant="outlined"
                />
              ) : null,
            )}
        </Box>

        {/* Ko'rishlar va Batafsil tugmasi */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: "auto",
            pt: 2,
            borderTop: 1,
            borderColor: "divider",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: "text.secondary",
              fontSize: "0.875rem",
            }}
          >
            <VisibilityIcon sx={{ fontSize: 18, mr: 0.5 }} />
            {article.views || 0}
          </Box>
          <Button
            component={Link}
            to={`/article/${article._id}`}
            variant="contained"
            size="small"
            color="primary"
            sx={{ fontWeight: "bold", borderRadius: 2 }}
          >
            Batafsil
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
