import React, { useState, useMemo, useCallback } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  Pagination,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Popover,
} from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

const columnList = [
  { Header: "Code", accessor: "product_code" },
  { Header: "Cat", accessor: "category_name" },
  { Header: "Name", accessor: "product_name" },
  { Header: "Total", accessor: "total_pack" },
  { Header: "Qty/Pack", accessor: "qty_per_pack" },
  { Header: "MFG_date", accessor: "mfg" },
  { Header: "EXP_date", accessor: "exp_date" },
  { Header: "RO_level", accessor: "ro_level" },
  { Header: "Batch", accessor: "batch" },
  { Header: "SL_rate", accessor: "sale_rate" },
  { Header: "Pack", accessor: "packing" },
  { Header: "Pack TP", accessor: "pack_tp" },
  { Header: "Pack RP", accessor: "pack_rp" },
  { Header: "Unit TP", accessor: "unit_tp" },
  { Header: "Unit RP", accessor: "unit_rp" },
  { Header: "Stock", accessor: "unit_stock" },
  { Header: "Actions", accessor: "actions", disableReorder: true },
];

const DraggableColumn = ({ column, index, moveColumn }) => {
  const [, ref] = useDrag({
    type: "COLUMN",
    item: { index },
  });

  const [, drop] = useDrop({
    accept: "COLUMN",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveColumn(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <MDBox
      ref={(node) => ref(drop(node))}
      display="flex"
      alignItems="center"
      sx={{
        cursor: "grab",
        fontSize: "0.9rem",
        fontWeight: "bold",
        userSelect: "none",
        "&:hover": { color: "#1976d2" },
      }}
    >
      <DragIndicatorIcon sx={{ mr: 1, fontSize: 18 }} />
      {column.Header}
    </MDBox>
  );
};

const ProductList = () => {
  const [data] = useState([]);
  const [columns] = useState(columnList);
  const [columnOrder, setColumnOrder] = useState(() =>
    JSON.parse(sessionStorage.getItem("columnOrder")) ||
    columnList.map((col) => col.accessor)
  );
  const [selectedColumns, setSelectedColumns] = useState(() =>
    JSON.parse(sessionStorage.getItem("selectedColumns")) ||
    columnList.map((col) => col.accessor)
  );

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const moveColumn = useCallback((dragIndex, hoverIndex) => {
    setColumnOrder((prevOrder) => {
      const updated = [...prevOrder];
      const [moved] = updated.splice(dragIndex, 1);
      updated.splice(hoverIndex, 0, moved);
      sessionStorage.setItem("columnOrder", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const filteredColumns = useMemo(() => {
    return columnOrder
      .filter((accessor) => selectedColumns.includes(accessor))
      .map((accessor) => columns.find((col) => col.accessor === accessor))
      .filter(Boolean);
  }, [columnOrder, selectedColumns, columns]);

  const columnsWithDrag = useMemo(
    () =>
      filteredColumns.map((col, index) => ({
        ...col,
        Header: col.disableReorder ? (
          col.Header
        ) : (
          <DraggableColumn
            column={col}
            index={index}
            moveColumn={moveColumn}
          />
        ),
      })),
    [filteredColumns, moveColumn]
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Dropdown Popover State
  const [anchorEl, setAnchorEl] = useState(null);
  const handleColumnButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "select-columns-popover" : undefined;

  return (
    <DashboardLayout>
      <DndProvider backend={HTML5Backend}>
        <DashboardNavbar />
        <MDBox pt={4} pb={3}>
          <MDTypography variant="h5" fontWeight="bold" mb={2}>
            Product Inventory
          </MDTypography>

          <MDBox display="flex" justifyContent="flex-end" mb={2}>
            <Button variant="outlined" onClick={handleColumnButtonClick}>
              Select Columns
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              <FormGroup sx={{ p: 2 }}>
                {columnList
                  .filter((col) => col.accessor !== "actions") // Optional: prevent toggling 'actions'
                  .map((col) => (
                    <FormControlLabel
                      key={col.accessor}
                      control={
                        <Checkbox
                          checked={selectedColumns.includes(col.accessor)}
                          onChange={() => {
                            setSelectedColumns((prev) => {
                              const updated = prev.includes(col.accessor)
                                ? prev.filter((item) => item !== col.accessor)
                                : [...prev, col.accessor];
                              sessionStorage.setItem("selectedColumns", JSON.stringify(updated));
                              return updated;
                            });
                          }}
                        />
                      }
                      label={col.Header}
                    />
                  ))}
              </FormGroup>
            </Popover>
          </MDBox>

          <TableContainer
            component={Paper}
            elevation={3}
            sx={{
              borderRadius: 3,
              maxHeight: "75vh",
              overflow: "auto",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            }}
          >
            <Table stickyHeader>
              <TableHead style={{ display: "contents" }}>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  {columnsWithDrag.map((col, index) => (
                    <TableCell
                      key={index}
                      sx={{
                        fontWeight: "bold",
                        backgroundColor: "#f9fafb",
                        position:
                          col.accessor === "actions" ? "sticky" : "static",
                        right: col.accessor === "actions" ? 0 : undefined,
                        zIndex: col.accessor === "actions" ? 2 : 1,
                      }}
                    >
                      {col.Header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  .slice(
                    (currentPage - 1) * rowsPerPage,
                    currentPage * rowsPerPage
                  )
                  .map((row, rowIndex) => (
                    <TableRow
                      key={rowIndex}
                      sx={{
                        backgroundColor:
                          rowIndex % 2 === 0 ? "#fff" : "#f7f9fc",
                        "&:hover": {
                          backgroundColor: "#e3f2fd",
                          cursor: "pointer",
                        },
                      }}
                    >
                      {columnsWithDrag.map((col, colIndex) => (
                        <TableCell
                          key={colIndex}
                          sx={{
                            position:
                              col.accessor === "actions" ? "sticky" : "static",
                            right:
                              col.accessor === "actions" ? 0 : undefined,
                            zIndex: col.accessor === "actions" ? 1 : undefined,
                            backgroundColor:
                              col.accessor === "actions" ? "#fff" : "inherit",
                          }}
                        >
                          {col.accessor === "actions" ? (
                            <>
                              <FontAwesomeIcon
                                icon={faEdit}
                                style={{
                                  cursor: "pointer",
                                  marginRight: "10px",
                                  color: "#1976d2",
                                }}
                              />
                              <FontAwesomeIcon
                                icon={faTrash}
                                style={{
                                  cursor: "pointer",
                                  color: "#d32f2f",
                                }}
                              />
                            </>
                          ) : (
                            row[col.accessor]
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <MDBox mt={3} display="flex" justifyContent="center">
            <Pagination
              count={Math.ceil(data.length / rowsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </MDBox>
        </MDBox>
      </DndProvider>
    </DashboardLayout>
  );
};

export default ProductList;
