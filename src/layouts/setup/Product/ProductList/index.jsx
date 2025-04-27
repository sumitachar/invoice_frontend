import React, { useState, useMemo, useCallback, useEffect } from "react";
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
  IconButton,
  Card,
} from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useStateManage } from "contextApi/SateManage";
import { productAllList } from "api/setUp/product";
import { useNavigate } from "react-router-dom";
import { deleteProductAPI } from "api/setUp/product";


const columnList = [
  { Header: "Code", accessor: "product_code" },
  { Header: "Cat", accessor: "category_name" },
  { Header: "Name", accessor: "product_name" },
  { Header: "Total", accessor: "total_pack" },
  { Header: "Qty/Pack", accessor: "qty_pr_pack" },
  { Header: "MFG_date", accessor: "mfg" },
  { Header: "EXP_date", accessor: "exp_date" },
  { Header: "RO_level", accessor: "ro_level" },
  { Header: "Batch", accessor: "batch" },
  { Header: "SL_rate", accessor: "sale_rate" },
  { Header: "Pack", accessor: "packing" },
  { Header: "Pack TP", accessor: "packing_tp" },
  { Header: "Pack RP", accessor: "packing_rp" },
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
        padding: "0.5rem",
        borderRadius: "5px",
      }}
    >
      <DragIndicatorIcon sx={{ mr: 1, fontSize: 18 }} />
      {column.Header}
    </MDBox>
  );
};

const ProductList = ({submitNew}) => {
  const [data, setData] = useState([]);
  const [columns] = useState(columnList);
  const [deleteProduct, setDeleteProduct] = useState(false);
  const { shop_id } = useStateManage();
  const navigate = useNavigate();
  const [columnOrder, setColumnOrder] = useState(() =>
    JSON.parse(sessionStorage.getItem("columnOrder")) ||
    columnList.map((col) => col.accessor)
  );
  const [selectedColumns, setSelectedColumns] = useState(() =>
    JSON.parse(sessionStorage.getItem("selectedColumns")) ||
    columnList.map((col) => col.accessor)
  );

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 20;

  const fetchProduct = async () => {
    try {
      const response = await productAllList({
        shop_id,
        page: currentPage,
        limit: rowsPerPage,
      });

      if (response) {
        setData(response.products); // fixed: should be response.products, not response.data
      }
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  useEffect(() => {
    if (shop_id) {
      fetchProduct();
    }
  }, [shop_id, submitNew, deleteProduct, currentPage]);
  

  const handleDelete = async(product_code)=>{
    try {
      const response = await deleteProductAPI(
        shop_id,
        product_code,
      )
      if (response) {
        setDeleteProduct(true);
        setTimeout(() => setDeleteProduct(false), 500); // reset flag
      }
      
    } catch(error){
      console.log("Error deleting Product",error)
    }
  }


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
   <MDBox >
      <DndProvider backend={HTML5Backend}>
        <MDBox pt={4} pb={3}>
          <MDTypography variant="h5" fontWeight="bold" mb={2}>
            Product Inventory
          </MDTypography>

          <MDBox display="flex" justifyContent="flex-end" mb={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleColumnButtonClick}
              sx={{
                borderRadius: "5px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                "&:hover": { boxShadow: "0 6px 12px rgba(0,0,0,0.15)" },
              }}
            >
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
              sx={{
                "& .MuiPaper-root": {
                  backgroundColor: "#e3f2fd", // gray with 50% opacity
                  width: "15rem",
                  height: "25rem",
                  overflowX: "scroll",
                  top: "200px !important", // force top offset
                  padding: 2,
                  borderRadius: 2,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                  pading: "1rem"
                },
              }}
            >
              <FormGroup sx={{ p: 1 }}>
                {columnList
                  .filter((col) => col.accessor !== "actions")
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
                          sx={{
                            '& .MuiSvgIcon-root': {
                              border: '2px solid black',
                              borderRadius: '4px',
                            },
                          }}
                        />

                      }
                      label={col.Header}
                      sx={{
                        marginBottom: "0.5rem",
                        "& .MuiCheckbox-root": {
                          color: "#1976d2",
                        },
                        "& .MuiTypography-root": {
                          fontSize: "0.875rem",
                        },
                      }}
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
                            textAlign: "center",
                            verticalAlign: "middle",
                            position: col.accessor === "actions" ? "sticky" : "static",
                            right: col.accessor === "actions" ? 0 : undefined,
                            zIndex: col.accessor === "actions" ? 1 : undefined,
                            backgroundColor: col.accessor === "actions" ? "#fff" : "inherit",
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
                                onClick={() =>
                                  navigate("/setup/product/edit_product", { state: { rowData: row } })
                                }
                              />

                              <FontAwesomeIcon
                                icon={faTrash}
                                style={{
                                  cursor: "pointer",
                                  color: "#d32f2f",
                                }}
                                onClick={(e) =>
                                  handleDelete(row.product_code)
                                }
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
   </MDBox>
   
   
  );
};

export default ProductList;
