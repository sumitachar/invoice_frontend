import { useState } from "react";
import { Link } from "react-router-dom";
import { Switch } from "@mui/material";
import { motion } from "framer-motion";
import { Email, Lock, Login } from "@mui/icons-material"; // Importing icons
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import IllustrationLayout from "layouts/authentication/components/IllustrationLayout";
import bgImage from "assets/images/illustrations/illustration-reset.jpg";

function Illustration() {
  const [rememberMe, setRememberMe] = useState(false);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <IllustrationLayout
      title="Welcome Back!"
      description="Sign in to your account and access exclusive features."
      illustration={bgImage}
    >
      {/* Animated Form Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <MDBox
          component="form"
          role="form"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          px={4}
          py={4}
          width="100%"
          maxWidth="400px"
          sx={{
            backdropFilter: "blur(15px)",
            background: "linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgba(25, 118, 210, 0.6))",
            borderRadius: "16px",
            boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.3)",
          }}
        >
          {/* Email Field */}
          <MDBox mb={2} width="100%">
            <MDInput
              type="email"
              label="Email"
              fullWidth
              nputProps={{ startAdornment: <Lock sx={{ color: "white", mr: 1 }} /> }}
              InputLabelProps={{ style: { color: "white" } }}
              sx={{ color: "white" }}
            />
          </MDBox>

          {/* Password Field */}
          <MDBox mb={2} width="100%">
            <MDInput
              type="password"
              label="Password"
              fullWidth
              nputProps={{ startAdornment: <Lock sx={{ color: "white", mr: 1 }} /> }}
              InputLabelProps={{ style: { color: "white" } }}
              sx={{ color: "white" }}
            />
          </MDBox>

          {/* Remember Me & Forgot Password */}
          <MDBox display="flex" justifyContent="space-between" width="100%" alignItems="center">
            <MDBox display="flex" alignItems="center">
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="white"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none" }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            {/* <Link to="/forgot-password" style={{ textDecoration: "none", color: "#ffcc00" }}>
              <MDTypography variant="button" fontWeight="bold">
                Forgot Password?
              </MDTypography>
            </Link> */}
          </MDBox>

          {/* Sign In Button with Animation */}
          <MDBox mt={4} mb={1} width="100%">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <MDButton
                variant="gradient"
                color="warning"
                size="large"
                fullWidth
                startIcon={<Login />}
                sx={{
                  background: "linear-gradient(45deg, #ffcc00, #ff6600)",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Sign In
              </MDButton>
            </motion.div>
          </MDBox>

        </MDBox>
      </motion.div>
    </IllustrationLayout>
  );
}

export default Illustration;
