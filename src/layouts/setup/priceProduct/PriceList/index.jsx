import React, { useState, useCallback } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { Checkbox, MenuItem, Select } from "@mui/material";

const initialData = [
  {
    id: 1,
    product_code: "P001",
    category_name: "Medicine",
    product_name: "Paracetamol",
    total_pack: "100",
    qty_per_pack: "",
    mfg: "2024-01-10",
    exp_date: "2026-01-10",
    ro_level: "10",
    batch: "B1234",
    sale_rate: "5.50",
    packing: "",
    pack_tp: "",
    pack_rp: "",
    unit_tp: "",
    unit_rp: "",
    unit_stock: "",
  },
];

const columnList = [
  { Header: "Product Code", accessor: "product_code" },
  { Header: "Category Name", accessor: "category_name" },
  { Header: "Product Name", accessor: "product_name" },
  { Header: "Total Items", accessor: "total_pack" },
  { Header: "Quantity/Pack", accessor: "qty_per_pack" },
  { Header: "MFG Date", accessor: "mfg" },
  { Header: "EXP Date", accessor: "exp_date" },
  { Header: "Reorder Level", accessor: "ro_level" },
  { Header: "Batch", accessor: "batch" },
  { Header: "Sale Rate", accessor: "sale_rate" },
  { Header: "Packing", accessor: "packing" },
  { Header: "Pack TP", accessor: "pack_tp" },
  { Header: "Pack RP", accessor: "pack_rp" },
  { Header: "Unit TP", accessor: "unit_tp" },
  { Header: "Unit RP", accessor: "unit_rp" },
  { Header: "Unit Stock", accessor: "unit_stock" },
  {
    Header: "Actions",
    accessor: "actions",
    disableReorder: true,
  },
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
      sx={{ cursor: "grab" }}
    >
      <DragIndicatorIcon sx={{ mr: 1 }} />
      {column.Header}
    </MDBox>
  );
};

const PriceList = () => {
  const [data, setData] = useState(initialData);
  const [columns, setColumns] = useState(columnList);
  const [selectedColumns, setSelectedColumns] = useState(columnList.map((col) => col.accessor));
  const allSelected = selectedColumns.length === columnList.length;

  const moveColumn = useCallback((dragIndex, hoverIndex) => {
    setColumns((prevColumns) => {
      const updatedColumns = [...prevColumns];
      const [movedColumn] = updatedColumns.splice(dragIndex, 1);
      updatedColumns.splice(hoverIndex, 0, movedColumn);
      return updatedColumns;
    });
  }, []);

  const handleColumnSelection = (accessor) => {
    setSelectedColumns((prev) => {
      if (prev.includes(accessor)) {
        return prev.filter((col) => col !== accessor);
      } else {
        return [...prev, accessor];
      }
    });
  };

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedColumns([]); // Deselect all
    } else {
      setSelectedColumns(columnList.map((col) => col.accessor)); // Select all
    }
  };


  const filteredColumns = columns.filter((col) => selectedColumns.includes(col.accessor));

  const columnsWithDrag = filteredColumns.map((col, index) => ({
    ...col,
    Header: col.disableReorder ? col.Header : (
      <DraggableColumn column={col} index={index} moveColumn={moveColumn} />
    ),
  }));

  return (
    <DndProvider backend={HTML5Backend}>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox pt={6} pb={3}>
          <Card>
            <MDBox p={3} lineHeight={1} display="flex" justifyContent="space-between">
              <MDTypography variant="h5" fontWeight="medium">
                Product List
              </MDTypography>
              <Select
                multiple
                value={selectedColumns}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.includes("all")) {
                    handleSelectAll();
                  } else {
                    setSelectedColumns(value);
                  }
                }}
                displayEmpty
                renderValue={() => "Select Columns"}
                sx={{ minWidth: 200, minHeight: 36 }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: "10rem",
                      overflowY: "auto",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      backdropFilter: "blur(8px)",
                      padding: "10px",
                      scrollbarWidth: "none",
                      "&::-webkit-scrollbar": { display: "none" },
                    },
                  },
                }}
              >
                <MenuItem value="all">
                  <Checkbox checked={allSelected} onClick={handleSelectAll} /> Select All
                </MenuItem>
                {columnList.map((col) => (
                  <MenuItem key={col.accessor} value={col.accessor}>
                    <Checkbox checked={selectedColumns.includes(col.accessor)} />
                    {col.Header}
                  </MenuItem>
                ))}
              </Select>

            </MDBox>
            <DataTable table={{ columns: columnsWithDrag, rows: data }} />
          </Card>
        </MDBox>
        <Footer />
      </DashboardLayout>
    </DndProvider>
  );
};

export default PriceList;
