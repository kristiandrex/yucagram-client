import React from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import axios from "axios";
import { useDispatch } from "react-redux";
import Layout from "./Layout";
import validate from "helpers/validateSignin";
import { signin } from "actions/auth";

export default function Signin() {
    const dispatch = useDispatch();

    const onSubmit = async (values) => {
        try {
            const response = await axios.post("/api/signin", values);
            dispatch(signin(response.data));
        }

        catch (error) {
            console.log(error);
        }
    };

    const initialValues = {
        username: "",
        password: ""
    };

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
        <form noValidate onSubmit={handleSubmit}>
            <div className='form-group'>
                <input
                    type='text'
                    name='username'
                    placeholder='Nombre de usuario'
                    className={errors.username ? "form-control is-invalid" : "form-control"}
                    onChange={handleChange}
                    value={values.username}
                />
                {errors.username && <div className='invalid-feedback d-block'>{errors.username}</div>}
            </div>
            <div className='form-group'>
                <input
                    type='password'
                    name='password'
                    placeholder='Contraseña'
                    className={errors.password ? "form-control is-invalid" : "form-control"}
                    onChange={handleChange}
                    value={values.password}
                />
                {errors.password && <div className='invalid-feedback d-block'>{errors.password}</div>}
            </div>
            <button className='btn btn-primary btn-block' type='submit'>
                Iniciar sesión
            </button>
            <div className='btn-group btn-block mt-3'>
                <Link className='btn btn-link btn-sm' to='/password'>
                    ¿Olvidaste la contraseña?
                </Link>
                <Link className='btn btn-link btn-sm' to='/signup'>
                    Regístrate
                </Link>
            </div>
        </form>
    );
}