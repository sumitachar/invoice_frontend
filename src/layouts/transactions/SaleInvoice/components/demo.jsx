import React, { useState } from "react";
import {
  TableBody,
  TableRow,
  TableCell,
  TextField,
  IconButton,
  Autocomplete,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const fakeProducts = [
  { productCode: "P001", productName: "Product 1", rate: 120, expDate: "2025-12-01", mrp: 150 },
  { productCode: "P002", productName: "Product 2", rate: 130, expDate: "2026-06-15", mrp: 160 },
];

const ReturnProductTable = () => {
  const [rows, setRows] = useState([
    { id: Date.now(), productCode: "", productName: "", qty: 1, rate: 0, expDate: "", mrp: 0, amount: 0 },
  ]);

  // Handles input changes & recalculates amount
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

  // Adds a new row
  const addRow = () => {
    setRows([...rows, { id: Date.now(), productCode: "", productName: "", qty: 1, rate: 0, expDate: "", mrp: 0, amount: 0 }]);
  };

  // Deletes a row (but keeps at least one row)
  const deleteRow = (index) => {
    if (rows.length > 1) {
      setRows(rows.filter((_, i) => i !== index));
    }
  };

  return (
    <TableBody>
      {rows.map((row, index) => (
        <TableRow key={row.id}>
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
        </TableRow>
      ))}
    </TableBody>
  );
};

export default ReturnProductTable;
