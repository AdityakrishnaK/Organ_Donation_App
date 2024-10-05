import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      {/* Header */}
      <div className="header">
        <Header />
      </div>
      
      {/* Main Layout */}
      <div className="row g-0">
        {/* Sidebar */}
        <div className="col-md-3" style={sidebarStyle}>
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <div className="col-md-9" style={contentStyle}>
          {children}
        </div>
      </div>
    </>
  );
};

// Inline styling to enhance colors and layout
const sidebarStyle = {
  backgroundColor: "#2E8B57", // A vibrant green
  color: "#fff", // White text for contrast
  minHeight: "100vh", // Ensures sidebar spans the entire height
  padding: "20px", // Adds padding for better spacing
};

const contentStyle = {
  backgroundColor: "#F5F5F5", // Light gray for contrast with the sidebar
  padding: "30px", // Padding around content area
  minHeight: "100vh", // Ensures content spans the entire height
};

export default Layout;
