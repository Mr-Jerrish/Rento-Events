import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./components/Pages/Dashboard";
import CompanySetup from "./components/Pages/companysetup/CompanySetup";
import BasicMaster from "./components/Pages/BasicMaster";

import Signup from "./components/signpages/Signup";
import Signin from "./components/signpages/Signin";
import ChangePassword from "./components/signpages/ChangePassword";
import Item from "./components/Pages/BasicMaster/Item";
import Customer from "./components/Pages/BasicMaster/Customer";
import EmployeeDetails from "./components/Pages/BasicMaster/EmployeeDetails";
function App() {
  return (
    <Routes>
      {/* DEFAULT REDIRECT */}
      <Route path="/" element={<Navigate to="/signup" replace />} />

      {/* AUTH ROUTES */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/changepassword" element={<ChangePassword />} />

      {/* DASHBOARD */}
      <Route path="/dashboard" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="companysetup" element={<CompanySetup />} />
        <Route path="BasicMaster" element={<BasicMaster />} />
        <Route path="BasicMaster/Item" element={<Item />} />
        <Route path="BasicMaster/Customer" element={<Customer />} />
        <Route
          path="BasicMaster/EmployeeDetails"
          element={<EmployeeDetails />}
        />
      </Route>
    </Routes>
  );
}

export default App;
