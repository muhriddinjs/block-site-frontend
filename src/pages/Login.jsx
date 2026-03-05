import { useState } from "react";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

// 🌍 .env dan API manzilini olamiz
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 🔗 API_URL oxirida /api borligiga ishonch hosil qiling
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      // Avval response statusini tekshiramiz
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Login yoki parol xato!");
      }

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token); // 🔑 Tokenni saqlash

        // ✅ Vercel-da 404 chiqmasligi uchun navigate ishlatish tavsiya etiladi
        // Lekin undan oldin vercel.json faylini yaratgan bo'lishingiz shart!
        navigate("/admin");

        // Agar baribir muammo bo'lsa, pastdagi qatorni ishlating:
        // window.location.href = "/admin";
      }
    } catch (err) {
      console.error("Login xatosi:", err);
      setError(err.message || "Server bilan bog'lanib bo'lmadi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 10, mb: 10 }}>
      <Paper
        elevation={3}
        sx={{ p: 4, borderRadius: 3, backdropFilter: "blur(10px)" }}
      >
        <Typography variant="h5" textAlign="center" fontWeight="bold" mb={3}>
          Admin Panelga Kirish
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Login"
            margin="normal"
            required
            disabled={loading}
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <TextField
            fullWidth
            label="Parol"
            type="password"
            margin="normal"
            required
            disabled={loading}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <Button
            fullWidth
            variant="contained"
            type="submit"
            disabled={loading}
            sx={{ mt: 3, py: 1.5, fontWeight: "bold" }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Kirish"
            )}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
