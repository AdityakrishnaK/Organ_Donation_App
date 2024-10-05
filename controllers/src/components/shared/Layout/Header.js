import React from "react";
import { FaHeartbeat, FaUserCircle } from "react-icons/fa"; // Changed to organ-related icon
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  // Logout handler
  const handleLogout = () => {
    localStorage.clear();
    alert("Logout Successfully");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#4CAF50" }}> {/* Updated color */}
        <div className="container-fluid">
          <div className="navbar-brand h1" style={{ color: "#fff" }}>
            <FaHeartbeat color="white" /> LifeGift {/* Updated icon and brand name */}
          </div>
          <ul className="navbar-nav flex-row">
            <li className="nav-item mx-3">
              <p className="nav-link" style={{ color: "#fff" }}>
                <FaUserCircle /> Welcome{" "}
                {user?.name || user?.hospitalName || user?.organisationName}
                &nbsp;
                <span className="badge bg-info">{user?.role}</span> {/* Changed badge color */}
              </p>
            </li>
            {location.pathname === "/" ||
            location.pathname === "/donor-registration" ||
            location.pathname === "/hospitals-clinics" ? (
              <li className="nav-item mx-3">
                <Link to="/analytics" className="nav-link" style={{ color: "#fff" }}>
                  Analytics
                </Link>
              </li>
            ) : (
              <li className="nav-item mx-3">
                <Link to="/" className="nav-link" style={{ color: "#fff" }}>
                  Home
                </Link>
              </li>
            )}
            <li className="nav-item mx-3">
              <button className="btn btn-warning" onClick={handleLogout}> {/* Updated button style */}
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
