import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  MenuItem,
  Chip,
  Tooltip,
  Snackbar,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";

import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function Admin() {
  const [articles, setArticles] = useState([]);

  // Yangi formamiz state'lari
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("Dasturlash");
  const [editId, setEditId] = useState(null);

  // ZAMONAVIY ALERT (Snackbar) state'lari
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const categories = [
    "Dasturlash",
    "Kiberxavfsizlik",
    "Sun'iy intellekt",
    "Boshlang'ich tushunchalar",
    "Umumiy",
  ];

  // Xabarlarni ko'rsatish funksiyasi
  const showMessage = (message, severity = "info") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar({ ...snackbar, open: false });
  };

  // 🔑 Tokenni olish funksiyasi
  const getToken = () => localStorage.getItem("token");

  // Maqolalarni bazadan tortib olish
  useEffect(() => {
    fetch(`${API_URL}/articles`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setArticles(data);
        } else {
          setArticles([]);
        }
      })
      .catch((err) => {
        console.error("Xatolik:", err);
        showMessage("Server bilan aloqa yo'q!", "error");
      });
  }, []);

  // Logout funksiyasi
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  // Saqlash (POST yoki PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const articleData = {
      title,
      content,
      imageUrl,
      category,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ""),
    };

    const token = getToken();

    try {
      const url = editId
        ? `http://localhost:5000/api/articles/${editId}`
        : "http://localhost:5000/api/articles";

      const method = editId ? "PUT" : "POST";

      const res = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 🛡️ Tokenni yuborish
        },
        body: JSON.stringify(articleData),
      });

      if (res.ok) {
        const result = await res.json();
        if (editId) {
          setArticles(
            articles.map((art) => (art._id === editId ? result : art)),
          );
          showMessage("Maqola tahrirlandi! ✏️", "success");
        } else {
          setArticles([result, ...articles]);
          showMessage("Yangi maqola nashr qilindi! 🚀", "success");
        }
        resetForm();
      } else if (res.status === 401) {
        showMessage("Sessiya muddati tugagan! Qayta kiring.", "error");
        handleLogout();
      }
    } catch (err) {
      showMessage("Xatolik yuz berdi!", "error");
    }
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setTags("");
    setImageUrl("");
    setCategory("Dasturlash");
    setEditId(null);
  };

  // O'chirish (DELETE)
  const handleDelete = async (id) => {
    if (!window.confirm("Rostdan ham bu maqolani o'chirmoqchimisiz?")) return;

    const token = getToken();

    try {
      const res = await fetch(`${API_URL}/articles/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // 🛡️ Tokenni yuborish
        },
      });

      if (res.ok) {
        setArticles(articles.filter((a) => a._id !== id));
        showMessage("Maqola o'chirildi! 🗑️", "info");
      } else if (res.status === 401) {
        showMessage("Ruxsat yo'q! Qayta kiring.", "error");
        handleLogout();
      }
    } catch (err) {
      showMessage("O'chirishda xatolik!", "error");
    }
  };

  const handleEditClick = (article) => {
    setTitle(article.title);
    setContent(article.content);
    setTags(article.tags ? article.tags.join(", ") : "");
    setImageUrl(article.imageUrl || "");
    setCategory(article.category || "Umumiy");
    setEditId(article._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 5,
          pb: 2,
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 800,
            color: "text.primary",
            fontSize: { xs: "2rem", md: "3rem" },
          }}
        >
          Admin Panel
        </Typography>
        <Button
          variant="outlined"
          color="error"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{
            borderRadius: "10px",
            fontWeight: "bold",
            textTransform: "none",
          }}
        >
          Chiqish
        </Button>
      </Box>

      <Paper
        elevation={3}
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: 4,
          mb: 6,
          border: editId ? "2px solid" : "none",
          borderColor: "primary.main",
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, mb: 4, color: "text.primary" }}
        >
          {editId ? "✏️ Maqolani Tahrirlash" : "📝 Yangi Maqola Qo'shish"}
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 3,
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <TextField
              fullWidth
              label="Maqola sarlavhasi"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <TextField
              select
              fullWidth
              label="Kategoriya"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              sx={{ maxWidth: { md: "300px" } }}
            >
              {categories.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <TextField
            fullWidth
            label="Rasm ssilkasi (URL)"
            variant="outlined"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/rasm.jpg"
          />

          <Box
            sx={{
              "& .ql-container": {
                fontSize: "1.1rem",
                borderRadius: "0 0 8px 8px",
                minHeight: "250px",
              },
              "& .ql-toolbar": { borderRadius: "8px 8px 0 0" },
            }}
          >
            <ReactQuill theme="snow" value={content} onChange={setContent} />
          </Box>

          <TextField
            fullWidth
            label="Teglar"
            variant="outlined"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="react, nodejs, web"
          />

          <Box sx={{ display: "flex", gap: 2, pt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color={editId ? "primary" : "success"}
              size="large"
              sx={{
                flex: 1,
                py: 1.5,
                borderRadius: "10px",
                fontWeight: "bold",
              }}
            >
              {editId ? "O'zgarishlarni Saqlash" : "Nashr Qilish 🚀"}
            </Button>
            {editId && (
              <Button
                variant="contained"
                color="inherit"
                size="large"
                onClick={resetForm}
                sx={{ py: 1.5, px: 4, borderRadius: "10px" }}
              >
                Bekor qilish
              </Button>
            )}
          </Box>
        </Box>
      </Paper>

      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
        Maqolalar Ro'yxati
      </Typography>

      <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 4 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: "action.hover" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Sarlavha</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Kategoriya</TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                Ko'rishlar
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "right" }}>
                Amallar
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {articles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  Maqolalar topilmadi.
                </TableCell>
              </TableRow>
            ) : (
              articles.map((article) => (
                <TableRow key={article._id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>
                    {article.title}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={article.category || "Umumiy"}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="center">👁️ {article.views || 0}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      onClick={() => handleEditClick(article)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(article._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ borderRadius: "10px" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
