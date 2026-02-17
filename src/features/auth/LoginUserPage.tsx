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
  Grid,
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
  }, [user]);

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
      if (error.code === "auth/user-not-found") {
        setErrors({ email: "Email no registrado" });
      }
      if (error.code === "auth/wrong-password") {
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
    <>
      <Box className="main-login-box">
        <Container className="login-container">
          <Avatar sx={{ mx: "auto", bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Ingrese usuario
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
              <Box onSubmit={handleSubmit} component="form" sx={{ mt: 1 }}>
                <TextField
                  sx={{
                    mb: 3,
                    backgroundColor: "ButtonShadow",
                    borderRadius: "5px",
                  }}
                  fullWidth
                  label="@Email"
                  id="email"
                  type="text"
                  placeholder="Ingrese email"
                  value={values.email}
                  onChange={handleChange}
                  name="email"
                  onBlur={handleBlur}
                  error={errors.email && touched.email}
                  helperText={errors.email && touched.email && errors.email}
                />
                <div className="d-flex align-items-center justify-content-end">
                  <TextField
                    sx={{
                      backgroundColor: "ButtonShadow",
                      borderRadius: "5px",
                    }}
                    fullWidth
                    label="Contraseña"
                    id="password"
                    type={showPsw ? "text" : "password"}
                    placeholder="Ingrese contraseña"
                    value={values.password}
                    onChange={handleChange}
                    name="password"
                    onBlur={handleBlur}
                    error={errors.password && touched.password}
                    helperText={
                      errors.password && touched.password && errors.password
                    }
                  />
                  <div
                    className="password-visibility-toggle"
                    onClick={() => setShowPsw(!showPsw)}
                  >
                    {showPsw ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </div>
                </div>
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
                <Grid container>
                  <Grid item xs>
                    <Button component={Link} to="/create" color="warning">
                      Hola, Registrate con nosotros
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default LoginUserPage;
