

import { useMemo } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

// Material Dashboard 3 PRO React components
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";

// Material Dashboard 3 PRO React examples
import SalesTableCell from "examples/Tables/SalesTable/SalesTableCell";

function SalesTable({ title, rows, shadow }) {
  const renderTableCells = rows.map((row, key) => {
    const tableRows = [];
    const rowKey = `row-${key}`;

    Object.entries(row).map(([cellTitle, cellContent]) =>
      Array.isArray(cellContent)
        ? tableRows.push(
          <SalesTableCell
            key={cellContent[1]}
            title={cellTitle}
            content={cellContent[1]}
            image={cellContent[0]}
            noBorder={key === rows.length - 1}
          />
        )
        : tableRows.push(
          <SalesTableCell
            key={cellContent}
            title={cellTitle}
            content={cellContent}
            noBorder={key === rows.length - 1}
          />
        )
    );

    return <TableRow key={rowKey}>{tableRows}</TableRow>;
  });

  return (
    <TableContainer sx={{ height: "100%", boxShadow: !shadow && "none" }}>
      <Table>
        {title ? (
          <TableHead>
            <MDBox component="tr" width="max-content" display="block" mb={1.5}>
              <MDTypography variant="h6" component="td">
                {title}
              </MDTypography>
            </MDBox>
          </TableHead>
        ) : null}
        <TableBody>{useMemo(() => renderTableCells, [rows])}</TableBody>
      </Table>
    </TableContainer>
  );
}

// Setting default values for the props of SalesTable
SalesTable.defaultProps = {
  title: "",
  rows: [{}],
  shadow: true,
};

// Typechecking props for the SalesTable
SalesTable.propTypes = {
  title: PropTypes.string,
  rows: PropTypes.arrayOf(PropTypes.object),
  shadow: PropTypes.bool,
};

export default SalesTable;
