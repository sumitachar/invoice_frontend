import React, { useState, useEffect } from "react";
import {
    Card,
    MenuItem,
    Select,
    FormControl,
    Grid,
    useTheme,
} from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import dayjs from "dayjs";
import VerticalBarChart from "examples/Charts/BarCharts/VerticalBarChart";
import DefaultStatisticsCard from "examples/Cards/StatisticsCards/DefaultStatisticsCard";
import { invoice_items } from "InvoiceData";
import DataTable from "../componets/DataTable";




// Get the oldest invoice date
const oldestDate = invoice_items.reduce(
    (oldest, invoice) =>
        dayjs(invoice.invoiceDate).isBefore(dayjs(oldest)) ? invoice.invoiceDate : oldest,
    invoice_items[0].invoiceDate
);

const ExpairySummary = () => {
    const theme = useTheme();
    const [salesRange, setSalesRange] = useState("Daily");
    const [startDate, setStartDate] = useState(dayjs().format("YYYY-MM-DD"));
    const [filteredData, setFilteredData] = useState([]);
    const [productCount, setProductCount] = useState([]);
    const [distinctproduct, setDistinctproduct] = useState([]);

    const handleRangeChange = (event) => {
        const range = event.target.value;
        setSalesRange(range);

        let newStartDate = dayjs();

        switch (range) {
            case "Daily":
                newStartDate = dayjs().subtract(1, "day");
                break;
            case "Weekly":
                newStartDate = dayjs().subtract(7, "day");
                break;
            case "Monthly":
                newStartDate = dayjs().subtract(30, "day");
                break;
            case "Yearly":
                newStartDate = dayjs().subtract(365, "day");
                break;
            case "Overall":
                newStartDate = dayjs(oldestDate);
                break;
            default:
                newStartDate = dayjs();
        }

        setStartDate(newStartDate.format("YYYY-MM-DD"));
    };

    useEffect(() => {
        const updatedData = invoice_items.filter((invoice) =>
            dayjs(invoice.invoiceDate).isAfter(dayjs(startDate)) || dayjs(invoice.invoiceDate).isSame(dayjs(startDate))
        );

        setFilteredData(updatedData);
    }, [startDate]);

    useEffect(() => {
        const productCountMap = filteredData.reduce((acc, item) => {
            if (!acc[item.item_id]) {
                acc[item.item_id] = { product: item, count: 0 };
            }
            acc[item.item_id].count += 1;
            return acc;
        }, {});

        const productCountArray = Object.values(productCountMap);
        const distinctProductsArray = productCountArray.map((entry) => entry.product);

        setProductCount(productCountArray);
        setDistinctproduct(distinctProductsArray);
    }, [filteredData]);

   

  

    const verticalBarChartData = {
        labels: productCount.map(item => item.product.product),
        datasets: [
            {
                label: "Product Sales",
                color: "success",
                data: productCount.map(item => item.count),
            },
        ],
    };

    return (
            <MDBox pt={3} pb={3}>
                {/* Top Section: Right-aligned dropdown */}
                <Grid container justifyContent="flex-end" mb={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <MDTypography variant="h6" fontWeight="medium" mb={2}> Select Range :</MDTypography>
                        <FormControl fullWidth>
                            <Select
                                displayEmpty
                                value={salesRange}
                                onChange={handleRangeChange}
                                sx={{
                                    borderRadius: "8px",
                                    fontWeight: "bold",
                                    padding: "10px",
                                    border: `1px solid ${theme.palette.grey[600]}`, // Proper border color
                                    "& .MuiSelect-icon": { color: theme.palette.grey[600] }, // Dropdown arrow color
                                    "& .MuiOutlinedInput-notchedOutline": { border: "none" }, // Remove default border
                                }}
                            >
                                <MenuItem value="" disabled>
                                    Select Range
                                </MenuItem>
                                <MenuItem value="Daily">Daily</MenuItem>
                                <MenuItem value="Weekly">Weekly</MenuItem>
                                <MenuItem value="Monthly">Monthly</MenuItem>
                                <MenuItem value="Yearly">Yearly</MenuItem>
                                <MenuItem value="Overall">Overall</MenuItem>
                            </Select>
                        </FormControl>

                    </Grid>
                </Grid>

                {/* Middle Section: Two Cards (Table & Bar Chart) */}
                <Grid>
                    {/* <Grid item xs={12} md={6}> */}
                        <Card sx={{ p: 3, boxShadow: 3, borderRadius: 2, minHeight: "32rem" }}>
                            <MDTypography variant="h6" fontWeight="medium" mb={2}>Product List</MDTypography>
                            <DataTable data={distinctproduct} />
                        </Card>
                    {/* </Grid> */}
                </Grid>
            </MDBox>
    );
};

export default ExpairySummary;
