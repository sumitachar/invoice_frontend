import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { loginUser } from "api/Auth/auth";
import { useStateManage } from "contextApi/SateManage";

function Basic() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const {setShop_id,setAuth,setAuthLoading}=useStateManage();

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
  
    try {
      const response = await loginUser(email, password);
    
      if (response?.access_token) {  // ✅ Check access_token instead of token
        setShop_id(response.shop_id); // ✅ Setting global context value
        setAuth(true);
        setAuthLoading(false);
        // localStorage.setItem("authToken", response.access_token); // ✅ Store correct token/
        navigate("/dashboards/sales"); // ✅ Redirect to dashboard
      } else {
        console.log("No token in response:", response);
        setAuthLoading(true);
        setAuth(false);
        setError("Authentication failed: No token received");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError(err.response?.data?.message || "Invalid email or password");
    }
  };
  
  
  

  return (
    <BasicLayout image={bgImage}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Card>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            mx={2}
            mt={2}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Sign in
            </MDTypography>
            <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
              {[
                { icon: <FacebookIcon />, href: "#" },
                { icon: <GitHubIcon />, href: "#" },
                { icon: <GoogleIcon />, href: "#" },
              ].map((item, index) => (
                <Grid item xs={2} key={index}>
                  <motion.div whileHover={{ scale: 1.2 }}>
                    <MDTypography component={MuiLink} href={item.href} variant="body1" color="white">
                      {item.icon}
                    </MDTypography>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form" onSubmit={handleLogin}>
              <MDBox mb={2}>
                <MDInput
                  type="email"
                  label="Email"
                  placeholder="Enter your email"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="password"
                  label="Password"
                  placeholder="Enter your password"
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </MDBox>
              {error && (
                <MDTypography variant="caption" color="error">
                  {error}
                </MDTypography>
              )}
              <MDBox display="flex" alignItems="center" ml={-1}>
                <Switch checked={rememberMe} onChange={handleSetRememberMe} />
                <MDTypography
                  variant="button"
                  fontWeight="regular"
                  color="text"
                  onClick={handleSetRememberMe}
                  sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                >
                  &nbsp;&nbsp;Remember me
                </MDTypography>
              </MDBox>
              <MDBox mt={4} mb={1}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <MDButton variant="gradient" color="info" fullWidth type="submit">
                    Sign in
                  </MDButton>
                </motion.div>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
      </motion.div>
    </BasicLayout>
  );
}

export default Basic;
