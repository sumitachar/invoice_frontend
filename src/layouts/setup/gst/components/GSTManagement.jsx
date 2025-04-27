import React, { useState, useEffect } from "react";
import {
    Grid,
    Card,
    IconButton,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Pagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { motion } from "framer-motion";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { useStateManage } from "contextApi/SateManage";
import { createGst } from "api/setUp/gst";
import { updateGst } from "api/setUp/gst";
import { softDeleteGst } from "api/setUp/gst";
import { gstList } from "api/setUp/gst";
import { catagoryAlllist } from "api/setUp/category";

const GSTManagement = () => {
    const [formData, setFormData] = useState({
        SGST: "",
        CGST: "",
        IGST: "",
        category_id: "",
    });

    const [data, setData] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editFormData, setEditFormData] = useState({ ...formData });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showForm, setShowForm] = useState(false);

    const limit = 10;
    const { shop_id } = useStateManage();

    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        try {
            const res = await catagoryAlllist(shop_id);
            setCategories(res.categories || []); // adjust according to actual response
        } catch (err) {
            console.error("Error fetching categories:", err);
        }
    };



    const fetchData = async (page) => {
        try {
            const res = await gstList(shop_id, page, limit);
            setData(res.gsts);
            setTotalPages(res.totalPages);
        } catch (err) {
            console.error("Error fetching GST data:", err);
        }
    };

    useEffect(() => {
        fetchData(currentPage);
        fetchCategories(); // load categories once
    }, [currentPage]);

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            await createGst(formData);
            setFormData({
                SGST: "",
                CGST: "",
                IGST: "",
                category_id: "",
            });
            setShowForm(false);
            fetchData(currentPage);
        } catch (err) {
            console.error("Error adding GST:", err);
        }
    };

    const handleCancel = () => {
        setFormData({
            SGST: "",
            CGST: "",
            IGST: "",
            category_id: "",
        });
        setShowForm(false);
    };

    const handleEdit = (item) => {
        setEditingId(item.id);
        setEditFormData({ ...item });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditFormData({ ...formData });
    };

    const handleEditChange = (field, value) => {
        setEditFormData({ ...editFormData, [field]: value });
    };

    const handleSave = async (id) => {
        try {
            await updateGst(id, editFormData);
            setEditingId(null);
            fetchData(currentPage); // Refresh data after successful update
        } catch (err) {
            console.error("Error updating GST:", err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this GST entry?")) {
            try {
                await softDeleteGst(id);
                fetchData(currentPage); // Refresh data after deletion
            } catch (err) {
                console.error("Error deleting GST entry:", err);
            }
        }
    };

    return (
        <div>
            {/* Form shown at the TOP */}
            {showForm ? (
                <Card sx={{ p: 3, mb: 4, boxShadow: 4, borderRadius: 3 }}>
                    <MDTypography variant="h5">Add GST Information</MDTypography>
                    <MDBox mt={3}>
                        <Grid container spacing={3}>
                            {Object.keys(formData).map((field) => (
                                <Grid item xs={12} sm={6} key={field}>
                                    {field === "category_id" ? (
                                        <select
                                            name="category_id"
                                            value={formData.category_id}
                                            onChange={handleFormChange}
                                            style={{ width: "100%", padding: "10px", borderRadius: "8px" }}
                                        >
                                            <option value="">Select Category</option>
                                            {categories.map((cat) => (
                                                <option key={cat.id} value={cat.id}>
                                                    {cat.name}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <MDInput
                                            fullWidth
                                            label={field.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                                            name={field}
                                            value={formData[field]}
                                            onChange={handleFormChange}
                                        />
                                    )}
                                </Grid>
                            ))}

                        </Grid>
                    </MDBox>
                    <MDBox mt={3} display="flex" justifyContent="space-between">
                        <MDButton variant="outlined" color="secondary" onClick={handleCancel}>
                            Cancel
                        </MDButton>
                        <MDButton variant="contained" color="primary" onClick={handleSubmit}>
                            Submit
                        </MDButton>
                    </MDBox>
                </Card>
            ) : (
                <MDBox mt={6} mb={2}>
                    <MDButton
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={() => setShowForm(true)}
                    >
                        Add New GST
                    </MDButton>
                </MDBox>
            )}

            {/* GST List */}
            <Card sx={{ p: 2, mb: 4, borderRadius: 3, boxShadow: 4 }}>
                <MDTypography variant="h5">GST List</MDTypography>
                <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
                    <Table>
                        <TableHead sx={{ display: "contents" }}>
                            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                                <TableCell>SGST</TableCell>
                                <TableCell>CGST</TableCell>
                                <TableCell>IGST</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((item, index) => (
                                <motion.tr
                                    key={item.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    style={{
                                        backgroundColor: index % 2 === 0 ? "#ffffff" : "#fafafa",
                                        borderBottom: "1px solid #e0e0e0",
                                    }}
                                >
                                    <TableCell>{editingId === item.id ? (
                                        <MDInput
                                            variant="standard"
                                            value={editFormData.SGST}
                                            onChange={(e) => handleEditChange("SGST", e.target.value)}
                                            fullWidth
                                        />
                                    ) : item.SGST}</TableCell>
                                    <TableCell>{editingId === item.id ? (
                                        <MDInput
                                            variant="standard"
                                            value={editFormData.CGST}
                                            onChange={(e) => handleEditChange("CGST", e.target.value)}
                                            fullWidth
                                        />
                                    ) : item.CGST}</TableCell>
                                    <TableCell>{editingId === item.id ? (
                                        <MDInput
                                            variant="standard"
                                            value={editFormData.IGST}
                                            onChange={(e) => handleEditChange("IGST", e.target.value)}
                                            fullWidth
                                        />
                                    ) : item.IGST}</TableCell>
                                    <TableCell>
                                        {editingId === item.id ? (
                                            <select
                                                value={editFormData.category_id}
                                                onChange={(e) => handleEditChange("category_id", e.target.value)}
                                                style={{ width: "100%", padding: "5px", borderRadius: "6px" }}
                                            >
                                                <option value="">Select Category</option>
                                                {categories.map((cat) => (
                                                    <option key={cat.id} value={cat.id}>
                                                        {cat.name}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : item.category_id}
                                    </TableCell>
                                    <TableCell>{editingId === item.id ? (
                                        <MDInput
                                            variant="standard"
                                            value={editFormData.category_id}
                                            onChange={(e) => handleEditChange("category_id", e.target.value)}
                                            fullWidth
                                        />
                                    ) : item.category_id}</TableCell>
                                    <TableCell align="center">
                                        <MDBox display="flex" justifyContent="center" gap={1}>
                                            {editingId === item.id ? (
                                                <>
                                                    <IconButton color="primary" onClick={() => handleSave(item.id)}>
                                                        <CheckIcon />
                                                    </IconButton>
                                                    <IconButton color="warning" onClick={handleCancelEdit}>
                                                        <CloseIcon />
                                                    </IconButton>
                                                </>
                                            ) : (
                                                <>
                                                    <IconButton color="success" onClick={() => handleEdit(item)}>
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton color="error" onClick={() => handleDelete(item.id)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </>
                                            )}
                                        </MDBox>
                                    </TableCell>
                                </motion.tr>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <MDBox mt={3} display="flex" justifyContent="center">
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={(e, value) => setCurrentPage(value)}
                        color="primary"
                    />
                </MDBox>
            </Card>
        </div>
    );
};

export default GSTManagement;
