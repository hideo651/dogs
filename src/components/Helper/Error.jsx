/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

const Error = ({ error }) => {
  if (!error) return null;
  return <p style={{ color: "#f31", margin: "1rem 0" }}>{error}</p>;
};

export default Error;
