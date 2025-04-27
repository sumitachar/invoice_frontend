import { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

function PriceInfo() {
  const [formData, setFormData] = useState({
    product_code: "",
    category_name: "",
    product_name: "",
    total_pack: "",
    qty_per_pack:"",
    mfg: "",
    exp_date: "",
    ro_level: "",
    batch: "",
    sale_rate: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    const textRegex = /^[a-zA-Z\s]+$/;
    const numberRegex = /^[0-9]+$/;
    const decimalRegex = /^[0-9]+(\.[0-9]{1,2})?$/;

    if (!formData.product_code || !alphanumericRegex.test(formData.product_code)) {
      tempErrors.product_code = "Required. Only alphanumeric.";
    }
    if (!formData.category_name || !textRegex.test(formData.category_name)) {
      tempErrors.category_name = "Required. Only letters.";
    }
    if (!formData.product_name || !textRegex.test(formData.product_name)) {
      tempErrors.product_name = "Required. Only letters.";
    }
    if (!formData.total_pack || !numberRegex.test(formData.total_pack) || parseInt(formData.total_pack) <= 0) {
      tempErrors.total_pack = "Required. Only positive numbers.";
    }
    if (!formData.qty_per_pack || !numberRegex.test(formData.qty_per_pack) || parseInt(formData.qty_per_pack) <= 0) {
      tempErrors.qty_per_pack = "Required. Only positive numbers.";
    }
    if (!formData.mfg) {
      tempErrors.mfg = "Required.";
    }
    if (!formData.exp_date) {
      tempErrors.exp_date = "Required.";
    }
    if (!formData.ro_level || isNaN(formData.ro_level) || parseFloat(formData.ro_level) < 0) {
      tempErrors.ro_level = "Required. Only non-negative numbers.";
    }
    if (!formData.batch || !alphanumericRegex.test(formData.batch)) {
      tempErrors.batch = "Required. Only alphanumeric.";
    }
    if (!formData.sale_rate || !decimalRegex.test(formData.sale_rate) || parseFloat(formData.sale_rate) <= 0) {
      tempErrors.sale_rate = "Required. Only positive decimal values.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "total_pack" || name === "ro_level") {
      if (!/^\d*$/.test(value)) return;
    }
    if (name === "sale_rate") {
      if (!/^\d*\.?\d{0,2}$/.test(value)) return;
    }
    if (name === "category_name" || name === "product_name") {
      if (!/^[a-zA-Z\s]*$/.test(value)) return;
    }
    if (["product_code", "batch"].includes(name)) {
      if (!/^[a-zA-Z0-9]*$/.test(value)) return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (validate()) {
      console.log("Submitted Data:", formData);
    }
  };

  const handleCancel = () => {
    setFormData({
      product_code: "",
      category_name: "",
      product_name: "",
      total_pack: "",
      qty_per_pack:"",
      mfg: "",
      exp_date: "",
      ro_level: "",
      batch: "",
      sale_rate: "",
    });
    setErrors({});
  };

  return (
    <MDBox>
      <MDTypography variant="h5">Product Information</MDTypography>
      <MDBox mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <MDInput
              fullWidth
              label="Product Code"
              name="product_code"
              value={formData.product_code}
              onChange={handleChange}
              error={!!errors.product_code}
              helperText={errors.product_code || ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MDInput
              fullWidth
              label="Category Name"
              name="category_name"
              value={formData.category_name}
              onChange={handleChange}
              error={!!errors.category_name}
              helperText={errors.category_name || ""}
            />
          </Grid>
          <Grid item xs={12}>
            <MDInput
              fullWidth
              label="Product Name"
              name="product_name"
              value={formData.product_name}
              onChange={handleChange}
              error={!!errors.product_name}
              helperText={errors.product_name || ""}
            />
          </Grid>
        </Grid>
      </MDBox>
      <MDBox mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <MDInput
              fullWidth
              label="Total Pack"
              name="total_pack"
              type="number"
              value={formData.total_pack}
              onChange={handleChange}
              error={!!errors.total_pack}
              helperText={errors.total_pack || ""}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <MDInput
              fullWidth
              label="Quantity/Pack"
              name="qty_per_pack"
              type="number"
              value={formData.qty_per_pack}
              onChange={handleChange}
              error={!!errors.qty_per_pack}
              helperText={errors.qty_per_pack || ""}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <MDInput
              fullWidth
              label="RO Level"
              name="ro_level"
              type="number"
              value={formData.ro_level}
              onChange={handleChange}
              error={!!errors.ro_level}
              helperText={errors.ro_level || ""}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <MDInput
              fullWidth
              label="Batch"
              name="batch"
              value={formData.batch}
              onChange={handleChange}
              error={!!errors.batch}
              helperText={errors.batch || ""}
            />
          </Grid>
        </Grid>
      </MDBox>
      <MDBox mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="MFG Date" name="mfg" type="date" value={formData.mfg} onChange={handleChange} InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Expiry Date" name="exp_date" type="date" value={formData.exp_date} onChange={handleChange} InputLabelProps={{ shrink: true }} />
          </Grid>
        </Grid>
      </MDBox>
      <MDBox mt={3} width="100%" display="flex" justifyContent="space-between">
        <MDButton variant="outlined" color="secondary" onClick={handleCancel}>
          Cancel
        </MDButton>
        <MDButton variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </MDButton>
      </MDBox>
    </MDBox>
  );
}

export default PriceInfo;
