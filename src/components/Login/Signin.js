import React, { useCallback } from "react";
import { Link } from "wouter";
import { useDispatch } from "react-redux";
import { Helmet } from "react-helmet-async";
import Layout from "components/Login/Layout";
import { signin } from "actions/auth";
import request from "util/request";

function Signin() {
  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      const values = {
        username: event.target.username.value,
        password: event.target.password.value
      };

      request
        .post("/signin", values)
        .then((response) => dispatch(signin(response.data)))
        .catch((error) => {
          console.error(error);
        });
    },
    [dispatch]
  );

  return (
    <Layout>
      <Helmet>
        <title>Iniciar sesión - Yucagram</title>
      </Helmet>
      <form noValidate onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="username"
            placeholder="Nombre de usuario"
            className={"form-control"}
            aria-label="Nombre de usuario"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            className={"form-control"}
            aria-label="Contraseña"
          />
        </div>
        <button className="btn btn-primary btn-block" type="submit">
          Iniciar sesión
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
    </Layout>
  );
}

export default Signin;
