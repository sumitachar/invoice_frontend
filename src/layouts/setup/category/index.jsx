import { Card, Grid } from '@mui/material';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import Footer from 'examples/Footer';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import React from 'react';
import CategoryManagement from './components/CategoryManagement';

const Category = () => {
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox mt={5} mb={9}>
                <Grid container justifyContent="center">
                    <Grid item xs={10} >
                        <CategoryManagement />
                    </Grid>
                </Grid>
            </MDBox>
            <Footer />
        </DashboardLayout>
    );
};

export default Category;
