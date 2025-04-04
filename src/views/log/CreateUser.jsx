import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Formik } from "formik";
import * as Yup from "yup";
import { register } from "../../config/firebase";

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

const Register = () => {
  const [showPsw, setShowPsw] = useState(false);

  const { user } = useUserContext();

  // hook
  useRedirectActiveUser(user, "/");

  const onSubmit = async (
    { email, password },
    { setSubmitting, setErrors, resetForm }
  ) => {
    try {
      await register({ email, password });
      console.log("usuario registrado");
      resetForm();
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
      if (error.code === "auth/email-already-in-use") {
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
                    style={{ position: "absolute", marginRight: 8 }}
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
                <Grid container>
                  <Grid item xs>
                    <Button component={Link} to="/loginPage" color="inherit">
                      ¿Estas con nosotros? Accede aquí
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

export default Register;
