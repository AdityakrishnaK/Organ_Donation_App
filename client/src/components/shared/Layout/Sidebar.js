import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../../styles/Layout.css";

const Sidebar = () => {
  // GET USER STATE
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  return (
    <div>
      <div className="sidebar" style={sidebarStyle}>
        <div className="menu">
          {user?.role === "organisation" && (
            <>
              <div
                className={`menu-item ${location.pathname === "/" && "active"}`}
                style={menuItemStyle(location.pathname === "/")}
              >
                <i className="fa-solid fa-heartbeat" style={iconStyle}></i>
                <Link to="/" style={linkStyle}>Organ Inventory</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/donar" && "active"
                }`}
                style={menuItemStyle(location.pathname === "/donar")}
              >
                <i className="fa-solid fa-hand-holding-heart" style={iconStyle}></i>
                <Link to="/donar" style={linkStyle}>Donor</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/hospital" && "active"
                }`}
                style={menuItemStyle(location.pathname === "/hospital")}
              >
                <i className="fa-solid fa-hospital" style={iconStyle}></i>
                <Link to="/hospital" style={linkStyle}>Hospital</Link>
              </div>
            </>
          )}
          {user?.role === "admin" && (
            <>
              <div
                className={`menu-item ${
                  location.pathname === "/donar-list" && "active"
                }`}
                style={menuItemStyle(location.pathname === "/donar-list")}
              >
                <i className="fa-solid fa-list" style={iconStyle}></i>
                <Link to="/donar-list" style={linkStyle}>Donor List</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/hospital-list" && "active"
                }`}
                style={menuItemStyle(location.pathname === "/hospital-list")}
              >
                <i className="fa-solid fa-hands-helping" style={iconStyle}></i>
                <Link to="/hospital-list" style={linkStyle}>Hospital List</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/org-list" && "active"
                }`}
                style={menuItemStyle(location.pathname === "/org-list")}
              >
                <i className="fa-solid fa-building" style={iconStyle}></i>
                <Link to="/org-list" style={linkStyle}>Organisation List</Link>
              </div>
            </>
          )}
          {(user?.role === "donar" || user?.role === "hospital") && (
            <div
              className={`menu-item ${
                location.pathname === "/orgnaisation" && "active"
              }`}
              style={menuItemStyle(location.pathname === "/orgnaisation")}
            >
              <i className="fa-solid fa-users" style={iconStyle}></i>
              <Link to="/orgnaisation" style={linkStyle}>Organisation</Link>
            </div>
          )}
          {user?.role === "hospital" && (
            <div
              className={`menu-item ${
                location.pathname === "/consumer" && "active"
              }`}
              style={menuItemStyle(location.pathname === "/consumer")}
            >
              <i className="fa-solid fa-hand-holding" style={iconStyle}></i>
              <Link to="/consumer" style={linkStyle}>Consumer</Link>
            </div>
          )}
          {user?.role === "donar" && (
            <div
              className={`menu-item ${
                location.pathname === "/donation" && "active"
              }`}
              style={menuItemStyle(location.pathname === "/donation")}
            >
              <i className="fa-solid fa-gift" style={iconStyle}></i>
              <Link to="/donation" style={linkStyle}>Donation</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Style objects
const sidebarStyle = {
  backgroundColor: "#2E8B57", // Green background for organ donation theme
  padding: "20px",
  minHeight: "100vh", // Full page height
};

const menuItemStyle = (isActive) => ({
  backgroundColor: isActive ? "#66BB6A" : "transparent", // Highlight active item
  color: "#fff",
  padding: "10px",
  borderRadius: "5px",
  marginBottom: "10px",
  display: "flex",
  alignItems: "center",
});

const linkStyle = {
  color: "#fff",
  marginLeft: "10px",
  textDecoration: "none",
};

const iconStyle = {
  fontSize: "1.5rem",
  color: "#fff",
};

export default Sidebar;
