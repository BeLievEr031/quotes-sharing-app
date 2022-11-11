import React from "react";
import { useContext } from "react";
import { DataContext } from "../../context/DataContextProvider";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function ProtectedRoute({ children }) {
  const { user } = useContext(DataContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      return navigate("/");
    }
  });

  return children;
}

export default ProtectedRoute;
