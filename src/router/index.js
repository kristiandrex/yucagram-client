import { useEffect, lazy, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import AuthenticatedRoute from "router/AuthenticatedRoute";
import Signin from "pages/signin";
import Signup from "pages/signup";
import ForgotPassword from "pages/forgot-password";
import Loading from "components/UI/Loading";
import { verifyAuth } from "actions/auth";
import { Switch } from "wouter";

const Home = lazy(() => import("pages/home"));
const NewPassword = lazy(() => import("pages/new-password"));

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
    <Suspense fallback={<Loading />}>
      <Switch>
        <AuthenticatedRoute isPrivate path="/" component={Home} />
        <AuthenticatedRoute path="/signin" component={Signin} />
        <AuthenticatedRoute path="/signup" component={Signup} />
        <AuthenticatedRoute
          path="/forgot-password"
          component={ForgotPassword}
        />
        <AuthenticatedRoute path="/new-password" component={NewPassword} />
      </Switch>
    </Suspense>
  );
}

export default Router;
