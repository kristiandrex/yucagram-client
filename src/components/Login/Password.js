import React from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import LoginLayout from "./LoginLayout";

export default function Password() {
  const handleOnSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Helmet>
        <title>Recuperar contraseña - Yucagram</title>
      </Helmet>
      <LoginLayout>
        <form noValidate onSubmit={handleOnSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Correo electrónico"
              aria-label="Correo electrónico"
            />
          </div>
          <button className="btn btn-primary btn-block">
            Recuperar contraseña
          </button>
        </form>
        <div className="btn-group btn-block mt-3">
          <Link className="btn btn-link btn-sm" to="/signin">
            Iniciar sesión
          </Link>
          <Link className="btn btn-link btn-sm" to="/signup">
            Regístrate
          </Link>
        </div>
      </LoginLayout>
    </>
  );
}
