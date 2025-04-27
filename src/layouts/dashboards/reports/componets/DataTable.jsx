import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useMaterialUIController } from "context"; // Import the context

const StyledTableCell = styled(TableCell)(({ theme, darkMode }) => ({
  border: `1px solid ${darkMode ? "#555" : "#ddd"}`,
  padding: theme.spacing(1),
  minWidth: "10rem",
  fontWeight: "bold",
  backgroundColor: darkMode ? "#424242" : "#8bc9ebde", // Dark mode & light mode background
  color: darkMode ? "#fff" : "#000", // Text color changes in dark mode
  textAlign: "center",
}));

const StyledTableRow = styled(TableRow)(({ darkMode }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: darkMode ? "#333" : "#f5f5f5", // Alternate row color
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const DataTable = ({ data }) => {
  const [controller] = useMaterialUIController(); 
  const { darkMode } = controller; // Get dark mode state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);

  useEffect(() => {
    setPage(0);
  }, [data]);

  const tableHeaders = [
    { key: "item_id", label: "Product Code" },
    { key: "product", label: "Product Name" },
    { key: "pack", label: "Type" },
    { key: "qty", label: "Quantity" },
    { key: "free", label: "Free" },
    { key: "rate", label: "Rate" },
    { key: "discount", label: "Discount (%)" },
    { key: "expDate", label: "Expiry Date" },
    { key: "net_amount", label: "Amount" },
    { key: "invoice_id", label: "Batch No" },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (!data || data.length === 0) {
    return <p style={{ color: darkMode ? "#fff" : "#000" }}>No data available.</p>;
  }

  return (
    <Box width="100%">
      <TableContainer
        component={Paper}
        sx={{
          mt: 3,
          width: "100%",
          overflowX: "auto",
          position: "relative",
          height: "20rem",
          backgroundColor: darkMode ? "#303030" : "#fff",
          color: darkMode ? "#fff" : "#000",
          "&::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: darkMode ? "#666" : "#bbb", 
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: darkMode ? "#222" : "#f1f1f1",
          },
        }}
      >
        <Table sx={{ minWidth: 900 }}>
          <TableHead sx={{ display: "contents" }}>
            <TableRow sx={{ position: "sticky", top: 0, zIndex: 1 }}>
              {tableHeaders.map((header) => (
                <StyledTableCell key={header.key} align="center" darkMode={darkMode}>
                  {header.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, index) => (
                  <StyledTableRow key={index} darkMode={darkMode}>
                    {tableHeaders.map((header) => (
                      <TableCell 
                        key={header.key} 
                        align="center" 
                        sx={{ fontSize: "0.8rem", color: darkMode ? "#fff" : "#000" }}
                      >
                        {String(item[header.key] ?? "-")}
                      </TableCell>
                    ))}
                  </StyledTableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={tableHeaders.length} align="center" sx={{ py: 3 }}>
                  No data available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Controls */}
      <Box display="flex" justifyContent="flex-end" mt={2} sx={{ width: "100%" }}>
        <TablePagination
          rowsPerPageOptions={[7, 14, 21]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage=""
          sx={{
            "& .MuiTablePagination-selectLabel": { display: "none" }, 
            "& .MuiTablePagination-input": { display: "none" },
            color: darkMode ? "#fff" : "#000",
          }}
        />
      </Box>
    </Box>
  );
};

export default DataTable;
