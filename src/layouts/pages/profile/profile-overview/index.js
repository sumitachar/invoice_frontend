// components/Header.jsx
import { useState } from "react";
import PropTypes from "prop-types";
import {
  Card,
  Grid,
  AppBar,
  Tabs,
  Tab,
  Icon,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import backgroundImage from "assets/images/bg-profile.jpeg";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";


function ProfilePage({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [tabValue, setTabValue] = useState(0);

  const handleSetTabValue = (_, newValue) => setTabValue(newValue);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox position="relative" mb={5}>
        {/* Background image */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <MDBox
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
            minHeight="18.75rem"
            borderRadius="xl"
            sx={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </motion.div>

        {/* Card section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Card
            sx={{
              position: "relative",
              mt: -8,
              mx: 3,
              py: 3,
              px: 4,
              backgroundColor: "white",
              borderRadius: 4,
              boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
              "&:hover": {
                boxShadow: "0 12px 25px rgba(0,0,0,0.2)",
              },
            }}
          >
            <Grid container spacing={3} alignItems="center">
              {/* Company Logo */}
              <Grid item>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <MDAvatar
                    src='src/assets/logo/companyLogoGrayScale.png'
                    alt="company-logo"
                    size="xl"
                    shadow="md"
                    sx={{
                      border: "3px solid #1a73e8",
                      transition: "transform 0.3s",
                    }}
                  />
                </motion.div>
              </Grid>

              {/* Company Info */}
              <Grid item>
                <MDBox mt={0.5} lineHeight={1}>
                  <MDTypography variant="h5" fontWeight="bold">
                    Barkat Bazar Pvt. Ltd.
                  </MDTypography>
                  <MDTypography variant="button" color="text" fontWeight="regular">
                    Empowering Local Businesses
                  </MDTypography>
                </MDBox>
              </Grid>

              {/* Tabs */}
              <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
                <AppBar position="static" sx={{ borderRadius: 3 }}>
                  <Tabs
                    orientation={isMobile ? "vertical" : "horizontal"}
                    value={tabValue}
                    onChange={handleSetTabValue}
                    variant="fullWidth"
                    indicatorColor="secondary"
                    textColor="inherit"
                    sx={{
                      "& .MuiTab-root": {
                        fontWeight: "bold",
                        color: "#1a237e",
                        transition: "all 0.3s",
                      },
                      "& .Mui-selected": {
                        color: "#1a73e8",
                      },
                    }}
                  >
                    <Tab icon={<Icon>home</Icon>} label="Overview" />
                    <Tab icon={<Icon>email</Icon>} label="Messages" />
                    <Tab icon={<Icon>settings</Icon>} label="Settings" />
                  </Tabs>
                </AppBar>
              </Grid>
            </Grid>

            {/* Page content */}
            <MDBox mt={4}>{children}</MDBox>
          </Card>
        </motion.div>
      </MDBox>
       <Footer />
    </DashboardLayout>
  );
}


export default ProfilePage;
