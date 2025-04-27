import { useState, useEffect } from "react";
import {
    Grid,
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    OutlinedInput,
    Card,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

const initialSuppliers = [
    { id: 1, supplier_name: "ABC Ltd", address: "New York", mobile: "1234567890", category_name: "Electronics", product_names: ["Laptop"] },
    { id: 2, supplier_name: "XYZ Corp", address: "London", mobile: "9876543210", category_name: "Groceries", product_names: ["Rice"] },
];

const EditSupplier = () => {
    const [suppliers] = useState(initialSuppliers);
    const [supplier, setSupplier] = useState(initialSuppliers[0]);
    const [searchId, setSearchId] = useState(initialSuppliers[0].id.toString());
    const [errors, setErrors] = useState({});
    const [openDialog, setOpenDialog] = useState(false);

    const categories = ["Electronics", "Pharmaceuticals", "Groceries"];
    const productsByCategory = {
        Electronics: ["Laptop", "Smartphone", "Tablet"],
        Pharmaceuticals: ["Painkiller", "Antibiotic", "Vitamin C"],
        Groceries: ["Rice", "Flour", "Sugar"],
    };

    const handleSearch = () => {
        const foundSupplier = suppliers.find((s) => s.id.toString() === searchId);
        if (foundSupplier) {
            setSupplier(foundSupplier);
            setErrors({});
        } else {
            setSupplier(null);
        }
    };

    const validate = () => {
        let tempErrors = {};
        if (!supplier.supplier_name) tempErrors.supplier_name = "Required.";
        if (!supplier.address) tempErrors.address = "Required.";
        if (!supplier.mobile || !/^[0-9]{10}$/.test(supplier.mobile)) tempErrors.mobile = "Must be a 10-digit number.";
        if (!supplier.category_name) tempErrors.category_name = "Required.";
        if (supplier.product_names.length === 0) tempErrors.product_names = "Select at least one product.";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSupplier({ ...supplier, [name]: value, ...(name === "category_name" ? { product_names: [] } : {}) });
    };

    const handleMultiSelectChange = (event) => {
        setSupplier({ ...supplier, product_names: event.target.value });
    };

    const handleSubmit = () => {
        if (validate()) setOpenDialog(true);
    };

    const confirmSubmit = () => {
        setOpenDialog(false);
        alert("Supplier updated successfully!");
    };

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox mt={5} mb={9}>
                <Grid container justifyContent="center">
                    <Grid item xs={12} lg={8}>
                        <Card>
                            <MDBox p={3}>
                                <TextField fullWidth label="Search Supplier by ID" value={searchId} onChange={(e) => setSearchId(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleSearch()} />
                                <Button onClick={handleSearch} variant="contained" color="primary" sx={{ mt: 2 }}>
                                    Search
                                </Button>
                            </MDBox>
                            {supplier && (
                                <MDBox p={3}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField fullWidth label="Supplier Name" name="supplier_name" value={supplier.supplier_name} onChange={handleChange} error={!!errors.supplier_name} helperText={errors.supplier_name || ""} />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField fullWidth label="Address" name="address" value={supplier.address} onChange={handleChange} error={!!errors.address} helperText={errors.address || ""} />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField fullWidth label="Mobile" name="mobile" type="tel" value={supplier.mobile} onChange={handleChange} error={!!errors.mobile} helperText={errors.mobile || ""} />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <FormControl fullWidth error={!!errors.category_name}>
                                                <InputLabel>Category</InputLabel>
                                                <Select name="category_name" value={supplier.category_name} onChange={handleChange}
                                                    sx={{
                                                        "& .MuiOutlinedInput-input": {
                                                            lineHeight: "3.5",
                                                            paddingTop: "14px",
                                                            paddingBottom: "14px",
                                                        },
                                                    }}
                                                    input={<OutlinedInput label="Category" />}>
                                                    {categories.map((category) => (
                                                        <MenuItem key={category} value={category}>
                                                            {category}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControl fullWidth error={!!errors.product_names}>
                                                <InputLabel>Products</InputLabel>
                                                <Select multiple name="product_names" value={supplier.product_names} onChange={handleMultiSelectChange}
                                                    sx={{
                                                        "& .MuiOutlinedInput-input": {
                                                            lineHeight: "3.5",
                                                            paddingTop: "14px",
                                                            paddingBottom: "14px",
                                                        },
                                                    }}
                                                    input={<OutlinedInput label="Products" />}>
                                                    {(productsByCategory[supplier.category_name] || []).map((product) => (
                                                        <MenuItem key={product} value={product}>
                                                            {product}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                    <MDBox mt={3} display="flex" justifyContent="space-between">
                                        <MDButton variant="outlined" color="secondary">
                                            Cancel
                                        </MDButton>
                                        <MDButton variant="contained" color="primary" onClick={handleSubmit}>
                                            Submit
                                        </MDButton>
                                    </MDBox>
                                </MDBox>
                            )}
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
            <Footer />
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Confirm Edit</DialogTitle>
                <DialogContent>Are you sure you want to save changes?</DialogContent>
                <DialogActions>
                    <MDButton onClick={() => setOpenDialog(false)} color="secondary">
                        Cancel
                    </MDButton>
                    <MDButton onClick={confirmSubmit} color="primary">
                        Confirm
                    </MDButton>
                </DialogActions>
            </Dialog>
        </DashboardLayout>
    );
};

export default EditSupplier;
