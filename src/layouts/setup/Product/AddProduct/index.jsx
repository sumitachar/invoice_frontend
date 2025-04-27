import { Card, Grid, Button } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useState } from "react";
import ProductInfo from "./components/ProductMedicines";
import ProductList from "../ProductList";

const AddNewProduct = () => {
  const [showProductInfo, setShowProductInfo] = useState(false);
  const [submitNew, setSubmitNew] = useState(false)

  const handleToggle = () => {
    setShowProductInfo((prev) => !prev);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={5} mb={9}>
        <Grid container justifyContent="center">
          <Grid item xs={10}>
              <MDBox mb={2} textAlign="center">
                <MDTypography variant="h3" fontWeight="bold">
                  Product Information
                </MDTypography>
              </MDBox>
            <MDBox mt={6} mb={4} textAlign="right">
              {showProductInfo ?"":<Button variant="contained" color="primary" onClick={handleToggle}>
                Add New Product
              </Button>}
            </MDBox>
            {showProductInfo && <ProductInfo setShowProductInfo={setShowProductInfo} setSubmitNew={setSubmitNew}/>}
            <ProductList submitNew={submitNew}/>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default AddNewProduct;
