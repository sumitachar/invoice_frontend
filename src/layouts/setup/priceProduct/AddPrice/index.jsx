import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React from "react";

const AddPrice = () => {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={5} mb={9}>
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={8}>
            <MDBox mt={6} mb={8} textAlign="center">
              <MDBox mb={1}>
                <MDTypography variant="h3" fontWeight="bold">
                  Add Product Price                
                </MDTypography>
              </MDBox>
              <MDTypography variant="h5" fontWeight="regular" color="secondary">
                Fill in the details to add a new price of product.
              </MDTypography>
            </MDBox>
            <Card>
              <MDBox p={2}>
                {/* <ProductInfo /> */}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default AddPrice;
