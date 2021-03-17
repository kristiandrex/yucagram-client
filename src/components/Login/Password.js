import React, { useRef } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import Layout from "./Layout";

export default function Password() {
  const ref = useRef(null);

  const handleOnSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Helmet>
        <title>Recuperar contraseña - Yucagram</title>
      </Helmet>
      <Layout>
        <h4 className="text-center">¿Olvidaste la contraseña?</h4>
        <hr />
        <form onSubmit={handleOnSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Correo electrónico"
              aria-label="Correo electrónico"
              ref={ref}
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
      </Layout>
    </>
  );
}
