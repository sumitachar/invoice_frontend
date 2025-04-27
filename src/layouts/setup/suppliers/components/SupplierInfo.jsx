import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { useStateManage } from "contextApi/SateManage";
import { catagoryAlllist } from "api/setUp/category";
import { createSupplier } from "api/setUp/supplier";

function SupplierInfo({ setAddSupplier }) {
    const { shop_id } = useStateManage();
    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("")

    const fetchCategories = async () => {
        if (shop_id) {
            try {
                const res = await catagoryAlllist(shop_id);
                setCategories(res?.categories || []);
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoadingCategories(false);
            }
        }
    };

    useEffect(() => {
        fetchCategories();
    }, [shop_id]);

    const [formData, setFormData] = useState({
        supplier_name: "",
        supplier_id: "",
        address: [""], // now an array of address lines
        mobile: "",
        country_code: "+91",
        category_id: "",
        product: [],
    });


    const [errors, setErrors] = useState({});

    const countryCodes = [
        { code: "+1", name: "🇺🇸 USA" },
        { code: "+44", name: "🇬🇧 UK" },
        { code: "+91", name: "🇮🇳 India" },
        { code: "+61", name: "🇦🇺 Australia" },
    ];

    const productsByCategory = {
        Electronics: [
            { id: 1, name: "Laptop" },
            { id: 2, name: "Smartphone" },
            { id: 3, name: "Tablet" },
        ],
        Pharmaceuticals: [
            { id: 4, name: "Painkiller" },
            { id: 5, name: "Antibiotic" },
            { id: 6, name: "Vitamin C" },
        ],
        Groceries: [
            { id: 7, name: "Rice" },
            { id: 8, name: "Flour" },
            { id: 9, name: "Sugar" },
        ],
        Syrup : [
            { id:1, name:"Trisoliv"}
        ]
    };

    const availableProducts = productsByCategory[selectedCategory] || [];

    const validate = () => {
        const textRegex = /^[a-zA-Z\s]+$/;
        const mobileRegex = /^[0-9]{10}$/;
        const supplierIdRegex = /^[a-zA-Z0-9_-]+$/; // Allows letters, numbers, underscore, and dash

        let tempErrors = {};

        if (!formData.supplier_name || !textRegex.test(formData.supplier_name)) {
            tempErrors.supplier_name = "Required. Only letters.";
        }

        if (!formData.supplier_id || !supplierIdRegex.test(formData.supplier_id)) {
            tempErrors.supplier_id = "Required. Alphanumeric only, with _ or - allowed.";
        }

        if (!formData.address[0]) {
            tempErrors.address = "At least one address line is required.";
        }

        if (!formData.mobile || !mobileRegex.test(formData.mobile)) {
            tempErrors.mobile = "Required. Must be a 10-digit number.";
        }

        if (!formData.category_id) {
            tempErrors.category_id = "Required.";
        }

        if (!formData.product || formData.product.length === 0) {
            tempErrors.product = "Select at least one product.";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };


    const handleAddressChange = (index, value) => {
        const updatedAddress = [...formData.address];
        updatedAddress[index] = value;
        setFormData((prevData) => ({ ...prevData, address: updatedAddress }));
    };
    const addAddressField = () => {
        setFormData((prevData) => ({
            ...prevData,
            address: [...prevData.address, ""],
        }));
    };

    const removeAddressField = (index) => {
        const updatedAddress = [...formData.address];
        updatedAddress.splice(index, 1);
        setFormData((prevData) => ({ ...prevData, address: updatedAddress }));
    };



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
            ...(name === "category_id" ? { product: [] } : {}),
        }));
    };

    const handleMultiSelectChange = (event) => {
        setFormData({ ...formData, product: event.target.value });
    };


    const handleSubmit = async () => {
        if (validate()) {
            const payload = {
                ...formData,
                address: formData.address.join(","), // convert array to comma-separated string
            };

            try {
                const response = await createSupplier(shop_id, payload);
                // console.log("Supplier created successfully:", response);
                setAddSupplier(true)
                setFormData({  supplier_name: "",
                    supplier_id: "",
                    address: [""], // now an array of address lines
                    mobile: "",
                    country_code: "+91",
                    category_id: "",
                    product: [],})
                // Optional: reset form or close modal
            } catch (error) {
                console.error("Error creating supplier:", error);
            }
        }
    };




    const handleCancel = () => {
        setFormData({
            supplier_name: "",
            supplier_id: "",
            address: [""],
            mobile: "",
            country_code: "+91",
            category_id: "",
            product: [],
          });
          setSelectedCategory("");
          setErrors({});          
    };


    return (
        <MDBox p={3} borderRadius={2} boxShadow={2} bgcolor="white">
            <MDTypography variant="h5" mb={2}>
                Supplier Information
            </MDTypography>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Supplier Name"
                        name="supplier_name"
                        value={formData.supplier_name}
                        onChange={handleChange}
                        error={!!errors.supplier_name}
                        helperText={errors.supplier_name || ""}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Supplier ID"
                        name="supplier_id"
                        value={formData.supplier_id}
                        onChange={handleChange}
                        error={!!errors.supplier_id}
                        helperText={errors.supplier_id || ""}
                    />
                </Grid>
                <Grid item xs={12}>
                    {formData.address.map((addr, index) => (
                        <MDBox key={index} display="flex" alignItems="center" mb={1}>
                            <TextField
                                fullWidth
                                label={`Address Line ${index + 1}`}
                                value={addr}
                                onChange={(e) => handleAddressChange(index, e.target.value)}
                                error={!!errors.address}
                                helperText={index === 0 ? errors.address || "" : ""}
                            />
                            {index > 0 && (
                                <MDButton
                                    color="error"
                                    variant="text"
                                    onClick={() => removeAddressField(index)}
                                    sx={{ ml: 1 }}
                                >
                                    Remove
                                </MDButton>
                            )}
                        </MDBox>
                    ))}
                    <MDButton variant="outlined" color="info" onClick={addAddressField}>
                        Add Address Line
                    </MDButton>
                </Grid>

            </Grid>

            <Grid container spacing={2} mt={2}>
                <Grid item xs={3}>
                    <FormControl fullWidth>
                        <InputLabel>Country Code</InputLabel>
                        <Select
                            name="country_code"
                            value={formData.country_code}
                            onChange={handleChange}
                            input={<OutlinedInput label="Country Code" />}
                            sx={{
                                "& .MuiOutlinedInput-input": {
                                    lineHeight: "3.5",
                                    paddingTop: "14px",
                                    paddingBottom: "14px",
                                },
                            }}
                        >
                            {countryCodes.map((country) => (
                                <MenuItem key={country.code} value={country.code}>
                                    {country.name} ({country.code})
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={9}>
                    <TextField
                        fullWidth
                        label="Mobile"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        error={!!errors.mobile}
                        helperText={errors.mobile || ""}
                        inputProps={{ maxLength: 10 }}
                        onKeyDown={(e) => {
                            if (!/[0-9]/.test(e.key) && e.key !== "Backspace") {
                                e.preventDefault();
                            }
                        }}
                    />
                </Grid>

                <Grid item xs={6}>
                    <FormControl fullWidth error={!!errors.category_name}>
                        <InputLabel>Category Name</InputLabel>
                        <Select
                            name="category_id"
                            value={formData.category_id}
                            onChange={(e) => {
                                const selectedId = e.target.value;
                                const selectedCat = categories.find(cat => cat.category_id === selectedId);
                                setSelectedCategory(selectedCat?.category_name || "");
                                handleChange(e);
                            }}
                            input={<OutlinedInput label="Category Name" />}
                            disabled={loadingCategories}
                            sx={{
                                "& .MuiOutlinedInput-input": {
                                    lineHeight: "3.5",
                                    paddingTop: "14px",
                                    paddingBottom: "14px",
                                },
                            }}
                        >
                            {categories.map((category) => (
                                <MenuItem key={category.id} value={category.category_id}>
                                    {category.category_name}
                                </MenuItem>
                            ))}
                        </Select>
                        {errors.category_id && (
                            <MDTypography color="error">{errors.category_id}</MDTypography>
                        )}
                    </FormControl>
                </Grid>

                <Grid item xs={6}>
                    <FormControl fullWidth error={!!errors.product}>
                        <InputLabel>Product Name</InputLabel>
                        <Select
                            multiple
                            name="product"
                            value={Array.isArray(formData.product) ? formData.product : []}
                            onChange={handleMultiSelectChange}
                            input={<OutlinedInput label="Product Name" />}
                            disabled={!selectedCategory}
                            sx={{
                                "& .MuiOutlinedInput-input": {
                                    lineHeight: "3.5",
                                    paddingTop: "14px",
                                    paddingBottom: "14px",
                                },
                            }}
                        >
                            {availableProducts.map((product) => (
                                <MenuItem key={product.id} value={product.name}>
                                    {product.name}
                                </MenuItem>
                            ))}
                        </Select>
                        {errors.product && (
                            <MDTypography color="error">{errors.product}</MDTypography>
                        )}
                    </FormControl>
                </Grid>
            </Grid>

            <MDBox mt={3} display="flex" justifyContent="space-between">
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

export default SupplierInfo;
