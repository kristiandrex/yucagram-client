import React from "react";
import { Route, Redirect } from "wouter";
import PropsTypes from "prop-types";
import { useSelector } from "react-redux";

function AuthRoute({ isPrivate, ...props }) {
  const isAuth = useSelector((state) => state.auth.user !== null);

  if (!isAuth && isPrivate) {
    return <Redirect to="/signin" />;
  }

  if (isAuth && !isPrivate) {
    return <Redirect to="/" />;
  }

  return <Route {...props} />;
}

AuthRoute.propTypes = {
  path: PropsTypes.string.isRequired,
  component: PropsTypes.func.isRequired,
  isPrivate: PropsTypes.bool
};

export { AuthRoute };
