import { Link, useLocation, Outlet } from "react-router-dom";
import {
  FaEnvelope,
  FaUserPlus,
  FaUsers,
  FaSignOutAlt,
  FaBars,
  FaBell,
  FaHome
} from 'react-icons/fa';

import assessalogo from "../../logos/onnes-adminlogo.jpg";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./AdminStyles.css";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="d-flex vh-100 bg-light">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-grow-1 p-3 overflow-auto">
        {/* Header */}
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
          <button className="btn btn-outline-secondary d-md-none" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FaBars />
          </button>
          <div className="d-flex align-items-center gap-3 ms-auto">
            <FaBell size={24} />
          </div>
        </div>

        {/* Outlet for nested routes */}
        <Outlet />
      </div>
    </div>
  );
}

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin-login';
  };

  return (
    <div className={`bg-white border-end ${sidebarOpen ? 'd-block' : 'd-none'} d-md-block`} style={{ width: '250px' }}>
      <div className="text-center p-3 border-bottom">
        <img src={assessalogo} alt="Logo" style={{ width: '150px' }} />
      </div>
      <nav className="nav flex-column p-3">
        <NavItem icon={FaHome} label="Home" path="/admin-dashboard/admin-home" />
        <NavItem icon={FaEnvelope} label="Contact Us" path="/admin-dashboard/admin-contact" />
        <NavItem icon={FaUserPlus} label="Subscribe" path="/admin-dashboard/admin-subscribe" />
        <NavItem icon={FaUsers} label="Visitors" path="/admin-dashboard/admin-visitors" />
        <div
          className="nav-link d-flex align-items-center gap-2 text-danger"
          style={{ cursor: 'pointer' }}
          onClick={handleLogout}
        >
          <FaSignOutAlt /> Logout
        </div>
      </nav>
    </div>
  );
}

function NavItem({ icon: Icon, label, path }) {
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <Link
      to={path}
      className={`nav-link d-flex align-items-center gap-2 ${isActive ? 'fw-bold text-primary' : 'text-dark'}`}
    >
      <Icon /> {label}
    </Link>
  );
}
