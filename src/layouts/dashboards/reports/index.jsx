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
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import dayjs from "dayjs";
import { invoice_items, invoices } from "../../../InvoiceData";
import DataTable from "./componets/DataTable";
import VerticalBarChart from "examples/Charts/BarCharts/VerticalBarChart";
import DefaultLineChart from "examples/Charts/LineCharts/DefaultLineChart";
import DefaultStatisticsCard from "examples/Cards/StatisticsCards/DefaultStatisticsCard";
import ReturnSummary from "./returnSummary";
import PurchaseSammary from "./purchaseSummary";
import ExpairySummary from "./expairySummary";




// Get the oldest invoice date
const oldestDate = invoice_items.reduce(
    (oldest, invoice) =>
        dayjs(invoice.invoiceDate).isBefore(dayjs(oldest)) ? invoice.invoiceDate : oldest,
    invoice_items[0].invoiceDate
);

const ReportsSummary = () => {
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

    const sortedInvoices = [...invoices].sort((a, b) =>
        new Date(a.invoice_date) - new Date(b.invoice_date)
    );

    const labels = sortedInvoices.map((inv) =>
        dayjs(inv.invoice_date).format("MMM YYYY")
    );
    const data = sortedInvoices.map((inv) => inv.grand_total);

    const invoiceLineChartData = {
        labels,
        datasets: [
            {
                label: "Total Revenue",
                color: "info",
                data,
            },
        ],
    };

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
        <DashboardLayout>
            <DashboardNavbar />
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

                <MDBox mb={3}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={4}>
                            <DefaultStatisticsCard
                                title="sales"
                                count="$230,220"
                                percentage={{
                                    color: "success",
                                    value: "+55%",
                                    label: "since last month",
                                }}
                                // dropdown={{
                                //     action: openSalesDropdown,
                                //     menu: renderMenu(salesDropdown, closeSalesDropdown),
                                //     value: salesDropdownValue,
                                // }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <DefaultStatisticsCard
                                title="customers"
                                count="3.200"
                                percentage={{
                                    color: "success",
                                    value: "+12%",
                                    label: "since last month",
                                }}
                                // dropdown={{
                                //     action: openCustomersDropdown,
                                //     menu: renderMenu(customersDropdown, closeCustomersDropdown),
                                //     value: customersDropdownValue,
                                // }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <DefaultStatisticsCard
                                title="avg. revenue"
                                count="$1.200"
                                percentage={{
                                    color: "secondary",
                                    value: "+$213",
                                    label: "since last month",
                                }}
                                // dropdown={{
                                //     action: openRevenueDropdown,
                                //     menu: renderMenu(revenueDropdown, closeRevenueDropdown),
                                //     value: revenueDropdownValue,
                                // }}
                            />
                        </Grid>
                    </Grid>
                </MDBox>

                {/* Middle Section: Two Cards (Table & Bar Chart) */}
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Card sx={{ p: 3, boxShadow: 3, borderRadius: 2, minHeight: "32rem" }}>
                            <MDTypography variant="h6" fontWeight="medium" mb={2}>Product List</MDTypography>
                            <DataTable data={distinctproduct} />
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card sx={{ p: 3, boxShadow: 3, borderRadius: 2, minHeight: "32rem"}}>
                            <MDTypography variant="h6" fontWeight="medium" mb={2}>Product Sales Chart</MDTypography>
                            <VerticalBarChart
                                icon={{ color: "dark", component: "leaderboard" }}
                                title="Product Sales"
                                height="20rem"
                                description="Sales count per product"
                                chart={verticalBarChartData}
                            />
                        </Card>
                    </Grid>
                </Grid>

                {/* Bottom Section: Full Width Line Chart */}
                <Grid container spacing={3} mt={3} >
                    <Grid item xs={12}>
                        <Card sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
                            <MDTypography variant="h6" fontWeight="medium" mb={2}>Revenue Over Time</MDTypography>
                            <DefaultLineChart
                                title="Revenue Over Time"
                                description="Visual representation of total revenue per invoice date"
                                chart={invoiceLineChartData}
                            />
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
            <MDTypography variant="h4" fontWeight="medium" mb={2}> Return Summary :</MDTypography>
            <ReturnSummary />

            <MDTypography variant="h4" fontWeight="medium" mb={2}> Purchase Summary :</MDTypography>
            <PurchaseSammary />
            <MDTypography variant="h4" fontWeight="medium" mb={2}> Expairy Summary :</MDTypography>
            <ExpairySummary />
        </DashboardLayout>
    );
};

export default ReportsSummary;
