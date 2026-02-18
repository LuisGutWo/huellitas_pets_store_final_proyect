import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Formik } from "formik";
import * as Yup from "yup";
import { register } from "../../services/firebase";

import { useUserContext } from "../../context/UserContext";
import { useRedirectActiveUser } from "../../hooks/useRedirectActiveUser";

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
import SuccessCheckmark from "../../shared/components/SuccessCheckmark";

interface RegisterFormValues {
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const [showPsw, setShowPsw] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const { user } = useUserContext();

  // hook
  useRedirectActiveUser(user, "/");

  const onSubmit = async (
    { email, password }: RegisterFormValues,
    { setSubmitting, setErrors, resetForm }: any
  ) => {
    try {
      setShowSuccess(false);
      await register({ email, password });
      console.log("usuario registrado");
      resetForm();
      setShowSuccess(true);
    } catch (error) {
      const firebaseError = error as any;
      console.log(firebaseError.code);
      console.log(firebaseError.message);
      if (firebaseError.code === "auth/email-already-in-use") {
        setErrors({ email: "Correo actualmente en uso" });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email no válido").required("Email obligatorio"),
    password: Yup.string()
      .trim()
      .min(6, "Mínimo 6 carácteres")
      .required("Password obligatorio"),
  });

  useEffect(() => {
    if (!showSuccess) return undefined;
    const timeoutId = setTimeout(() => setShowSuccess(false), 3000);
    return () => clearTimeout(timeoutId);
  }, [showSuccess]);

  return (
    <>
      <Box className="main-login-box">
        <Container className="login-container">
          <Avatar sx={{ mx: "auto", bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Crear nuevo usuario
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
                  error={!!(errors.email && touched.email)}
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
                    error={!!(errors.password && touched.password)}
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
                  Crear
                </LoadingButton>
                {showSuccess && (
                  <div className="mt-3 d-flex justify-content-center">
                    <SuccessCheckmark message="Registro exitoso" size="sm" />
                  </div>
                )}
                <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                  <Button component={Link} to="/loginPage" color="inherit">
                    ¿Estas con nosotros? Accede aquí
                  </Button>
                </Box>
              </Box>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Register;
