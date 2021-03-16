import React, { useEffect } from "react";
import { Switch } from "wouter";
import { useSelector, useDispatch } from "react-redux";
import Loading from "components/UI/Loading";
import Home from "components/Home";
import Signin from "components/Login/Signin";
import Signup from "components/Login/Signup";
import Password from "components/Login/Password";
import { AuthRoute } from "./AuthRoute";
import { verifyAuth } from "actions/auth";

function Router() {
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyAuth());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Switch>
      <AuthRoute isPrivate path="/" component={Home} />
      <AuthRoute path="/signup" component={Signup} />
      <AuthRoute path="/signin" component={Signin} />
      <AuthRoute path="/password" component={Password} />
    </Switch>
  );
}

export default Router;