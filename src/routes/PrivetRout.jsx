import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";

const PrivetRout = ({ children }) => {
  const { user, loadin } = useAuth();
  const location = useLocation()

  {
    loadin && "loading";
  }
  if (!user) {
    return <Navigate state={location.pathname} to="/login"></Navigate>;
  }
  return <div>{children}</div>;
};

export default PrivetRout;
