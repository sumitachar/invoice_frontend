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
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { useStateManage } from "contextApi/SateManage";
import { createCategory, catagorylist, updateCategory } from "api/setUp/category";
import { deleteCategory } from "api/setUp/category";

const CategoryManagement = () => {
  const [formData, setFormData] = useState({ category_id: "", category_name: "", description: "" });
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({ category_name: "", description: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;
  const { shop_id } = useStateManage();

  const fetchData = async (page) => {
    if (shop_id) {
      try {
        const response = await catagorylist(shop_id, page, limit);
        setData(response.categories);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    }
  };

  useEffect(() => {
    if (shop_id) {
      fetchData(currentPage);
    }
  }, [shop_id, currentPage]);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const dataToSend = { ...formData, shop_id };
    try {
      await createCategory(dataToSend);
      setFormData({ category_id: "", category_name: "", description: "" });
      fetchData(currentPage);
    } catch (err) {
      console.error("Error adding category:", err);
    }
  };

  const handleCancel = () => {
    setFormData({ category_id: "", category_name: "", description: "" });
  };

  const handleEdit = (item) => {
    
    setEditingId(item.id);
    setEditFormData({
      category_name: item.category_name,
      description: item.description,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditFormData({ category_name: "", description: "" });
  };

  const handleEditChange = (field, value) => {
    setEditFormData({ ...editFormData, [field]: value });
  };

  const handleSave = async (id, category_id) => {

    try {
      const updateData = {
        category_name: editFormData.category_name,
        description: editFormData.description,
      };
      await updateCategory(shop_id, category_id, updateData);

      const updatedList = data.map((item) =>
        item.id === id ? { ...item, ...updateData } : item
      );
      setData(updatedList);
      setEditingId(null);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        const response = await deleteCategory(id); // Pass shop_id if required
        if (response) {
          fetchData(currentPage);
        }
      } catch (error) {
        console.error("Failed to delete category:", error.message || error);
        alert("Failed to delete category. Please try again.");
      }
    }
  };
  

  return (
    <div>
      <Card sx={{ p: 2, mb: 4, borderRadius: 3, boxShadow: 4 }}>
        <Typography variant="h6" mb={2}>Category List</Typography>
        <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
          <Table className="text-xs md:text-md">
            <TableHead sx={{ display: "contents" }}>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell><strong>Category ID</strong></TableCell>
                <TableCell><strong>Category Name</strong></TableCell>
                <TableCell><strong>Description</strong></TableCell>
                <TableCell align="center"><strong>Actions</strong></TableCell>
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
                  <TableCell>{item.category_id}</TableCell>
                  <TableCell>
                    {editingId === item.id ? (
                      <MDInput
                        variant="standard"
                        value={editFormData.category_name}
                        onChange={(e) => handleEditChange("category_name", e.target.value)}
                        fullWidth
                      />
                    ) : (
                      item.category_name
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === item.id ? (
                      <MDInput
                        variant="standard"
                        value={editFormData.description}
                        onChange={(e) => handleEditChange("description", e.target.value)}
                        fullWidth
                      />
                    ) : (
                      item.description
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <MDBox display="flex" justifyContent="center" gap={1}>
                      {editingId === item.id ? (
                        <>
                          <IconButton color="primary" onClick={() => handleSave(item.id, item.category_id)}>
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

      <Card sx={{ p: 3, mb: 4, boxShadow: 4, borderRadius: 3 }}>
        <MDTypography variant="h5">Add Category Information</MDTypography>
        <MDBox mt={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <MDInput
                fullWidth
                label="Category ID"
                name="category_id"
                type="number"
                value={formData.category_id}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MDInput
                fullWidth
                label="Category Name"
                name="category_name"
                value={formData.category_name}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12}>
              <MDTypography component="label" variant="button" fontWeight="regular" color="text">
                Description
              </MDTypography>
              <MDInput
                fullWidth
                multiline
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleFormChange}
              />
            </Grid>
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
    </div>
  );
};

export default CategoryManagement;
