import React, { useEffect, useState } from "react";
import {
  Card, Grid, TextField, Dialog, DialogActions,
  DialogContent, DialogTitle
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDButton from "components/MDButton";
import { useLocation } from "react-router-dom";
import { updateProduct } from "api/setUp/product";
import { useNavigate } from "react-router-dom";


const columnList = [
  "product_code", "category_name", "product_name", "total_pack", "qty_pr_pack",
  "ro_level", "batch", "packing", "packing_tp", "packing_rp", "unit_tp", "unit_rp", "unit_stock"
];

const initialData = {
  product_code: "", category_name: "", product_name: "", total_pack: "", qty_pr_pack: "",
  mfg: "", exp_date: "", ro_level: "", batch: "", packing: "", packing_tp: "", packing_rp: "",
  unit_tp: "", unit_rp: "", unit_stock: ""
};

const EditProducts = () => {
  const [product, setProduct] = useState(initialData);
  const [openDialog, setOpenDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const rowData = location.state?.rowData;
  const shop_id = rowData?.shop_id;
  const navigate = useNavigate();


  useEffect(() => {
    if (rowData) {
      setProduct({
        ...initialData,
        ...rowData,
        mfg: formatDate(rowData.mfg),
        exp_date: formatDate(rowData.exp_date),
      });
    }
  }, [rowData]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const parts = dateStr.split("/");
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1].padStart(2, "0")}-${parts[0].padStart(2, "0")}`;
    }
    return dateStr;
  };

  const formatDatePicker = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString().split("T")[0]; // Format to yyyy-mm-dd
  };

  const validate = () => {
    let tempErrors = {};
    const numberRegex = /^[0-9]+$/;
    const decimalRegex = /^[0-9]+(\.[0-9]{1,2})?$/;

    ["total_pack", "qty_pr_pack", "ro_level", "unit_stock"].forEach(field => {
      if (!product[field] || !numberRegex.test(product[field]) || parseInt(product[field]) < 0) {
        tempErrors[field] = "Required. Only non-negative numbers.";
      }
    });

    ["packing_tp", "packing_rp", "unit_tp", "unit_rp"].forEach(field => {
      if (!product[field] || !decimalRegex.test(product[field]) || parseFloat(product[field]) < 0) {
        tempErrors[field] = "Required. Only positive decimal values.";
      }
    });

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = () => {
    if (validate()) {
      setOpenDialog(true);
    }
  };

  const handleCancel = () => {
    setProduct(initialData);
    setErrors({});
    setSuccessMessage("");
    setTimeout(() => {
      navigate("/setup/product/new_product");
    }, 1000);
  };

  const confirmSubmit = async () => {
    setLoading(true);
    setOpenDialog(false);
  
    try {
      const response = await updateProduct(shop_id, product.product_code, product);
      if (response) {
        setSuccessMessage("Product successfully updated!");
  
        // Wait a moment to show the message (optional)
        setTimeout(() => {
          navigate("/setup/product/new_product");
        }, 1000);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={5} mb={9}>
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={8}>
            <MDBox mt={6} mb={4} textAlign="center">
              <MDTypography variant="h3" fontWeight="bold">Edit Product</MDTypography>
            </MDBox>
            <Card>
              <MDBox p={3}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Grid container spacing={2}>
                    {columnList.map((field) => (
                      <Grid item xs={12} sm={6} key={field}>
                        <TextField
                          fullWidth
                          label={field.replace(/_/g, " ").toUpperCase()}
                          name={field}
                          type={
                            ["ro_level", "packing_tp", "packing_rp", "unit_tp", "unit_rp"].includes(field)
                              ? "number"
                              : "text"
                          }
                          value={product[field] || ""}
                          onChange={handleChange}
                          error={!!errors[field]}
                          helperText={errors[field] || ""}
                        />
                      </Grid>
                    ))}

                    <Grid item xs={12} sm={6}>
                      <DatePicker
                        label="Manufacture Date"
                        value={product.mfg ? new Date(product.mfg) : null}
                        onChange={(date) =>
                          setProduct({ ...product, mfg: date ? formatDatePicker(date) : "" })
                        }
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            error: !!errors.mfg,
                            helperText: errors.mfg || ""
                          }
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <DatePicker
                        label="Expiry Date"
                        value={product.exp_date ? new Date(product.exp_date) : null}
                        onChange={(date) =>
                          setProduct({ ...product, exp_date: date ? formatDatePicker(date) : "" })
                        }
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            error: !!errors.exp_date,
                            helperText: errors.exp_date || ""
                          }
                        }}
                      />
                    </Grid>
                  </Grid>
                </LocalizationProvider>

                <MDBox mt={3} display="flex" justifyContent="space-between">
                  <MDButton variant="outlined" color="secondary" onClick={handleCancel}>Cancel</MDButton>
                  <MDButton
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </MDButton>
                </MDBox>

                {successMessage && (
                  <MDTypography mt={2} color="success">{successMessage}</MDTypography>
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Edit</DialogTitle>
        <DialogContent>Are you sure you want to save changes?</DialogContent>
        <DialogActions>
          <MDButton onClick={() => setOpenDialog(false)} color="secondary">Cancel</MDButton>
          <MDButton onClick={confirmSubmit} color="primary" disabled={loading}>
            {loading ? "Saving..." : "Confirm"}
          </MDButton>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
};

export default EditProducts;
