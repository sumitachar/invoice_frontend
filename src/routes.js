
/** 
  All of the routes for the Material Dashboard 3 PRO React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that contains other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 3 PRO React layouts
import Analytics from "layouts/dashboards/analytics";
import Sales from "layouts/dashboards/sales";
import ProfileOverview from "layouts/pages/profile/profile-overview";
import Settings from "layouts/pages/account/settings";

import MDAvatar from "components/MDAvatar";

// @mui icons
import Icon from "@mui/material/Icon";

// Images
import profilePicture from "assets/images/team-3.jpg";
import AddNewProduct from "layouts/setup/Product/AddProduct";
import EditSupplier from "layouts/setup/suppliers/EditSupplier";
import NewStore from "layouts/setup/storeInfo/NewStore";
import SaleInvoice from "layouts/transactions/SaleInvoice";
import ReturnProduct from "layouts/transactions/ReturnProduct";
import PurchaseProduct from "layouts/transactions/PurchaseProduct";
import ReturnToCompany from "layouts/transactions/ReturnToCompany";
import ReportsSummary from "layouts/dashboards/reports";
import SystemLock from "layouts/systemLock";
import CalenderSection from "layouts/utilies/calender";
import BackupData from "layouts/utilies/backupdata";
import Notepad from "layouts/utilies/notepad";
import Calculator from "layouts/utilies/calculator";
import Category from "layouts/setup/category";
import SupplierManagement from "layouts/setup/suppliers";
import GSTManage from "layouts/setup/gst";

const routes = [
  {
    type: "collapse",
    name: "Brooklyn Alice",
    key: "brooklyn-alice",
    icon: <MDAvatar src={profilePicture} alt="Brooklyn Alice" size="sm" />,
    collapse: [
      {
        name: "My Profile",
        key: "my-profile",
        route: "/pages/profile/profile-overview",
        component: <ProfileOverview />,
      },
      {
        name: "Settings",
        key: "profile-settings",
        route: "/pages/account/settings",
        component: <Settings />,
      },
      {
        name: "System Lock",
        key: "sytem-lock",
        route: "/systemLock/sytem-lock",
        component: <SystemLock />,
      }
    ],
  },
  { type: "divider", key: "divider-0" },
  {
    type: "collapse",
    name: "Dashboards",
    key: "dashboards",
    icon: <Icon fontSize="small">dashboard</Icon>,
    collapse: [
      {
        name: "Analytics",
        key: "analytics",
        route: "/dashboards/analytics",
        component: <Analytics />,
      },
      {
        name: "Sales",
        key: "sales",
        route: "/dashboards/sales",
        component: <Sales />,
      },
      {
        name: "Reports Summary",
        key: "reports-summary",
        route: "/dashboards/reports-summary",
        component: <ReportsSummary />,
      },
    ],
  },
  { type: "title", title: "Pages", key: "title-pages" },
 
  
  // #################################################################################
   // #################################################################################

    // #################################################################################
   // #################################################################################
  {
    type: "collapse",
    name: "Set Up",
    key: "setup",
    icon: <Icon fontSize="small">category</Icon>,
    collapse: [
      {
        name: "Category",
        key: "category",
        collapse: [
          {
            name: "Category Info",
            key: "category",
            route: "/setup/category/category",
            component: <Category />,
          }
        ],
      },
      {
        name: "Product",
        key: "product",
        collapse: [
          {
            name: "New Product",
            key: "new_product",
            route: "/setup/product/new_product",
            component: <AddNewProduct />,
          }
        ],
      },
      {
        name: "Supplier",
        key: "supplier",
        collapse: [
          {
            name: "Supplier Info",
            key: "supplier",
            route: "/setup/supplier/supplier",
            component: <SupplierManagement />,
          },
          {
            name: "Edit Supplier",
            key: "edit_supplier",
            route: "/setup/supplier/edit_supplier",
            component: <EditSupplier />,
          },
        ],
      },
      {
        name: "GST",
        key: "gst",
        collapse: [
          {
            name: "GST Management",
            key: "gst_management",
            route: "/setup/gst/gst_management",
            component: <GSTManage />,
          },
        ],
      },

      {
        name: "Store Information",
        key: "store_info",
        collapse: [
          {
            name: "Store Management",
            key: "new_store",
            route: "/setup/store_info/new_store",
            component: <NewStore />,
          },
          
        ],
      },
    ],
  },
  {
    type: "collapse",
    name: "Transactions",
    key: "transactions",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    collapse: [
      {
        name: "Sale Invoice",
        key: "sale_invoice",
        route: "/transactions/sale_invoice",
        component: <SaleInvoice />
        
      },
      {
        name: "Return Product",
        key: "return_product",
        route: "/transactions/return_product",
        component: <ReturnProduct />
        
      },
      {
        name: "Parchase Product",
        key: "parchase_product",
        route: "/transactions/parchase_product",
        component: <PurchaseProduct />
        
      },
      {
        name: "Return To Company",
        key: "return_to_company",
        route: "/transactions/return_to_company",
        component: <ReturnToCompany />
        
      },
    ],
  },
  {
    type: "collapse",
    name: "Utilies",
    key: "Utilies",
    icon: <Icon fontSize="small">construction</Icon>,
    collapse: [
      {
        name: "Backup Data",
        key: "backup_data",
        route: "/utilies/backup_data",
        component: <BackupData />
        
      },
      {
        name: "Calender",
        key: "calender",
        route: "/utilies/calender",
        component: <CalenderSection />
        
      },
      {
        name: "Calculator",
        key: "calculator",
        route: "/utilies/calculator",
        component: <Calculator />
        
      },
      {
        name: "Notepad",
        key: "notepad",
        route: "/utilies/notepad",
        component: <Notepad />
        
      },
    ],
  },
    // #################################################################################
   // #################################################################################

    // #################################################################################
   // #################################################################################

 
];

export default routes;
