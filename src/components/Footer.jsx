import {
  Box,
  Container,
  Typography,
  IconButton,
  Link as MuiLink,
} from "@mui/material";
import { Link } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";
import CodeIcon from "@mui/icons-material/Code";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "background.paper",
        py: { xs: 6, md: 6 },
        borderTop: 1,
        borderColor: "divider",
        // Bu kod Footer doim ekranning eng pastida turishini ta'minlaydi
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            gap: 6,
          }}
        >
          {/* CHAP QISM: Logotip va qisqacha ta'rif */}
          <Box sx={{ maxWidth: "400px" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
                mb: 2,
              }}
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
                }}
              >
                <CodeIcon fontSize="small" />
              </Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 800, letterSpacing: "-0.5px" }}
              >
                IT-Savodxonlik
              </Typography>
            </Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ lineHeight: 1.6, mb: 3 }}
            >
              Kompyuter savodxonligidan tortib, eng ilg'or
              veb-texnologiyalargacha. Biz bilan birga o'rganing, fikrlang va IT
              olamida o'z o'rningizni toping.
            </Typography>
          </Box>

          {/* O'RTA QISM: Sayt xaritasi (Havolalar) */}
          <Box sx={{ display: "flex", gap: { xs: 4, sm: 10 } }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 700, mb: 1, color: "text.primary" }}
              >
                Platforma
              </Typography>
              <MuiLink
                component={Link}
                to="/"
                color="text.secondary"
                underline="hover"
                sx={{ fontSize: "0.9rem" }}
              >
                Maqolalar
              </MuiLink>
              <MuiLink
                component={Link}
                to="/darslar"
                color="text.secondary"
                underline="hover"
                sx={{ fontSize: "0.9rem" }}
              >
                Darslar
              </MuiLink>
              <MuiLink
                component={Link}
                to="/loyihalar"
                color="text.secondary"
                underline="hover"
                sx={{ fontSize: "0.9rem" }}
              >
                Loyihalar
              </MuiLink>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 700, mb: 1, color: "text.primary" }}
              >
                Qo'shimcha
              </Typography>
              <MuiLink
                component={Link}
                to="/admin"
                color="text.secondary"
                underline="hover"
                sx={{ fontSize: "0.9rem" }}
              >
                Boshqaruv Paneli
              </MuiLink>
              <MuiLink
                href="#"
                color="text.secondary"
                underline="hover"
                sx={{ fontSize: "0.9rem" }}
              >
                Biz haqimizda
              </MuiLink>
              <MuiLink
                href="#"
                color="text.secondary"
                underline="hover"
                sx={{ fontSize: "0.9rem" }}
              >
                Aloqa
              </MuiLink>
            </Box>
          </Box>
        </Box>

        {/* PASTKI QISM: Copyright va Ijtimoiy tarmoqlar */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            mt: 6,
            pt: 3,
            borderTop: 1,
            borderColor: "divider",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} IT-Savodxonlik. Barcha huquqlar
            himoyalangan.
          </Typography>

          <Box sx={{ display: "flex", gap: 1, mt: { xs: 2, sm: 0 } }}>
            <IconButton
              color="inherit"
              sx={{
                color: "text.secondary",
                "&:hover": { color: "#0088cc", bgcolor: "transparent" },
              }}
            >
              <TelegramIcon />
            </IconButton>
            <IconButton
              color="inherit"
              sx={{
                color: "text.secondary",
                "&:hover": { color: "text.primary", bgcolor: "transparent" },
              }}
            >
              <GitHubIcon />
            </IconButton>
            <IconButton
              color="inherit"
              sx={{
                color: "text.secondary",
                "&:hover": { color: "#1DA1F2", bgcolor: "transparent" },
              }}
            >
              <TwitterIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
