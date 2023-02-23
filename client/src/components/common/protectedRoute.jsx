import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../../store/users";

function ProtectedRoute({ children }) {
  const isLoggedIn = useSelector(getIsLoggedIn());
  const location = useLocation();
  if (!isLoggedIn)
    return <Navigate to="/login" state={{ referrer: location }} />;
  return children;
}
ProtectedRoute.propTypes = {
  component: PropTypes.func,
  location: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default ProtectedRoute;
