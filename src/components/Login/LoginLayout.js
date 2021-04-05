import PropTypes from "prop-types";

export default function LoginLayout({ children }) {
  return (
    <div className="card">
      <div className="card-body text-center shadow-sm">
        <h1 className="text-center mb-4">Yucagram</h1>
        {children}
      </div>
    </div>
  );
}

LoginLayout.propTypes = {
  children: PropTypes.node
};
