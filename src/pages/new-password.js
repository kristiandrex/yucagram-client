import { useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import { isEmail, isEmpty } from "validator";
import { Helmet } from "react-helmet-async";
import LoginLayout from "components/Login/LoginLayout";
import request from "util/request";
import Loading from "components/UI/Loading";

const initialValues = {
  email: "",
  password: "",
  repeat: ""
};

function NewPassword() {
  const [invalid, setInvalid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [success, setSucess] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "" });

  const token = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("token");
  }, []);

  const {
    handleSubmit,
    handleChange,
    setSubmitting,
    values,
    errors,
    isSubmitting
  } = useFormik({
    onSubmit: (values) => {
      request({
        method: "post",
        url: "/new-password",
        headers: { authorization: `Bearer ${token}` },
        data: values
      })
        .then(() => {
          setSucess(true);
        })
        .catch((error) => {
          setAlert({
            show: true,
            message: error.response.data.message
          });
        })
        .finally(() => setSubmitting(false));
    },
    initialValues,
    validate: (values) => {
      const errors = {};

      if (!isEmail(values.email)) {
        errors.email = "El correo no es válido.";
      }

      if (isEmpty(values.password)) {
        errors.password = "Este campo es requerido.";
      }

      if (isEmpty(values.repeat)) {
        errors.repeat = "Este campo es requerido.";
      }

      if (values.password !== values.repeat) {
        errors.password = errors.repeat = "Las contraseñas no coinciden";
      }

      return errors;
    }
  });

  useEffect(() => {
    request({
      method: "get",
      url: "/new-password",
      headers: { authorization: `Bearer ${token}` }
    })
      .catch((error) => {
        setInvalid(true);
        console.error(error);
      })
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) {
    return <Loading />;
  }

  if (invalid) {
    return (
      <div className="text-center">
        <h1>Enlace de recuperación inválido</h1>
        <p>Es posible que este enlace de recuperación ya haya caducado.</p>
      </div>
    );
  }

  if (success) {
    return <h1 className="text-center">Contraseña cambiada correctamente.</h1>;
  }

  return (
    <LoginLayout>
      {alert.show && (
        <div className="alert alert-danger" role="alert">
          {alert.message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="text-center">
        <div className="form-group">
          <input
            type="email"
            name="email"
            className={
              errors.email ? "is-invalid form-control" : "form-control"
            }
            value={values.email}
            onChange={handleChange}
            placeholder="Correo electrónico"
            aria-label="Escribe el correo electrónico"
          />
          {errors.email && (
            <span className="invalid-feedback">{errors.email}</span>
          )}
        </div>
        <div className="form-group">
          <input
            value={values.password}
            onChange={handleChange}
            type="password"
            name="password"
            className={
              errors.password ? "form-control is-invalid" : "form-control"
            }
            placeholder="Nueva contraseña"
            aria-label="Escribe la nueva contraseña"
          />
          {errors.password && (
            <span className="invalid-feedback">{errors.password}</span>
          )}
        </div>
        <div className="form-group">
          <input
            type="password"
            name="repeat"
            value={values.repeat}
            onChange={handleChange}
            className={
              errors.repeat ? "form-control is-invalid" : "form-control"
            }
            placeholder="Nueva contraseña"
            aria-label="Repite la nueva contraseña"
          />
          {errors.repeat && (
            <span className="invalid-feedback">{errors.repeat}</span>
          )}
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          Cambiar contraseña
        </button>
      </form>
    </LoginLayout>
  );
}

function NewPasswordHelmet() {
  return (
    <>
      <Helmet>
        <title>Cambiar contraseña - Yucagram</title>
      </Helmet>
      <NewPassword />
    </>
  );
}

export default NewPasswordHelmet;
