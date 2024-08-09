import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  const [loader, setLoder] = useState();
  const userStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  useEffect(() => {
    if (authentication && userStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && userStatus !== authentication) {
      navigate("/");
    }
    setLoder(false);
  }, [userStatus, authentication, navigate]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
}
