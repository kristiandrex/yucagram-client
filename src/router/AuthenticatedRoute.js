import { Route, Redirect, Link } from "wouter";
import { useSelector } from "react-redux";
import PropsTypes from "prop-types";

function AuthenticatedRoute({ isPrivate, ...props }) {
  const authenticated = useSelector((state) => state.auth.user !== null);
  const shouldRedirectPublic = !authenticated && isPrivate;
  const shouldRedirectPrivate = authenticated && !isPrivate;

  if (shouldRedirectPublic) {
    return <Redirect to="/signin" />;
  }

  if (shouldRedirectPrivate) {
    return <Redirect to="/" />;
  }

  return isPrivate ? (
    <Route {...props} />
  ) : (
    <div
      className="container h-100"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div className="row h-100 align-items-center justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-lg-4">
          <Route {...props} />
        </div>
      </div>
      <footer
        className="footer p-4 border-top"
        style={{ display: "flex", gap: "1.5rem", justifyContent: "center" }}
      >
        <Link to="/signin">Iniciar sesión</Link>
        <Link to="/signup">Registrarse</Link>
        <Link to="/forgot-password">¿Olvidaste la contraseña?</Link>
      </footer>
    </div>
  );
}

AuthenticatedRoute.propTypes = {
  path: PropsTypes.string.isRequired,
  isPrivate: PropsTypes.bool
};

export default AuthenticatedRoute;
