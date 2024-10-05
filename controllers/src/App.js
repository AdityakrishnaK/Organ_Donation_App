import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import PublicRoute from "./components/Routes/PublicRoute";
import "bootstrap/dist/css/bootstrap.min.css";

// Lazy-loaded components
const HomePage = lazy(() => import("./pages/HomePage"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Donar = lazy(() => import("./pages/Dashboard/Donar"));
const Hospitals = lazy(() => import("./pages/Dashboard/Hospitals"));
const OrganisationPage = lazy(() => import("./pages/Dashboard/OrganisationPage"));
const Consumer = lazy(() => import("./pages/Dashboard/Consumer"));
const Donation = lazy(() => import("./pages/Donation"));
const Analytics = lazy(() => import("./pages/Dashboard/Analytics"));
const DonarList = lazy(() => import("./pages/Admin/DonarList"));
const HospitalList = lazy(() => import("./pages/Admin/HospitalList"));
const OrgList = lazy(() => import("./pages/Admin/OrgList"));
const AdminHome = lazy(() => import("./pages/Admin/AdminHome"));

// Custom Loading Component
const Loading = () => (
  <div className="text-center">
    <div className="loader"></div>
    <p>Loading...</p>
  </div>
);

function App() {
  return (
    <>
      <ToastContainer />
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute><AdminHome /></ProtectedRoute>} />
          <Route path="/donar-list" element={<ProtectedRoute><DonarList /></ProtectedRoute>} />
          <Route path="/hospital-list" element={<ProtectedRoute><HospitalList /></ProtectedRoute>} />
          <Route path="/org-list" element={<ProtectedRoute><OrgList /></ProtectedRoute>} />

          {/* Dashboard Routes */}
          <Route path="/hospital" element={<ProtectedRoute><Hospitals /></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
          <Route path="/consumer" element={<ProtectedRoute><Consumer /></ProtectedRoute>} />
          <Route path="/donation" element={<ProtectedRoute><Donation /></ProtectedRoute>} />
          <Route path="/organisation" element={<ProtectedRoute><OrganisationPage /></ProtectedRoute>} />
          <Route path="/donar" element={<ProtectedRoute><Donar /></ProtectedRoute>} />

          {/* Public Routes */}
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

          {/* Home Route */}
          <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />

          {/* Fallback route for non-existent paths */}
          <Route path="*" element={<div>404 Page Not Found</div>} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
