import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useUserContext } from "../../context/UserContext";
import Loading from "../../shared/components/Loading";
import SuccessCheckmark from "../../shared/components/SuccessCheckmark";

import { Formik } from "formik";
import * as Yup from "yup";
import { login } from "../../services/firebase";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import {
  Avatar,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { LoadingButton } from "@mui/lab";
import { Container } from "react-bootstrap";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginUserPage: React.FC = () => {
  const [showPsw, setShowPsw] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    const previousTitle = document.title;
    const title = "Iniciar sesión | Huellitas Pet Store";
    const description =
      "Accede a tu cuenta de Huellitas Pet Store para gestionar favoritos, carrito y compras de productos para mascotas.";

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

  const onSubmit = async (
    { email, password }: LoginFormValues,
    { setSubmitting, setErrors, resetForm }: any
  ) => {
    try {
      setShowSuccess(false);
      const credentialUser = await login({ email, password });
      if (credentialUser) {
        resetForm();
        setShowSuccess(true);
      }
    } catch (error) {
      console.log(error);
      const firebaseError = error as { code: string };
      if (firebaseError.code === "auth/user-not-found") {
        setErrors({ email: "Email no registrado" });
      }
      if (firebaseError.code === "auth/wrong-password") {
        setErrors({ password: "Contraseña incorrecta" });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email no válido").required("Email requerido"),
    password: Yup.string()
      .trim()
      .min(6, "Mínimo 6 caracteres")
      .required("Contraseña requerida"),
  });

  useEffect(() => {
    if (!showSuccess) return undefined;
    const timeoutId = setTimeout(() => setShowSuccess(false), 3000);
    return () => clearTimeout(timeoutId);
  }, [showSuccess]);

  if (user) return <Loading />;

  return (
    <main className="auth-page auth-page--login" aria-labelledby="login-title">
      <Container className="auth-page__container">
        <Box className="main-login-box auth-card">
          <Avatar sx={{ mx: "auto", bgcolor: "primary.main" }} className="auth-card__avatar">
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" id="login-title" className="auth-card__title">
            Ingrese usuario
          </Typography>
          <Typography component="p" className="auth-card__subtitle">
            Accede a tu cuenta para continuar con tus compras y favoritos.
          </Typography>
          <Formik
            initialValues={{ email: "", password: "" }}
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
                    mb: 3,
                    backgroundColor: "rgba(255,255,255,0.82)",
                    borderRadius: "10px",
                  }}
                  fullWidth
                  label="@Email"
                  id="email"
                  autoComplete="email"
                  type="text"
                  placeholder="Ingrese email"
                  value={values.email}
                  onChange={handleChange}
                  name="email"
                  onBlur={handleBlur}
                  error={!!(errors.email && touched.email)}
                  helperText={errors.email && touched.email && errors.email}
                />
                <div className="d-flex align-items-center justify-content-end">
                  <TextField
                    sx={{
                      backgroundColor: "rgba(255,255,255,0.82)",
                      borderRadius: "10px",
                    }}
                    fullWidth
                    label="Contraseña"
                    id="password"
                    autoComplete="current-password"
                    type={showPsw ? "text" : "password"}
                    placeholder="Ingrese contraseña"
                    value={values.password}
                    onChange={handleChange}
                    name="password"
                    onBlur={handleBlur}
                    error={!!(errors.password && touched.password)}
                    helperText={
                      errors.password && touched.password && errors.password
                    }
                  />
                  <button
                    type="button"
                    className="password-visibility-toggle"
                    onClick={() => setShowPsw(!showPsw)}
                    aria-label={showPsw ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showPsw ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </button>
                </div>

                <Box sx={{ mt: 1, textAlign: "right" }} className="auth-card__inline-link">
                  <Button component={Link} to="/recover-password" color="inherit" size="small">
                    ¿Olvidaste tu contraseña?
                  </Button>
                </Box>

                <LoadingButton
                  variant="contained"
                  className="category-buttons"
                  sx={{
                    mt: 3,
                    mb: 2,
                  }}
                  fullWidth
                  type="submit"
                  disabled={isSubmitting}
                  loading={isSubmitting}
                >
                  Acceder
                </LoadingButton>
                {showSuccess && (
                  <div className="mt-3 d-flex justify-content-center">
                    <SuccessCheckmark message="Login exitoso" size="sm" />
                  </div>
                )}
                <Box sx={{ mt: 2, textAlign: "center" }} className="auth-card__footer-link">
                  <Button component={Link} to="/create" color="warning">
                    Hola, Registrate con nosotros
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

export default LoginUserPage;
