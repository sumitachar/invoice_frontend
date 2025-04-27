import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const ProtectedLayout = ({ setAuth }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        setAuth(false);
        navigate("/authentication/sign-in/basic");
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [navigate, setAuth]);

  return <Outlet />; // renders nested routes
};

export default ProtectedLayout;
