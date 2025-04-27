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
import { faker } from "@faker-js/faker";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { useStateManage } from "contextApi/SateManage";
import { createStore, storeList } from "api/setUp/StoreManage";
import { updateStore } from "api/setUp/StoreManage";
import { deleteStore } from "api/setUp/StoreManage";

const StoreManagement = () => {
  const [formData, setFormData] = useState({
    store_name: "",
    address: "",
    phone_number: "",
    lock_key: "",
    login_password: "",
    admin_password: "",
  });

  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({ ...formData });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showForm, setShowForm] = useState(false);

  const limit = 10;
  const { shop_id } = useStateManage();

  const fetchData = async (page) => {
    try {
      const res = await storeList(shop_id, page, limit);
      setData(res.stores);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error("Error fetching store data:", err);
    }
  };

  useEffect(() => {
    if (shop_id) fetchData(currentPage);
  }, [shop_id, currentPage]);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const dataToSend = { ...formData, shop_id };
      await createStore(dataToSend);
      setFormData({
        store_name: "",
        address: "",
        phone_number: "",
        lock_key: "",
        login_password: "",
        admin_password: "",
      });
      setShowForm(false);
      fetchData(currentPage);
    } catch (err) {
      console.error("Error adding store:", err);
    }
  };

  const handleCancel = () => {
    setFormData({
      store_name: "",
      address: "",
      phone_number: "",
      lock_key: "",
      login_password: "",
      admin_password: "",
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
      console.log("Calling updateStore API with:", editFormData);
      await updateStore(shop_id, id, editFormData);
      setEditingId(null);
      fetchData(currentPage); // Refresh the data after successful update
    } catch (err) {
      console.error("Error updating store:", err);
    }
  };
  

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this store?")) {
      try {
        await deleteStore(shop_id, id); // You must have this API function defined
        fetchData(currentPage); // Refresh the data after successful deletion
      } catch (err) {
        console.error("Error deleting store:", err.message || err);
      }
    }
  };
  

  // Generate fake store data
  const generateFakeStore = () => ({
    store_name: faker.company.name(),
    address: faker.location.streetAddress(),
    phone_number: faker.phone.number(),
    lock_key: faker.string.alphanumeric(8),
    login_password: faker.internet.password(),
    admin_password: faker.internet.password(),
  });

  const generateDummyData = (count = 5) => {
    const fakeStores = Array.from({ length: count }, generateFakeStore);
    const fakeWithIds = fakeStores.map((store, index) => ({
      ...store,
      id: Date.now() + index,
    }));
    setData((prev) => [...prev, ...fakeWithIds]);
  };

  return (
    <div>
      {/* Form shown at the TOP */}
      {showForm ? (
        <Card sx={{ p: 3, mb: 4, boxShadow: 4, borderRadius: 3 }}>
          <MDTypography variant="h5">Add Store Information</MDTypography>
          <MDBox mt={3}>
            <Grid container spacing={3}>
              {Object.keys(formData).map((field) => (
                <Grid item xs={12} sm={6} key={field}>
                  <MDInput
                    fullWidth
                    label={field.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    name={field}
                    value={formData[field]}
                    onChange={handleFormChange}
                  />
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
            variant="gradient"
            color="info"
            startIcon={<AddIcon />}
            onClick={() => setShowForm(true)}
          >
            Add New Store
          </MDButton>
          {/* <MDButton
            variant="outlined"
            color="warning"
            sx={{ ml: 2 }}
            onClick={() => generateDummyData(5)}
          >
            Generate Dummy Stores
          </MDButton> */}
        </MDBox>
      )}

      {/* Store List */}
      <Card sx={{ p: 2, mb: 4, borderRadius: 3, boxShadow: 4 }}>
        <MDTypography variant="h5">Store List</MDTypography>
        <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
          <Table>
            <TableHead sx={{ display: "contents" }}>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell>Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Lock Key</TableCell>
                <TableCell>Login Password</TableCell>
                <TableCell>Admin Password</TableCell>
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
                  {Object.keys(formData).map((field) => (
                    <TableCell key={field}>
                      {editingId === item.id ? (
                        <MDInput
                          variant="standard"
                          value={editFormData[field]}
                          onChange={(e) => handleEditChange(field, e.target.value)}
                          fullWidth
                        />
                      ) : (
                        item[field]
                      )}
                    </TableCell>
                  ))}
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

export default StoreManagement;
