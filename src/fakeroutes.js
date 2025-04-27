
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
import AllProjects from "layouts/pages/profile/all-projects";
import NewUser from "layouts/pages/users/new-user";
import Settings from "layouts/pages/account/settings";
import Billing from "layouts/pages/account/billing";
import Invoice from "layouts/pages/account/invoice";
import Timeline from "layouts/pages/projects/timeline";
import PricingPage from "layouts/pages/pricing-page";
import Widgets from "layouts/pages/widgets";
import RTL from "layouts/pages/rtl";
import Charts from "layouts/pages/charts";
import Notifications from "layouts/pages/notifications";
import Kanban from "layouts/applications/kanban";
import Wizard from "layouts/applications/wizard";
import DataTables from "layouts/applications/data-tables";
import Calendar from "layouts/applications/calendar";
import NewProduct from "layouts/ecommerce/products/new-product";
import EditProduct from "layouts/ecommerce/products/edit-product";
import ProductPage from "layouts/ecommerce/products/product-page";
import OrderList from "layouts/ecommerce/orders/order-list";
import OrderDetails from "layouts/ecommerce/orders/order-details";
import SignInBasic from "layouts/authentication/sign-in/basic";
import SignInCover from "layouts/authentication/sign-in/cover";
import SignInIllustration from "layouts/authentication/sign-in/illustration";
import SignUpCover from "layouts/authentication/sign-up/cover";
import ResetCover from "layouts/authentication/reset-password/cover";

import MDAvatar from "components/MDAvatar";

// @mui icons
import Icon from "@mui/material/Icon";

// Images
import profilePicture from "assets/images/team-3.jpg";
import AddNewProduct from "layouts/setup/Product/AddProduct";
import ProductList from "layouts/setup/Product/ProductList";
import EditSupplier from "layouts/setup/suppliers/EditSupplier";
import NewStore from "layouts/setup/storeInfo/NewStore";
import SaleInvoice from "layouts/transactions/SaleInvoice";
import StoreList from "layouts/setup/storeInfo/StoreList";
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
      // {
      //   name: "Return Summary",
      //   key: "return-summary",
      //   route: "/dashboards/return-summary",
      //   component: <ReturnSummary />,
      // },
    ],
  },
  { type: "title", title: "Pages", key: "title-pages" },
  {
    type: "collapse",
    name: "Pages",
    key: "pages",
    icon: <Icon fontSize="small">image</Icon>,
    collapse: [
      {
        name: "Projects",
        key: "projects",
        collapse: [
          {
            name: "Timeline",
            key: "timeline",
            route: "/pages/projects/timeline",
            component: <Timeline />,
          },
        ],
      },
      {
        name: "Pricing Page",
        key: "pricing-page",
        route: "/pages/pricing-page",
        component: <PricingPage />,
      },
      { name: "RTL", key: "rtl", route: "/pages/rtl", component: <RTL /> },
      {
        name: "Widgets",
        key: "widgets",
        route: "/pages/widgets",
        component: <Widgets />,
      },
      {
        name: "Charts",
        key: "charts",
        route: "/pages/charts",
        component: <Charts />,
      },
      {
        name: "Notfications",
        key: "notifications",
        route: "/pages/notifications",
        component: <Notifications />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Account",
    key: "account",
    icon: <Icon fontSize="small">person</Icon>,
    collapse: [
      {
        name: "Settings",
        key: "settings",
        route: "/pages/account/settings",
        component: <Settings />,
      },
      {
        name: "Billing",
        key: "billing",
        route: "/pages/account/billing",
        component: <Billing />,
      },
      {
        name: "Invoice",
        key: "invoice",
        route: "/pages/account/invoice",
        component: <Invoice />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Team",
    key: "team",
    icon: <Icon fontSize="small">people</Icon>,
    collapse: [
      {
        name: "All Projects",
        key: "all-projects",
        route: "/pages/profile/all-projects",
        component: <AllProjects />,
      },
      {
        name: "New User",
        key: "new-user",
        route: "/pages/users/new-user",
        component: <NewUser />,
      },
      {
        name: "Profile Overview",
        key: "profile-overview",
        route: "/pages/profile/profile-overview",
        component: <ProfileOverview />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Applications",
    key: "applications",
    icon: <Icon fontSize="small">apps</Icon>,
    collapse: [
      {
        name: "Kanban",
        key: "kanban",
        route: "/applications/kanban",
        component: <Kanban />,
      },
      {
        name: "Wizard",
        key: "wizard",
        route: "/applications/wizard",
        component: <Wizard />,
      },
      {
        name: "Data Tables",
        key: "data-tables",
        route: "/applications/data-tables",
        component: <DataTables />,
      },
      {
        name: "Calendar",
        key: "calendar",
        route: "/applications/calendar",
        component: <Calendar />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Ecommerce",
    key: "ecommerce",
    icon: <Icon fontSize="small">shopping_basket</Icon>,
    collapse: [
      {
        name: "Products",
        key: "products",
        collapse: [
          {
            name: "New Product",
            key: "new-product",
            route: "/ecommerce/products/new-product",
            component: <NewProduct />,
          },
          {
            name: "Edit Product",
            key: "edit-product",
            route: "/ecommerce/products/edit-product",
            component: <EditProduct />,
          },
          {
            name: "Product Page",
            key: "product-page",
            route: "/ecommerce/products/product-page",
            component: <ProductPage />,
          },
        ],
      },
      {
        name: "Orders",
        key: "orders",
        collapse: [
          {
            name: "Order List",
            key: "order-list",
            route: "/ecommerce/orders/order-list",
            component: <OrderList />,
          },
          {
            name: "Order Details",
            key: "order-details",
            route: "/ecommerce/orders/order-details",
            component: <OrderDetails />,
          },
        ],
      },
    ],
  },
  {
    type: "collapse",
    name: "Authentication",
    key: "authentication",
    icon: <Icon fontSize="small">content_paste</Icon>,
    collapse: [
      {
        name: "Sign In",
        key: "sign-in",
        collapse: [
          {
            name: "Basic",
            key: "basic",
            route: "/authentication/sign-in/basic",
            component: <SignInBasic />,
          },
          {
            name: "Cover",
            key: "cover",
            route: "/authentication/sign-in/cover",
            component: <SignInCover />,
          },
          {
            name: "Illustration",
            key: "illustration",
            route: "/authentication/sign-in/illustration",
            component: <SignInIllustration />,
          },
        ],
      },
      {
        name: "Sign Up",
        key: "sign-up",
        collapse: [
          {
            name: "Cover",
            key: "cover",
            route: "/authentication/sign-up/cover",
            component: <SignUpCover />,
          },
        ],
      },
      {
        name: "Reset Password",
        key: "reset-password",
        collapse: [
          {
            name: "Cover",
            key: "cover",
            route: "/authentication/reset-password/cover",
            component: <ResetCover />,
          },
        ],
      },
    ],
  },
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
          },
          // {
          //   name: "Edit Product",
          //   key: "edit_product",
          //   route: "/setup/product/edit_product",
          //   component: <EditProducts />,
          // },
          {
            name: "Product List",
            key: "product_list",
            route: "/setup/product/product_list",
            component: <ProductList />,
          },
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
      // {
      //   name: "Product Price List",
      //   key: "price_list",
      //   collapse: [
      //     {
      //       name: "Add Price",
      //       key: "add_price",
      //       route: "/setup/price_list/add_price",
      //       component: <AddNewSupplier />,
      //     },
      //     {
      //       name: "Edit Supplier",
      //       key: "edit_supplier",
      //       route: "/setup/price_list/add_price",
      //       component: <EditSupplier />,
      //     },
      //     {
      //       name: "Suppliers List",
      //       key: "suppliers_list",
      //       route: "/setup/price_list/add_price",
      //       component: <SuppliersList />,
      //     },
      //   ],
      // },

      {
        name: "Store Information",
        key: "store_info",
        collapse: [
          {
            name: "New Store",
            key: "new_store",
            route: "/setup/store_info/new_store",
            component: <NewStore />,
          },
          // {
          //   name: "Edit Store",
          //   key: "edit_store",
          //   route: "/setup/store_info/edit_store",
          //   component: <EditSupplier />,
          // },
          {
            name: "Store List",
            key: "store_list",
            route: "/setup/store_info/store_list",
            component: <StoreList />,
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
