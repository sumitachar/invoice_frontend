import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useState } from "react";
import SupplierInfo from "./components/SupplierInfo";
import SuppliersDetails from "./components/SupplierList";

const SupplierManagement = () => {
  const [addSupplier,setAddSupplier]=useState(false)
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={5} mb={9}>
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={12}>
            <MDBox mt={6} mb={2} textAlign="center">
              <MDBox mb={1}>
                <MDTypography variant="h3" fontWeight="bold">
                  Supplier List
                </MDTypography>
              </MDBox>
            </MDBox>
            <SuppliersDetails addSupplier={addSupplier}/>
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={12}>
            <MDBox mt={6} mb={2} textAlign="center">
              <MDBox mb={1}>
                <MDTypography variant="h3" fontWeight="bold">
                  Add New Supplier
                </MDTypography>
              </MDBox>
              <MDTypography variant="h5" fontWeight="regular" color="secondary">
                Fill in the details to add a new product.
              </MDTypography>
            </MDBox>
            <Card>
              <MDBox p={2}>
                <SupplierInfo setAddSupplier={setAddSupplier}/>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default SupplierManagement;
