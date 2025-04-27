import React, { useState, useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import {
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Card,
  Divider,
  IconButton,
  Autocomplete,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import generatePDF from "./components/ReturnPDF";
import { fakeCustomers } from "data";
import { fakeInvoiceDetails } from "data";
import { fakeProducts } from "data";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: "1px solid #ddd",
  padding: theme.spacing(1),
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ReturnProduct = () => {
  // For the product table rows
  const [rows, setRows] = useState([
    { id: Date.now(), productCode: "", productName: "", qty: "", rate: "", expdate: '', mrp: "0", amount: "0" },
  ]);


  // New states for customer, invoice, and batch details
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerName, setCustomerName] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().slice(0, 10)); // Auto-fill today's date
  const [batchNo, setBatchNo] = useState("");

  // Instead of API calls, use fake data for customers
  useEffect(() => {
    // Simulate an API call with fake data
    setCustomers(fakeCustomers);
  }, []);

  // When a customer is selected, update customerName and fetch invoice & batch details
  const handleCustomerSelect = (event, value) => {
    setSelectedCustomer(value);
    if (value) {
      setCustomerName(value.name);
      // Simulate an API call by retrieving fake invoice details from our mapping
      const details = fakeInvoiceDetails[value.id];
      if (details) {
        setInvoiceNo(details.invoiceNo);
        setBatchNo(details.batchNo);
      }
    } else {
      setCustomerName("");
      setInvoiceNo("");
      setBatchNo("");
    }
  };

  const calculateAmount = (pack, qty, rate, disc1, disc2) => {
    const packsize = parseFloat(pack) || 0;
    const quantity = parseFloat(qty) || 0;
    const price = parseFloat(rate) || 0;
    const discount1 = parseFloat(disc1) || 0;
    const discount2 = parseFloat(disc2) || 0;

    let amount = quantity * price;
    amount -= amount * (discount1 / 100);
    amount -= amount * (discount2 / 100);

    return amount.toFixed(2);
  };

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;

    // Auto-calculate Amount (Qty * Rate)
    if (field === "qty") {
      const qty = parseFloat(value) || 0;
      const rate = parseFloat(updatedRows[index].rate) || 0;
      updatedRows[index].amount = qty * rate;
    }

    setRows(updatedRows);
  };

  const addRow = () => {
    setRows([...rows,
    { id: Date.now(), productCode: "", productName: "", qty: 1, rate: 0, expDate: "", mrp: 0, amount: 0 }]);
  };


  const deleteRow = (index) => {
    if (rows.length > 1) {
      setRows(rows.filter((_, i) => i !== index));
    } else {
      console.log("❌ Cannot delete the last row.");
    }
  };

  // Handles product selection
  const handleProductSelect = (index, product) => {
    if (product) {
      const updatedRows = [...rows];
      updatedRows[index] = {
        ...updatedRows[index],
        productCode: product.productCode,
        productName: product.productName,
        rate: product.rate,
        expDate: product.expDate,
        mrp: product.mrp,
        amount: updatedRows[index].qty * product.rate, // Calculate amount immediately
      };
      setRows(updatedRows);
    }
  };


  const grandTotal = rows.reduce((sum, row) => sum + parseFloat(row.amount || 0), 0);
  // const grandTotal = subtotal ;

  const company = {
    name: "MyCompany Ltd.",
    address: "123 Business St, City, Country",
    contact: "+1 (555) 123-4567",
    website: "https://mycompany.com",
  };

  const customer = {
    name: customerName || "Unknown Customer",
    address: "456 Customer St, City, Country",
    email: "customer@example.com",
  };

  const logo = "path_to_logo_or_base64_string"; // Replace with an actual logo path

  const handleSubmit = () => {
    if (!customerName.trim()) {
      alert("❌ Please select a customer.");
      return;
    }

    if (!invoiceNo.trim() || !invoiceDate.trim()) {
      alert("❌ Please enter Invoice Number and Date.");
      return;
    }

    if (rows.length === 0 || rows.every((row) => row.product.trim() === "")) {
      alert("❌ Please add at least one product.");
      return;
    }

    // Create totals object for passing to generatePDF
    const totals = {
      grandTotal: grandTotal,
    };

    console.log("📜 Generating Invoice PDF with:", {
      customer,
      rows,
      invoiceNo,
      invoiceDate,
      totals,
    });

    // Generate the PDF (this function remains unchanged)
    generatePDF(
      company,
      customer,
      { number: invoiceNo, date: invoiceDate, dueDate: "" },
      rows,
      totals,
      logo
    );

    // For now, simulate saving to a database by logging the payload
    const payload = {
      customerId: selectedCustomer?.id,
      customerName,
      invoiceNo,
      invoiceDate,
      batchNo,
      products: rows,
      totals,
    };

    console.log("Saving return details to database:", payload);
    alert("Return details have been simulated as saved!");
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box sx={{ p: { sm: 0, md: 3 } }}>
        <Card sx={{ p: 3, margin: "auto" }}>
          <MDTypography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" } }}
          >
            Return Product
          </MDTypography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                options={customers}
                getOptionLabel={(option) => option.name}
                onChange={handleCustomerSelect}
                renderInput={(params) => (
                  <TextField {...params} label="Customer Name / Dr. Name" variant="outlined" />
                )}
                sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Invoice No"
                variant="outlined"
                value={invoiceNo}
                onChange={(e) => setInvoiceNo(e.target.value)}
                sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                value={invoiceDate}
                onChange={(e) => setInvoiceDate(e.target.value)}
                sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
              />
            </Grid>
          </Grid>

          <TableContainer component={Paper} sx={{ mt: 3, border: "1px solid #ddd", width: "100%" }}>
            <Table sx={{ minWidth: 650, borderCollapse: "separate", borderSpacing: 0, tableLayout: "fixed", width: "100%" }}>
              <TableHead sx={{ display: "contents" }}>
                <TableRow>
                  <StyledTableCell sx={{ width: "20%" }}>Product Code</StyledTableCell>
                  <StyledTableCell sx={{ width: "20%" }}>Product Name</StyledTableCell>
                  <StyledTableCell sx={{ width: "10%" }}>Qty</StyledTableCell>
                  <StyledTableCell sx={{ width: "10%" }}>Rate</StyledTableCell>
                  <StyledTableCell sx={{ width: "10%" }}>Exp Date</StyledTableCell>
                  <StyledTableCell sx={{ width: "10%" }}>MRP</StyledTableCell>
                  <StyledTableCell sx={{ width: "10%" }}>Amount</StyledTableCell>
                  <StyledTableCell sx={{ width: "10%" }}>Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <StyledTableRow key={row.id}>
                    {/* Product Selection */}
                    <TableCell>
                      <Autocomplete
                        options={fakeProducts}
                        getOptionLabel={(option) => option.productName}
                        onChange={(event, value) => handleProductSelect(index, value)}
                        renderInput={(params) => <TextField {...params} label="Select Product" variant="outlined" />}
                      />
                    </TableCell>

                    {/* Product Details */}
                    <TableCell><TextField value={row.productCode} disabled /></TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        value={row.qty}
                        onChange={(e) => handleInputChange(index, "qty", e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            addRow();
                          }
                        }}
                        inputProps={{ min: 1 }}
                      />
                    </TableCell>
                    <TableCell><TextField value={row.rate} disabled /></TableCell>
                    <TableCell><TextField value={row.expDate} disabled /></TableCell>
                    <TableCell><TextField value={row.mrp} disabled /></TableCell>
                    <TableCell><TextField value={row.amount} disabled /></TableCell>

                    {/* Delete Button */}
                    <TableCell>
                      <IconButton onClick={() => deleteRow(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid item xs={6}>
              <MDTypography variant="h6" sx={{ fontSize: { sm: "0.7rem", md: "1.25rem" } }}>
                Additional Details
              </MDTypography>
              <TextField
                fullWidth
                label="Batch No"
                variant="outlined"
                value={batchNo}
                disabled
                sx={{ mb: 1, fontSize: { sm: "0.7rem", md: "1.25rem" } }}
              />
              <TextField
                fullWidth
                label="Challan No"
                variant="outlined"
                sx={{ mb: 1, fontSize: { sm: "0.7rem", md: "1.25rem" } }}
              />
            </Grid>
            <Grid item xs={6}>
              <MDTypography variant="h6" sx={{ fontSize: { sm: "1.25rem", md: "1.25rem" } }}>
                Summary
              </MDTypography>
              <TextField
                fullWidth
                label="Grand Total"
                variant="outlined"
                value={`$${grandTotal.toFixed(2)}`}
                disabled
                sx={{ mb: 1, fontSize: { xs: "0.875rem", sm: "1rem" } }}
              />
            </Grid>
          </Grid>

          <MDBox sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
            <MDButton variant="outlined" color="secondary">
              Cancel
            </MDButton>
            <MDButton variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </MDButton>
          </MDBox>
        </Card>
      </Box>
    </DashboardLayout>
  );
};

export default ReturnProduct;
