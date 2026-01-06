import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../DataProvider/DataProvider";

const ProtectedRoute = ({ children, msg, redirect }) => {
  const navigate = useNavigate();
  const { state } = useContext(DataContext);

  useEffect(() => {
    if (!state?.user) {
      navigate("/auth", {
        replace: true,
        state: { msg, redirect },
      });
    }
  }, [state, navigate, msg, redirect]);

  if (!state?.user) return null;

  return children;
};

export default ProtectedRoute;
