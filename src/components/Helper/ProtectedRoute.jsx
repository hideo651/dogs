/* eslint-disable react/prop-types */
import React from "react";
import { UserContext } from "../../UserContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { login } = React.useContext(UserContext);
  if (login === true) {
    return children;
  } else if (login === false) {
    return <Navigate to="/login" />;
  } else {
    return (
      <div className="container">
        <h1 className="title">Carregando...</h1>
      </div>
    );
  }
};

export default ProtectedRoute;
