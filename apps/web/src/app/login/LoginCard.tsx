"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useColorMode } from "../providers";

// ─── Google "G" icon ──────────────────────────────────────────────────────────
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z"
        fill="#4285F4"
      />
      <path
        d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z"
        fill="#34A853"
      />
      <path
        d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332Z"
        fill="#FBBC05"
      />
      <path
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58Z"
        fill="#EA4335"
      />
    </svg>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function LoginCard() {
  const theme = useTheme();
  const { toggle } = useColorMode();
  const router = useRouter();
  const isDark = theme.palette.mode === "dark";

  const [view, setView] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isLogin = view === "login";

  async function handleCredentials(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (isLogin) {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      setLoading(false);
      if (res?.error) {
        setError("Invalid email or password.");
      } else {
        router.push("/");
      }
    } else {
      // Sign up flow — call our API route
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Something went wrong.");
        setLoading(false);
      } else {
        // Auto sign-in after registration
        await signIn("credentials", { email, password, redirect: false });
        setLoading(false);
        router.push("/");
      }
    }
  }

  // ─── Background texture ──────────────────────────────────────────────────
  const bgStyle = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.background.default,
    backgroundImage: isDark
      ? `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.07) 1px, transparent 0)`
      : `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.08) 1px, transparent 0)`,
    backgroundSize: "24px 24px",
    position: "relative" as const,
    p: 2,
  };

  return (
    <Box sx={bgStyle}>
      {/* Dark mode toggle */}
      <IconButton
        onClick={toggle}
        size="small"
        sx={{ position: "absolute", top: 16, right: 16 }}
        aria-label="Toggle color mode"
      >
        {isDark ? (
          <LightModeIcon fontSize="small" />
        ) : (
          <DarkModeIcon fontSize="small" />
        )}
      </IconButton>

      {/* Auth card */}
      <Card
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 360,
          borderRadius: 4,
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: isDark
            ? "0 8px 40px rgba(0,0,0,0.5)"
            : "0 8px 40px rgba(0,0,0,0.10)",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* Title */}
          <Typography
            variant="h4"
            fontWeight={800}
            textAlign="center"
            lineHeight={1.15}
            mb={3}
            sx={{ fontFamily: "var(--font-inter)" }}
          >
            {isLogin ? "Log in to" : "Sign up to"}
            <br />
            AchvMate
          </Typography>

          {/* OAuth buttons */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 2 }}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={<GoogleIcon />}
              onClick={() => signIn("google", { callbackUrl: "/" })}
              sx={{ py: 1.2 }}
              id={isLogin ? "btn-google-login" : "btn-google-signup"}
            >
              {isLogin ? "Log in with Google" : "Sign up with Google"}
            </Button>

            <Button
              fullWidth
              variant="outlined"
              size="large"
              startIcon={<GitHubIcon />}
              onClick={() => signIn("github", { callbackUrl: "/" })}
              sx={{ py: 1.2 }}
              id={isLogin ? "btn-github-login" : "btn-github-signup"}
            >
              {isLogin ? "Log in with GitHub" : "Sign up with GitHub"}
            </Button>
          </Box>

          {/* or divider */}
          <Divider sx={{ my: 2 }}>
            <Typography variant="caption" color="text.secondary">
              or
            </Typography>
          </Divider>

          {/* Credentials form */}
          <Box
            component="form"
            onSubmit={handleCredentials}
            sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
          >
            {error && (
              <Alert severity="error" sx={{ borderRadius: 3 }}>
                {error}
              </Alert>
            )}

            <TextField
              id="input-email"
              label="Email"
              type="email"
              size="small"
              fullWidth
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              id="input-password"
              label="Password"
              type="password"
              size="small"
              fullWidth
              required
              autoComplete={isLogin ? "current-password" : "new-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Footer links */}
            {isLogin ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: -0.5,
                }}
              >
                <Link
                  component="button"
                  type="button"
                  variant="caption"
                  underline="hover"
                  onClick={() => { setView("signup"); setError(""); }}
                  id="link-create-account"
                >
                  Create account
                </Link>
                <Link
                  href="#"
                  variant="caption"
                  underline="hover"
                  id="link-forgot-password"
                >
                  Forgot your password?
                </Link>
              </Box>
            ) : (
              <Typography variant="caption" color="text.secondary" mt={-0.5}>
                Already have an account?{" "}
                <Link
                  component="button"
                  type="button"
                  underline="hover"
                  onClick={() => { setView("login"); setError(""); }}
                  sx={{ fontSize: "inherit" }}
                  id="link-go-to-login"
                >
                  Log in
                </Link>
              </Typography>
            )}

            <Button
              id={isLogin ? "btn-login-submit" : "btn-signup-submit"}
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mt: 0.5, py: 1.2 }}
            >
              {loading ? (
                <CircularProgress size={22} color="inherit" />
              ) : isLogin ? (
                "Log in"
              ) : (
                "Sign up"
              )}
            </Button>

            {!isLogin && (
              <Typography
                variant="caption"
                color="text.secondary"
                textAlign="center"
              >
                By signing up, I agree to the AchvMate{" "}
                <Link href="#" underline="hover" sx={{ fontSize: "inherit" }}>
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link href="#" underline="hover" sx={{ fontSize: "inherit" }}>
                  Terms of Service
                </Link>
                .
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
