import React from "react";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";

import Layout from "./Layout";
import validate from "util/validateSignup";
import request from "util/request";
import { signup } from "actions/auth";

export default function Signup() {
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    try {
      const response = await request.post("/signup", values);
      dispatch(signup(response.data));
    }

    catch (error) {
      const errors = error.response.data;
      console.log(errors);
    }
  };

  const initialValues = { username: "", email: "", password: "" };

  return (
    <Layout>
      <Formik
        onSubmit={onSubmit}
        validate={validate}
        initialValues={initialValues}
      >
        {Form}
      </Formik>
    </Layout>
  );
}


function Form({ handleSubmit, handleChange, values, errors }) {
  return (
    <>
      <Helmet>
        <title>Registrarse - Yucagram</title>
      </Helmet>
      <form noValidate onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="username"
            placeholder="Nombre de usuario"
            className={errors.username ? "form-control is-invalid" : "form-control"}
            onChange={handleChange}
            value={values.username}
            aria-label="Nombre de usuario"
          />
          {errors.username && <div className="invalid-feedback d-block">{errors.username}</div>}
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            className={errors.email ? "form-control is-invalid" : "form-control"}
            onChange={handleChange}
            value={values.email}
            aria-label="Correo electrónico"
          />
          {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            className={errors.password ? "form-control is-invalid" : "form-control"}
            onChange={handleChange}
            value={values.password}
            aria-label="Contraseña"
          />
          {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
        </div>
        <button className="btn btn-primary btn-block" type="submit">
          Regístrate
        </button>
      </form>
      <Link className="btn btn-link btn-sm btn-block mt-3" to="/signin">
        Inicia sesión
      </Link>
    </>
  );
}

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};