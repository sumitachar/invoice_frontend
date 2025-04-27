import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { createProduct } from "api/setUp/product";
import { catagoryAlllist } from "api/setUp/category";
import { Card, FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material";
import { useStateManage } from "contextApi/SateManage";
import dayjs from "dayjs";

function ProductMedicines({setShowProductInfo,setSubmitNew}) {
  const [formData, setFormData] = useState({
    product_code: "",
    category_name: "",
    category_id: "",
    product_name: "",
    total_pack: "",
    qty_pr_pack: "",
    mfg: "",
    exp_date: "",
    ro_level: "",
    batch: "",
    sale_rate: "",
    packing: "",
    packing_tp: "",
    packing_rp: "",
    unit_tp: "",
    unit_rp: "",
    unit_stock: "",
  });

  const [categories, setCategories] = useState([]);  // To store fetched categories
  const [selectedCategory, setSelectedCategory] = useState("");  // To store selected category name
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // State for loading spinner or button disable
  const [loadingCategories, setLoadingCategories] = useState(false); // For handling category loading state
  const { shop_id } = useStateManage();

  const fetchCategories = async () => {
    setLoadingCategories(true);
    try {
      // Replace with actual API call to get categories
      const response = await catagoryAlllist(shop_id);  // Replace with the real API
      setCategories(response?.categories || []);  // Assume response is an array of categories
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoadingCategories(false);
    }
  };

  useEffect(() => {
    if (shop_id) {
      fetchCategories();
    }
  }, [shop_id]);

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
    if (!formData.qty_pr_pack || !numberRegex.test(formData.qty_pr_pack) || parseInt(formData.qty_pr_pack) <= 0) {
      tempErrors.qty_pr_pack = "Required. Only positive numbers.";
    }
    if (!formData.mfg) {
      tempErrors.mfg = "Required.";
    }
    if (!formData.exp_date || (formData.mfg && new Date(formData.exp_date) <= new Date(formData.mfg))) {
      tempErrors.exp_date = "Expiry date should be after manufacture date.";
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
    if (!formData.packing || !decimalRegex.test(formData.packing)|| parseFloat(formData.packing) <= 0) {
      tempErrors.packing = "Required. Only positive decimal values.";
    }
    if (!formData.packing_tp || !decimalRegex.test(formData.packing_tp) || parseFloat(formData.packing_tp) <= 0) {
      tempErrors.packing_tp = "Required. Only positive decimal values.";
    }
    if (!formData.packing_rp || !decimalRegex.test(formData.packing_rp) || parseFloat(formData.packing_rp) <= 0) {
      tempErrors.packing_rp = "Required. Only positive decimal values.";
    }
    if (!formData.unit_tp || !decimalRegex.test(formData.unit_tp) || parseFloat(formData.unit_tp) <= 0) {
      tempErrors.unit_tp = "Required. Only positive decimal values.";
    }
    if (!formData.unit_rp || !decimalRegex.test(formData.unit_rp) || parseFloat(formData.unit_rp) <= 0) {
      tempErrors.unit_rp = "Required. Only positive decimal values.";
    }
    if (!formData.unit_stock || !numberRegex.test(formData.unit_stock) || parseInt(formData.unit_stock) < 0) {
      tempErrors.unit_stock = "Required. Only non-negative numbers.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validation checks
    if (name === "total_pack" || name === "ro_level" || name === "unit_stock") {
      if (!/^\d*$/.test(value)) return;
    }
    if (name === "sale_rate" || name === "packing_tp" ||name === "packing" || name === "packing_rp" || name === "unit_tp" || name === "unit_rp") {
      if (!/^\d*\.?\d{0,2}$/.test(value)) return;
    }
    if (name === "product_name" ) {
      if (!/^[a-zA-Z\s]*$/.test(value)) return;
    }
    if (["product_code", "batch"].includes(name)) {
      if (!/^[a-zA-Z0-9]*$/.test(value)) return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryChange = (e) => {
    const selectedId = e.target.value;
    const selectedCat = categories.find(cat => cat.category_name === selectedId);
    // console.log("handleCategoryChange", selectedId, selectedCat, selectedCat?.category_name);
  
    setSelectedCategory(selectedCat?.category_name || "");
  
    setFormData(prev => ({
      ...prev,
      category_name: selectedCat?.category_name || "",
      category_id: selectedCat?.category_id || ""
    }));
  };
  

  // console.log("handleCategoryChange@@",formData)

  const handleSubmit = async () => {
    if (validate()) {
      setLoading(true); // Set loading to true before submitting

      try {
        // Call the API function and handle the response
        const response = await createProduct(shop_id, formData); 
        // console.log("Product Created Successfully:", response);
        // Optionally, handle success message or redirect
        if(response){
          handleCancel()
          setShowProductInfo(false)
          setSubmitNew(true)
        }
      } catch (error) {
        console.error("Error creating product:", error);
        // Optionally, show error message to the user
      } finally {
        setLoading(false); 
      }
    }
  };

  const handleCancel = () => {
    setFormData({
      product_code: "",
      category_name: "",
      category_id: "",
      product_name: "",
      total_pack: "",
      qty_pr_pack: "",
      mfg: "",
      exp_date: "",
      ro_level: "",
      batch: "",
      sale_rate: "",
      packing: "",
      packing_tp: "",
      packing_rp: "",
      unit_tp: "",
      unit_rp: "",
      unit_stock: "",
    });
    setErrors({});
    setShowProductInfo(false)
  };

  return (
    <Card sx={{ p: 4, mb: 4, }}>
    <MDBox   mt={5} mb={6}>
      <MDTypography variant="h5" mb={2}> Add New Product</MDTypography>

      {/* Product Code & Category */}
      <MDBox mb={4}>
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
            <FormControl fullWidth error={!!errors.category_name}>
              <InputLabel id="category-label">Category Name</InputLabel>
              <Select
                labelId="category-label"
                name="category_name"
                value={formData.category_name}
                onChange={handleCategoryChange}
                input={<OutlinedInput label="Category Name" />}
                disabled={loadingCategories}
                sx={{
                  height: '45px', // match default TextField height
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {categories.map((category) => (
                  <MenuItem key={category.category_id} value={category.category_name}>
                    {category.category_name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.category_name}</FormHelperText>
            </FormControl>
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

      {/* Pack Info */}
      <MDBox mb={4}>
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
              name="qty_pr_pack"
              type="number"
              value={formData.qty_pr_pack}
              onChange={handleChange}
              error={!!errors.qty_pr_pack}
              helperText={errors.qty_pr_pack || ""}
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
        </Grid>
      </MDBox>

      {/* Batch & Dates */}
      <MDBox mb={4}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid container spacing={3}>
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
            <Grid item xs={12} sm={4}>
              <DatePicker
                label="Manufacture Date"
                value={formData.mfg}
                onChange={(date) => setFormData({ ...formData, mfg: date })}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors.mfg,
                    helperText: errors.mfg || ""
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <DatePicker
                label="EXP Date"
                value={formData.exp_date}
                onChange={(newValue) =>
                  setFormData({ ...formData, exp_date: newValue })
                }
                minDate={formData.mfg_date ? dayjs(formData.mfg_date).add(1, "day") : undefined}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors.exp_date,
                    helperText: errors.exp_date || ""
                  },
                }}
              />
            </Grid>
          </Grid>
        </LocalizationProvider>
      </MDBox>

      {/* Pricing Info */}
      <MDBox mb={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <MDInput
              fullWidth
              label="Sale Rate"
              name="sale_rate"
              type="number"
              value={formData.sale_rate}
              onChange={handleChange}
              error={!!errors.sale_rate}
              helperText={errors.sale_rate || ""}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <MDInput
              fullWidth
              label="Packing"
              name="packing"
              type="number"
              value={formData.packing}
              onChange={handleChange}
              error={!!errors.packing}
              helperText={errors.packing || ""}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <MDInput
              fullWidth
              label="Pack TP"
              name="packing_tp"
              type="number"
              value={formData.packing_tp}
              onChange={handleChange}
              error={!!errors.packing_tp}
              helperText={errors.packing_tp || ""}
            />
          </Grid>
        </Grid>
      </MDBox>

      {/* More Pricing Info */}
      <MDBox mb={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <MDInput
              fullWidth
              label="Pack RP"
              name="packing_rp"
              type="number"
              value={formData.packing_rp}
              onChange={handleChange}
              error={!!errors.packing_rp}
              helperText={errors.packing_rp || ""}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <MDInput
              fullWidth
              label="Unit TP"
              name="unit_tp"
              type="number"
              value={formData.unit_tp}
              onChange={handleChange}
              error={!!errors.unit_tp}
              helperText={errors.unit_tp || ""}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <MDInput
              fullWidth
              label="Unit RP"
              name="unit_rp"
              type="number"
              value={formData.unit_rp}
              onChange={handleChange}
              error={!!errors.unit_rp}
              helperText={errors.unit_rp || ""}
            />
          </Grid>
        </Grid>
      </MDBox>

      {/* Stock Info */}
      <MDBox mb={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <MDInput
              fullWidth
              label="Unit Stock"
              name="unit_stock"
              type="number"
              value={formData.unit_stock}
              onChange={handleChange}
              error={!!errors.unit_stock}
              helperText={errors.unit_stock || ""}
            />
          </Grid>
        </Grid>
      </MDBox>

      {/* Buttons */}
      <MDBox mt={3} display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" gap={2}>
        <MDButton variant="contained" color="secondary" onClick={handleCancel} fullWidth>
          Cancel
        </MDButton>
        <MDButton
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loading}
          fullWidth
        >
          {loading ? "Submitting..." : "Submit"}
        </MDButton>
      </MDBox>
    </MDBox>
    </Card>

  );
}

export default ProductMedicines;
