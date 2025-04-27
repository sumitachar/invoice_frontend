import { Grid } from '@mui/material'
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'
import Footer from 'examples/Footer'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import React from 'react'
import GSTManagement from './components/GSTManagement'

const GSTManage = () => {
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox mt={5} mb={9}>
                <Grid container justifyContent="center">
                    <Grid item xs={10} >
                        <MDBox mt={6} mb={8} textAlign="center">
                            <MDBox mb={1}>
                                <MDTypography variant="h3" fontWeight="bold">
                                    GST
                                </MDTypography>
                            </MDBox>
                        </MDBox>
                        <GSTManagement />
                    </Grid>
                </Grid>
            </MDBox>
            <Footer />
        </DashboardLayout>

    )
}

export default GSTManage
