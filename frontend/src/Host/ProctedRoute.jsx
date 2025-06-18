import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProctedRoute = ({ children }) => {
  const role=localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "host") {
      navigate("/");
    }
  }, []);

  return <>{children}</>;
};

export default ProctedRoute;
