import React, { useEffect, useState } from "react";
import {
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
  LinearProgress,
  MenuItem,
  Select,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import { supplierList, updateSupplier, deleteSupplier } from "api/setUp/supplier";
import { useStateManage } from "contextApi/SateManage";
import { catagoryAlllist } from "api/setUp/category";
import { productListByCategory } from "api/setUp/product";

const SuppliersDetails = ({ addSupplier }) => {
  const [data, setData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const { shop_id } = useStateManage();
  const itemsPerPage = 10;
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    if (shop_id) {
      fetchData(currentPage);
      fetchCategories();
    }
  }, [addSupplier, currentPage, shop_id]);

  useEffect(() => {
    if (shop_id && selectedCategoryId) {
      fetchProduct(selectedCategoryId);
    }
  }, [selectedCategoryId]);

  const fetchCategories = async () => {
    try {
      const res = await catagoryAlllist(shop_id);
      setCategories(res?.categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchData = async (page) => {
    try {
      const response = await supplierList(shop_id, page, itemsPerPage);
      setData(response.suppliers || []);
      setTotalPages(response.totalPages || 1);
    } catch (error) {
      console.error("Error fetching supplier data:", error);
    }
  };

  const fetchProduct = async (categoryId) => {
    try {
      const response = await productListByCategory({ shop_id, category_id: categoryId });
      setProductData(response.products || []);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditFormData({
      supplier_id: item.supplier_id,
      supplier_name: item.supplier_name || "",
      address: item.address || "",
      mobile: item.mobile || "",
      category_name: item.category_name || "",
      category_id: item.category_id || "",
      product_name: item.product || "",
    });
    setSelectedCategoryId(item.category_id);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditFormData({});
    setProductData([]);
  };

  const handleEditChange = (field, value) => {
    setEditFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (id) => {
    setLoading(true);
    try {
      const payload = {
        ...editFormData,
        category_id: selectedCategoryId,
        product: [editFormData.product_name],
        shop_id,
      };

      await updateSupplier(shop_id, id, payload);
      setEditingId(null);
      setEditFormData({});
      await fetchData(currentPage);
    } catch (error) {
      console.error("Error updating supplier:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this supplier?")) {
      setLoading(true);
      try {
        await deleteSupplier(shop_id, id);
        await fetchData(currentPage);
      } catch (error) {
        console.error("Error deleting supplier:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Card sx={{ p: 2, mb: 4, borderRadius: 3, boxShadow: 4 }}>
      <MDBox mb={2}>
        <MDTypography variant="h5" fontWeight="medium">
          Suppliers List
        </MDTypography>
      </MDBox>

      {loading && <LinearProgress sx={{ mb: 2 }} />}

      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead sx={{display:"contents"}}>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell><strong>Supplier ID</strong></TableCell>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Address</strong></TableCell>
              <TableCell><strong>Mobile</strong></TableCell>
              <TableCell><strong>Category</strong></TableCell>
              <TableCell><strong>Product</strong></TableCell>
              <TableCell align="center"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{item.supplier_id}</TableCell>
                <TableCell>
                  {editingId === item.id ? (
                    <MDInput
                      value={editFormData.supplier_name}
                      variant="standard"
                      onChange={(e) => handleEditChange("supplier_name", e.target.value)}
                    />
                  ) : (
                    item.supplier_name
                  )}
                </TableCell>
                <TableCell>
                  {editingId === item.id ? (
                    <MDInput
                      value={editFormData.address}
                      variant="standard"
                      onChange={(e) => handleEditChange("address", e.target.value)}
                    />
                  ) : (
                    item.address
                  )}
                </TableCell>
                <TableCell>
                  {editingId === item.id ? (
                    <MDInput
                      value={editFormData.mobile}
                      variant="standard"
                      onChange={(e) => handleEditChange("mobile", e.target.value)}
                    />
                  ) : (
                    item.mobile
                  )}
                </TableCell>
                <TableCell>
                  {editingId === item.id ? (
                    <Select
                      fullWidth
                      variant="standard"
                      value={editFormData.category_name || ""}
                      onChange={(e) => {
                        const selected = categories.find(
                          (cat) => cat.category_name === e.target.value
                        );
                        setSelectedCategoryId(selected?.category_id || "");
                        setEditFormData((prev) => ({
                          ...prev,
                          category_name: e.target.value,
                          category_id: selected?.category_id,
                          product_name: "", // reset product
                        }));
                      }}
                    >
                      {categories.map((cat) => (
                        <MenuItem key={cat.category_id} value={cat.category_name}>
                          {cat.category_name}
                        </MenuItem>
                      ))}
                    </Select>
                  ) : (
                    item.category_name
                  )}
                </TableCell>
                <TableCell>
                  {editingId === item.id ? (
                    <Select
                      fullWidth
                      variant="standard"
                      value={editFormData.product_name || ""}
                      onChange={(e) => handleEditChange("product_name", e.target.value)}
                    >
                      {productData.map((product) => (
                        <MenuItem key={product.product_id} value={product.product_name}>
                          {product.product_name}
                        </MenuItem>
                      ))}
                    </Select>
                  ) : (
                    item.product
                  )}
                </TableCell>
                <TableCell align="center">
                  {editingId === item.id ? (
                    <>
                      <IconButton color="primary" onClick={() => handleSave(item.supplier_id)}>
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
                      <IconButton color="error" onClick={() => handleDelete(item.supplier_id)}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
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
  );
};

export default SuppliersDetails;
