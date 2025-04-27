
import Home from "Home";
import SignInBasic from "layouts/authentication/sign-in/basic";
import Sales from "layouts/dashboards/sales";
import Settings from "layouts/pages/account/settings";
import EditProducts from "layouts/setup/Product/EditProduct";
import SystemLock from "layouts/systemLock";
import ProfileOverview from "layouts/pages/profile/profile-overview";
import ReportsSummary from "layouts/dashboards/reports";
import Analytics from "layouts/dashboards/analytics";
import Category from "layouts/setup/category";
import AddNewProduct from "layouts/setup/Product/AddProduct";
import ProductList from "layouts/setup/Product/ProductList";
import SupplierManagement from "layouts/setup/suppliers";
import EditSupplier from "layouts/setup/suppliers/EditSupplier";
import NewStore from "layouts/setup/storeInfo/NewStore";
import ReturnToCompany from "layouts/transactions/ReturnToCompany";
import PurchaseProduct from "layouts/transactions/PurchaseProduct";
import ReturnProduct from "layouts/transactions/ReturnProduct";
import SaleInvoice from "layouts/transactions/SaleInvoice";
import Notepad from "layouts/utilies/notepad";
import Calculator from "layouts/utilies/calculator";
import CalenderSection from "layouts/utilies/calender";
import BackupData from "layouts/utilies/backupdata";
import GSTManage from "layouts/setup/gst";

const appRoutes = [
  {
    name: "Basic",
    key: "basic",
    route: "/authentication/sign-in/basic",
    component: <SignInBasic />,
  },
  //   {
  //     name: "Illustration",
  //     key: "illustration",
  //     route: "/authentication/sign-in/illustration",
  //     component: <Illustration />,
  //   },
  //   {
  //     name: "Cover",
  //     key: "cover",
  //     route: "/authentication/sign-in/cover",
  //     component: <Cover />,
  //   }

  {
    name: "Home",
    key: "home",
    route: "/home",
    component: <Home />,
  },
  {
    name: "Sales",
    key: "sales",
    route: "/dashboards/sales",
    component: <Sales />,
  },
  {
    name: "Edit Product",
    key: "edit_product",
    route: "/setup/product/edit_product",
    component: <EditProducts />,
  },

  // ########################
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
  },
  {
    name: "Analytics",
    key: "analytics",
    route: "/dashboards/analytics",
    component: <Analytics />,
  },

  {
    name: "Reports Summary",
    key: "reports-summary",
    route: "/dashboards/reports-summary",
    component: <ReportsSummary />,
  },
  {
    name: "Category Info",
    key: "category",
    route: "/setup/category/category",
    component: <Category />,
  },
  {
    name: "New Product",
    key: "new_product",
    route: "/setup/product/new_product",
    component: <AddNewProduct />,
  },
  {
    name: "Product List",
    key: "product_list",
    route: "/setup/product/product_list",
    component: <ProductList />,
  },
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
  {
    name: "New Store",
    key: "new_store",
    route: "/setup/store_info/new_store",
    component: <NewStore />,
  },
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

  {
    name: "GST Management",
    key: "gst_management",
    route: "/setup/gst/gst_management",
    component: <GSTManage />,
  },
];

export default appRoutes;
