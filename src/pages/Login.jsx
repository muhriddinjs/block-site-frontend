import { useState } from "react";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  CircularProgress, // Yuklanish uchun
} from "@mui/material";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Yuklanish holati
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token); // 🔑 Tokenni saqlash

        // 🔥 MUHIM: Ba'zida navigate() state yangilanishini kutib qoladi.
        // Shuning uchun window.location.href ishlatish ishonchliroq yoki navigate'dan keyin sahifani refresh qilish kerak.
        window.location.href = "/admin";
      } else {
        setError(data.message || "Login yoki parol xato!");
      }
    } catch (err) {
      setError(
        "Server bilan bog'lanib bo'lmadi. Backend yoniqligini tekshiring.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 20, mb: 20 }}>
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
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <TextField
            fullWidth
            label="Parol"
            type="password"
            margin="normal"
            required
            disabled={loading}
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
