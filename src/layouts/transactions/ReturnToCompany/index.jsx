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
  Card,
  Divider,
  IconButton,
  Autocomplete,
  Grid,
  FormControl,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { fakeInvoiceDetails, fakeProducts } from "data";
import MDBox from "components/MDBox";
import { fakeCompanies } from "data";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: "1px solid #ddd",
  padding: theme.spacing(1),
  minWidth: "10rem",
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// ✅ Fixed table header array
const tableHeaders = [
  { key: "productCode", label: "Product Code" },
  { key: "productName", label: "Product Name" },
  { key: "type", label: "Type" },
  { key: "qty", label: "Quantity" },
  { key: "free", label: "Free" },
  { key: "rate", label: "Rate" },
  { key: "discount", label: "Discount (%)" },
  { key: "expDate", label: "Expiry Date" },
  { key: "amount", label: "Amount" },
  { key: "batchNo", label: "Batch No" },
];

const ReturnToCompany = () => {
  const [rows, setRows] = useState([
    {
      productCode: "",
      productName: "",
      type: "",
      qty: 1,
      free: 0,
      rate: "",
      discount: 10,
      expDate: "",
      amount: "0",
      batchNo: "",
    },
  ]);

  const [company, setCompany] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  // const [customerDetails, setCustomerDetails] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().slice(0, 10));

  useEffect(() => {
    setCompany(fakeCompanies);
  }, []);
//   console.log("company", company);

  const handleCustomerSelect = (event, value) => {
    // console.log("customer selected:", value);
    if (value) {
      setSelectedCustomer(value);
      // setCustomerName(value.name);
      const details = fakeInvoiceDetails[value.id];
      if (details) {
        setInvoiceNo(details.invoiceNo);
      }
    } else {
      setSelectedCustomer('');
      // setCustomerName("");
      setInvoiceNo("");
    }
  };

  const handleProductChange = (index, value, field) => {
    const selectedProduct = fakeProducts.find((p) => p[field] === value);
    if (selectedProduct) {
      const newRows = [...rows];
      newRows[index] = {
        ...newRows[index],
        productCode: selectedProduct.productCode,
        productName: selectedProduct.productName,
        type: selectedProduct.type || "",
        rate: selectedProduct.rate || "",
        qty: 1,
        free: 0,
        discount: 10,
        expDate: selectedProduct.expDate || "",
        amount: "0",
        batchNo: selectedProduct.batchNo || "",
      };
      setRows(newRows);
      calculateAmount(index, newRows);
    }
  };

  const deleteRow = (index) => {
    if (rows.length > 1) {
      setRows(rows.filter((_, i) => i !== index));
    } else {
      console.log("❌ Cannot delete the last row.");
    }
  };

  const handleInputChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
    calculateAmount(index, newRows);
  };

  const calculateAmount = (index, currentRows) => {
    const qty = parseFloat(currentRows[index].qty) || 0;
    const rate = parseFloat(currentRows[index].rate) || 0;
    const discount = parseFloat(currentRows[index].discount) || 0;
    const amount = (qty * rate * (1 - discount / 100)).toFixed(2);
    const newRows = [...currentRows];
    newRows[index].amount = amount;
    setRows(newRows);
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Enter" && index === rows.length - 1) {
      setRows([
        ...rows,
        {
          productCode: "",
          productName: "",
          type: "",
          rate: "",
          qty: 1,
          free: 0,
          discount: 10,
          expDate: "",
          amount: "0",
          batchNo: "",
        },
      ]);
    }
  };
  const grandTotal = rows.reduce((sum, row) => sum + parseFloat(row.amount || 0), 0);

  const logo = "path_to_logo_or_base64_string"; // Replace with an actual logo path
  // console.log("rows", rows,rows.length,rows.every((row) => !row.productName|| row.productName.trim() === ""));
  const handleSubmit = () => {
    if (selectedCustomer === '') {
      alert("❌ Please select a customer.");
      return;
    }
  
    if (!invoiceNo.trim() || !invoiceDate.trim()) {
      alert("❌ Please enter Invoice Number and Date.");
      return;
    }
   
  
    if (rows.length === 0 || rows.every((row) => !row.productName || row.productName.trim() === "")) {
      alert("❌ Please add at least one product.");
      return;
    }
  
    // Create totals object for passing to generatePDF
    const totals = {
      grandTotal: grandTotal,
    };
  
    console.log("📜 Generating Invoice PDF with:", {
      selectedCustomer,
      rows,
      invoiceNo,
      invoiceDate,
      totals,
    });
  
    // Simulate saving to a database
    const payload = {
      customerId: selectedCustomer?.id,
      selectedCustomer,
      invoiceNo,
      invoiceDate,
      products: rows,
      totals,
    };
  
    console.log("Saving return details to database:", payload);
  };
  

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box sx={{ p: { sm: 0, md: 3 } }}>
        <Card sx={{ p: 3, margin: "auto" }}>
          <MDTypography variant="h4" align="center" gutterBottom>
           Return To Comapnay
          </MDTypography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2} alignItems="stretch">
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth sx={{ height: "100%" }}>
                <Autocomplete
                  options={company}
                  getOptionLabel={(option) => option.companyName}
                  onChange={handleCustomerSelect}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Company Name"
                      variant="outlined"
                      fullWidth
                      sx={{ height: "100%" }}
                    />
                  )}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      padding: "5px",
                    },
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Invoice No"
                variant="outlined"
                value={invoiceNo}
                onChange={(e) => setInvoiceNo(e.target.value)}
                sx={{ height: "100%" }}
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
                sx={{ height: "100%" }}
              />
            </Grid>
          </Grid>
          <TableContainer component={Paper} sx={{ mt: 3, maxHeight: "60vh", overflowY: "auto" }}>
            <Table stickyHeader sx={{ minWidth: 900 }}>
              <TableHead sx={{ display: "contents" }}>
                <TableRow>
                  {tableHeaders.map(({ key, label }) => (
                    <StyledTableCell key={key} align="center" sx={{ backgroundColor: "#8bc9ebde" }}>
                      {label}
                    </StyledTableCell>
                  ))}
                  <StyledTableCell align="left" sx={{ backgroundColor: "#8bc9ebde" }}>Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <StyledTableRow key={index}>
                    {tableHeaders.map(({ key }) => (
                      <StyledTableCell key={key} align="left">
                        {key === "productCode" || key === "productName" ? (
                          <Autocomplete
                            options={fakeProducts.map((p) => p[key])}
                            value={row[key] || null}
                            onChange={(event, newValue) => handleProductChange(index, newValue, key)}
                            filterOptions={(options, { inputValue }) =>
                              options.filter((option) =>
                                option.toLowerCase().includes(inputValue.toLowerCase())
                              )
                            }
                            getOptionLabel={(option) => option || ""}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="outlined"
                                size="small"
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                placeholder="Search and select..."
                              />
                            )}
                            fullWidth
                          />
                        ) : (
                          <TextField
                            value={row[key]}
                            onChange={(e) => handleInputChange(index, key, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            variant="outlined"
                            size="small"
                            disabled={key === "amount"}
                            sx={{ width: "100%" }}
                          />
                        )}
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

          <Divider sx={{ mb: 2 }} />
          <Grid item xs={6}>
            <MDTypography variant="h6" sx={{ fontSize: { sm: "1.25rem", md: "1.25rem" } }}>
              Summary
            </MDTypography>
            <Divider sx={{ mb: 2 }} />
            <TextField
              fullWidth
              label="Grand Total"
              variant="outlined"
              value={`$${grandTotal.toFixed(2)}`}
              disabled
              sx={{ mb: 1, fontSize: { xs: "0.875rem", sm: "1rem" } }}
            />
          </Grid>
          <Divider sx={{ mb: 2 }} />
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
    </DashboardLayout >
  );
};

export default ReturnToCompany;
