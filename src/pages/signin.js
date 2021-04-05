import { useState } from "react";
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
  const [alert, setAlert] = useState({
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
      setAlert({ show: false, message: "" });

      request({ method: "post", url: "/signin", data: values })
        .then((response) => dispatch(signin(response.data)))
        .catch((error) => {
          setSubmitting(false);
          setAlert({
            show: true,
            message: error.response.data.message
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
      <form onSubmit={handleSubmit} className="text-center" noValidate>
        {alert.show && (
          <div className="alert alert-danger text-center" role="alert">
            {alert.message}
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
          className="btn btn-primary"
          type="submit"
          disabled={isSubmitting}
        >
          Iniciar sesión
        </button>
      </form>
    </LoginLayout>
  );
}

export default Signin;
