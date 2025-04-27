

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// Material Dashboard 3 PRO React components
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-in-cover.jpeg";
import { Box } from "@mui/material";

function Cover() {
  const [rememberMe, setRememberMe] = useState(true);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <Box
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          mx={2}
          mt={2}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to Sign In
          </MDTypography>
        </Box>
        <Box pt={4} pb={3} px={3}>
          <Box component="form" role="form">
            <Box mb={2}>
              <MDInput
                type="email"
                label="Email"
                variant="standard"
                fullWidth
                placeholder="john@example.com"
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            <Box mb={2}>
              <MDInput
                type="password"
                label="Password"
                variant="standard"
                fullWidth
                placeholder="************"
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            <Box display="flex" alignItems="center" ml={-1}>
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
            </Box>
            <Box mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth>
                sign in
              </MDButton>
            </Box>
            <Box mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up/cover"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </Box>
          </Box>
        </Box>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
