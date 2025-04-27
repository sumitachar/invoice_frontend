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
import generatePDF from "./components/InvoicePDF";
import { fakeCustomers } from "data";
import { fakeInvoiceDetails } from "data";



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

const SellingInvoice = () => {
  // For the product table rows
  const [rows, setRows] = useState([
    { product: "", pack: "", qty: "", free: "", rate: "", disc1: "", disc2: "", amount: "0" },
  ]);

  // New states for customer, invoice, and batch details
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerName, setCustomerName] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [data,setData] = useState("")
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().slice(0, 10)); // Auto-fill today's date
  const [batchNo, setBatchNo] = useState("");

  // Instead of API calls, use fake data for customers
  useEffect(() => {
    // Simulate an API call with fake data
    setCustomers(fakeCustomers);
  }, []);

    // const fetchProduct = async () => {
    //   try {
    //     const response = await productAllList({
    //       shop_id,
    //     });
  
    //     if (response) {
    //       setData(response.products); // fixed: should be response.products, not response.data
    //     }
    //   } catch (error) {
    //     console.error("Error loading products:", error);
    //   }
    // };
  
    // useEffect(() => {
    //   if (shop_id) {
    //     fetchProduct();
    //   }
    // }, [shop_id]);

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
    const newRows = [...rows];
    newRows[index][field] = value;

    newRows[index].amount = calculateAmount(
      newRows[index].pack,
      newRows[index].qty,
      newRows[index].rate,
      newRows[index].disc1,
      newRows[index].disc2
    );

    setRows(newRows);
  };

  const addRow = () => {
    setRows([
      ...rows,
      { product: "", pack: "", qty: "", free: "", rate: "", disc1: "", disc2: "", amount: "0" },
    ]);
  };

  const deleteRow = (index) => {
    console.log("🗑️ Deleting row at index:", index);
    if (rows.length > 1 && index >= 0) {
      const newRows = rows.filter((_, i) => i !== index);
      setRows(newRows);
    } else {
      console.log("❌ Cannot delete the last row.");
    }
  };

  const subtotal = rows.reduce((sum, row) => sum + parseFloat(row.amount || 0), 0);
  const gst = subtotal * 0.18;
  const grandTotal = subtotal + gst;

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
      subtotal: subtotal,
      tax: gst,
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
          Selling Invoice
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
            <Table
              sx={{ minWidth: 650, borderCollapse: "separate", borderSpacing: 0, tableLayout: "fixed", width: "100%" }}
            >
              <TableHead sx={{ display: "contents" }}>
                <TableRow>
                  <StyledTableCell align="left" sx={{ width: "20%" }}>Product</StyledTableCell>
                  <StyledTableCell align="left" sx={{ width: "10%" }}>Pack</StyledTableCell>
                  <StyledTableCell align="left" sx={{ width: "10%" }}>Qty</StyledTableCell>
                  <StyledTableCell align="left" sx={{ width: "10%" }}>Free</StyledTableCell>
                  <StyledTableCell align="left" sx={{ width: "10%" }}>Rate</StyledTableCell>
                  <StyledTableCell align="left" sx={{ width: "10%" }}>Discount 1 (%)</StyledTableCell>
                  <StyledTableCell align="left" sx={{ width: "10%" }}>Discount 2 (%)</StyledTableCell>
                  <StyledTableCell align="left" sx={{ width: "15%" }}>Amount</StyledTableCell>
                  <StyledTableCell align="left" sx={{ width: "10%" }}>Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <StyledTableRow key={index}>
                    {Object.keys(row).map((field) => (
                      <StyledTableCell key={field} align="left">
                        <TextField
                          value={row[field]}
                          onChange={(e) => handleInputChange(index, field, e.target.value)}
                          variant="outlined"
                          size="small"
                          disabled={field === "amount"}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              addRow();
                            }
                          }}
                          sx={{ width: "100%" }}
                        />
                      </StyledTableCell>
                    ))}
                    <StyledTableCell align="center">
                      {index > 0 && (
                        <IconButton onClick={() => deleteRow(index)}>
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </StyledTableCell>
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
                label="Expiry Date"
                type="date"
                variant="outlined"
                sx={{ mb: 1, fontSize: { sm: "0.7rem", md: "1.25rem" } }}
              />
              <TextField
                fullWidth
                label="Stock"
                variant="outlined"
                sx={{ mb: 1, fontSize: { sm: "0.7rem", md: "1.25rem" } }}
              />
              <TextField
                fullWidth
                label="MRF"
                variant="outlined"
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
                label="Value of Goods"
                variant="outlined"
                value={`$${subtotal.toFixed(2)}`}
                disabled
                sx={{ mb: 1, fontSize: { xs: "0.875rem", sm: "1rem" } }}
              />
              <TextField fullWidth label="Discount" variant="outlined" disabled sx={{ mb: 1, fontSize: { xs: "0.875rem", sm: "1rem" } }} />
              <TextField
                fullWidth
                label="GST (18%)"
                variant="outlined"
                value={`$${gst.toFixed(2)}`}
                disabled
                sx={{ mb: 1, fontSize: { xs: "0.875rem", sm: "1rem" } }}
              />
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

export default SellingInvoice;
