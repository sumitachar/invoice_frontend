import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "api/Auth/auth";
import { useStateManage } from "contextApi/SateManage";

const useAuthCheck = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setShop_id, setAuth, setAuthLoading } = useStateManage();
  const hasCheckedRef = useRef(false);

  const checkAuth = async () => {
    console.log("checkAuth")
    try {
      const authStatus = await isAuthenticated();
      if (!authStatus.valid) {
        setAuth(false);
        navigate("/authentication/sign-in/basic");
      } else {
        setAuth(true);
        setShop_id(authStatus.user?.shop_id);
      }
    } catch (err) {
      console.error("Auth check error:", err);
      setAuth(false);
      navigate("/authentication/sign-in/basic");
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    if (!hasCheckedRef.current) {
      hasCheckedRef.current = true;
      checkAuth(); // Initial check on first load
    }
  }, []);

  useEffect(() => {
    checkAuth(); // Re-check auth on route change
  }, [location.pathname]);
};

export default useAuthCheck;
