import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import { Formik } from "formik";
import * as Yup from "yup";

import SuccessCheckmark from "../../shared/components/SuccessCheckmark";
import { resetPassword } from "../../services/firebase";

interface RecoverPasswordFormValues {
  email: string;
}

const RECOVER_COOLDOWN_SECONDS = 30;
const RECOVER_COOLDOWN_KEY = "recover-password-cooldown-until";

const RecoverPassword: React.FC = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);

  useEffect(() => {
    const storedUntil = sessionStorage.getItem(RECOVER_COOLDOWN_KEY);
    if (!storedUntil) return;

    const until = Number(storedUntil);
    if (Number.isNaN(until)) {
      sessionStorage.removeItem(RECOVER_COOLDOWN_KEY);
      return;
    }

    const remainingMs = until - Date.now();
    if (remainingMs > 0) {
      setCooldownSeconds(Math.ceil(remainingMs / 1000));
    } else {
      sessionStorage.removeItem(RECOVER_COOLDOWN_KEY);
    }
  }, []);

  useEffect(() => {
    const previousTitle = document.title;
    const title = "Recuperar contraseña | Huellitas Pet Store";
    const description =
      "Recupera el acceso a tu cuenta de Huellitas Pet Store y recibe un enlace seguro para restablecer tu contraseña.";

    document.title = title;

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }

    const previousDescription = meta.getAttribute("content");
    meta.setAttribute("content", description);

    return () => {
      document.title = previousTitle;
      if (previousDescription) {
        meta?.setAttribute("content", previousDescription);
      }
    };
  }, []);

  useEffect(() => {
    if (!showSuccess) return undefined;
    const timeoutId = setTimeout(() => setShowSuccess(false), 4500);
    return () => clearTimeout(timeoutId);
  }, [showSuccess]);

  useEffect(() => {
    if (cooldownSeconds <= 0) return undefined;
    const intervalId = setInterval(() => {
      setCooldownSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [cooldownSeconds]);

  useEffect(() => {
    if (cooldownSeconds <= 0) {
      sessionStorage.removeItem(RECOVER_COOLDOWN_KEY);
    }
  }, [cooldownSeconds]);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email no válido").required("Email requerido"),
  });

  const onSubmit = async (
    { email }: RecoverPasswordFormValues,
    { setSubmitting, setErrors, resetForm }: any
  ) => {
    try {
      setShowSuccess(false);
      await resetPassword(email.trim());
      resetForm();
      setShowSuccess(true);
      setCooldownSeconds(RECOVER_COOLDOWN_SECONDS);
      sessionStorage.setItem(
        RECOVER_COOLDOWN_KEY,
        String(Date.now() + RECOVER_COOLDOWN_SECONDS * 1000)
      );
    } catch (error) {
      const firebaseError = error as { code?: string };
      if (firebaseError.code === "auth/user-not-found") {
        setErrors({ email: "No encontramos una cuenta con ese correo" });
      } else {
        setErrors({ email: "No fue posible enviar el enlace. Intenta de nuevo" });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="auth-page auth-page--recover" aria-labelledby="recover-title">
      <Container className="auth-page__container">
        <Box className="main-login-box auth-card auth-card--recover">
          <Avatar sx={{ mx: "auto", bgcolor: "warning.main" }} className="auth-card__avatar">
            <MarkEmailReadOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5" id="recover-title" className="auth-card__title">
            Recuperar contraseña
          </Typography>

          <Typography component="p" className="auth-card__subtitle">
            Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.
          </Typography>

          <Formik
            initialValues={{ email: "" }}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {({
              handleChange,
              handleSubmit,
              values,
              isSubmitting,
              errors,
              touched,
              handleBlur,
            }) => (
              <Box onSubmit={handleSubmit} component="form" sx={{ mt: 1 }} className="auth-card__form">
                <TextField
                  sx={{
                    mb: 2,
                    backgroundColor: "rgba(255,255,255,0.82)",
                    borderRadius: "10px",
                  }}
                  fullWidth
                  label="@Email"
                  id="email"
                  autoComplete="email"
                  type="email"
                  placeholder="Ingresa tu correo registrado"
                  value={values.email}
                  onChange={handleChange}
                  name="email"
                  onBlur={handleBlur}
                  error={!!(errors.email && touched.email)}
                  helperText={errors.email && touched.email && errors.email}
                />

                <LoadingButton
                  variant="contained"
                  className="category-buttons"
                  sx={{ mt: 2, mb: 1 }}
                  fullWidth
                  type="submit"
                  disabled={isSubmitting || cooldownSeconds > 0}
                  loading={isSubmitting}
                >
                  {cooldownSeconds > 0
                    ? `Reenviar en ${cooldownSeconds}s`
                    : "Enviar enlace"}
                </LoadingButton>

                {cooldownSeconds > 0 && (
                  <p className="auth-card__hint" aria-live="polite">
                    Podrás solicitar un nuevo enlace cuando termine el contador.
                  </p>
                )}

                {showSuccess && (
                  <div className="mt-3 d-flex justify-content-center">
                    <SuccessCheckmark message="Enlace enviado. Revisa tu correo." size="sm" />
                  </div>
                )}

                <Box sx={{ mt: 2, textAlign: "center" }} className="auth-card__footer-link">
                  <Button component={Link} to="/loginPage" color="inherit">
                    Volver a iniciar sesión
                  </Button>
                </Box>
              </Box>
            )}
          </Formik>
        </Box>
      </Container>
    </main>
  );
};

export default RecoverPassword;
