import { useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { Helmet } from "react-helmet-async";
import LoginLayout from "components/Login/LoginLayout";
import request from "util/request";
import { signup } from "actions/auth";
import { validateSignup as validate } from "util/validate";

const initialValues = {
  username: "",
  email: "",
  password: ""
};

export default function Signup() {
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);

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
      request({ method: "post", url: "/signup", data: values })
        .then((response) => dispatch(signup(response.data)))
        .catch((error) => {
          setSubmitting(false);
          setShowAlert(true);
          console.error(error);
        });
    },
    validate,
    validateOnChange: false
  });

  return (
    <LoginLayout>
      <Helmet>
        <title>Registrarse - Yucagram</title>
      </Helmet>
      <form onSubmit={handleSubmit} className="text-center" noValidate>
        {showAlert && (
          <div className="alert alert-danger text-center" role="alert">
            Hubo un error, intenta más tarde.
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
            onChange={handleChange}
            value={values.username}
            aria-label="Nombre de usuario"
            required
          />
          {errors.username && (
            <div className="invalid-feedback d-block">{errors.username}</div>
          )}
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            className={
              errors.email ? "form-control is-invalid" : "form-control"
            }
            onChange={handleChange}
            value={values.email}
            aria-label="Correo electrónico"
            required
          />
          {errors.email && (
            <div className="invalid-feedback d-block">{errors.email}</div>
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
            onChange={handleChange}
            value={values.password}
            aria-label="Contraseña"
            required
          />
          {errors.password && (
            <div className="invalid-feedback d-block">{errors.password}</div>
          )}
        </div>
        <button
          className="btn btn-primary"
          type="submit"
          disabled={isSubmitting}
        >
          Registrarse
        </button>
      </form>
    </LoginLayout>
  );
}
