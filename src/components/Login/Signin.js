import React, { useState } from "react";
import { Link } from "wouter";
import { useDispatch } from "react-redux";
import { Helmet } from "react-helmet-async";
import { useFormik } from "formik";
import LoginLayout from "components/Login/LoginLayout";
import { signin } from "actions/auth";
import request from "util/request";
import { validateSignin as validate } from "util/validate";

const initialValues = {
  username: "",
  password: ""
};

function Signin() {
  const dispatch = useDispatch();
  const [serverError, setServerError] = useState({
    show: false,
    message: ""
  });

  const {
    handleSubmit,
    handleChange,
    setSubmitting,
    values,
    errors,
    isSubmitting
  } = useFormik({
    initialValues,
    onSubmit: (values) => {
      setServerError({ show: false, message: "" });

      request
        .post("/signin", values)
        .then((response) => dispatch(signin(response.data)))
        .catch((error) => {
          const { status } = error.response;
          setSubmitting(false);
          setServerError({
            show: true,
            message:
              status === 400
                ? "El usuario y la contraseña no coinciden."
                : "Hubo un error, intenta más tarde."
          });
        });
    },
    validate
  });

  return (
    <LoginLayout>
      <Helmet>
        <title>Iniciar sesión - Yucagram</title>
      </Helmet>
      <form noValidate onSubmit={handleSubmit}>
        {serverError.show && (
          <div className="alert alert-danger text-center" role="alert">
            {serverError.message}
          </div>
        )}
        <div className="form-group">
          <input
            type="text"
            name="username"
            placeholder="Nombre de usuario"
            className={
              errors.username ? "form-control is-invalid" : "form-control"
            }
            aria-label="Nombre de usuario"
            onChange={handleChange}
            value={values.username}
            required
          />
          {errors.username && (
            <span className="invalid-feedback">{errors.username}</span>
          )}
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            className={
              errors.password ? "form-control is-invalid" : "form-control"
            }
            aria-label="Contraseña"
            onChange={handleChange}
            value={values.password}
            required
          />
          {errors.password && (
            <span className="invalid-feedback">{errors.password}</span>
          )}
        </div>
        <button
          className="btn btn-primary btn-block"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Cargando..." : "Iniciar sesión"}
        </button>
        <div className="btn-group btn-block mt-3">
          <Link className="btn btn-link btn-sm" to="/password">
            ¿Olvidaste la contraseña?
          </Link>
          <Link className="btn btn-link btn-sm" to="/signup">
            Regístrate
          </Link>
        </div>
      </form>
    </LoginLayout>
  );
}

export default Signin;
