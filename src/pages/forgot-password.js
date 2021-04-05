import { useCallback, useState } from "react";
import { Helmet } from "react-helmet-async";
import LoginLayout from "components/Login/LoginLayout";
import request from "util/request";

function ForgotPassword() {
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "" });
  const [success, setSuccess] = useState(false);

  const handleOnSubmit = useCallback((event) => {
    event.preventDefault();
    const email = event.target.email.value;
    setSubmitting(true);

    request({ method: "post", url: "/forgot-password", data: { email } })
      .then(() => setSuccess(true))
      .catch((error) =>
        setAlert({ show: true, message: error.response.data.message })
      )
      .finally(() => setSubmitting(false));
  }, []);

  if (success) {
    return (
      <div>
        <h1 className="text-center">
          El enlace de recuperación fue enviado al correo.
        </h1>
      </div>
    );
  }

  return (
    <LoginLayout>
      {alert.show && (
        <div className="alert alert-danger" role="alert">
          {alert.message}
        </div>
      )}
      <form onSubmit={handleOnSubmit} noValidate>
        <div className="form-group">
          <input
            type="email"
            name="email"
            className={"form-control"}
            placeholder="Correo electrónico"
            aria-label="Correo electrónico"
          />
        </div>
        <button className="btn btn-primary" disabled={submitting}>
          Recuperar contraseña
        </button>
      </form>
    </LoginLayout>
  );
}

function ForgotPasswordHelmet() {
  return (
    <>
      <Helmet>
        <title>¿Olvidaste la contraseña? - Yucagram</title>
      </Helmet>
      <ForgotPassword />
    </>
  );
}

export default ForgotPasswordHelmet;
