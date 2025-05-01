import { Routes, Route, Link, useLocation } from "react-router-dom";
import { FaEnvelope, FaUserPlus, FaUsers, FaSignOutAlt, FaBars, FaSearch, FaBell } from 'react-icons/fa';
import assessalogo from "../../logos/onnes-adminlogo.png";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ContactList from '../components/ContactList'; // Ensure this path is correct
import SubscriptionList from '../components/SubscriptionList'; // Import SubscriptionList
import VisitorsList from '../components/VisitorsList'; // Import VisitorsList component
import PrivateRoute from '../components/PrivateRoute'; // Import PrivateRoute
import AdminLogin from '../pages/AdminLogin'; // Import AdminLogin (Login Page)

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
          <div className="input-group w-100 w-md-50 my-2">
            <span className="input-group-text"><FaSearch /></span>
            <input type="text" className="form-control" placeholder="Search..." />
          </div>
          <div className="d-flex align-items-center gap-3">
            <FaBell size={24} />
          </div>
        </div>

        {/* Define Routes */}
        <Routes>
          {/* Wrap the protected routes with PrivateRoute */}
          <Route path="/" element={<PrivateRoute />}>
            <Route path="admin-contact" element={<ContactList />} />
            <Route path="admin-subscribe" element={<SubscriptionList />} />
            <Route path="admin-visitors" element={<VisitorsList />} />
          </Route>
          
          {/* Login page */}
          <Route path="/admin-login" element={<AdminLogin />} /> {/* Login page route */}
        </Routes>
      </div>
    </div>
  );
}

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const handleLogout = () => {
    localStorage.removeItem('adminToken'); // Remove the token from localStorage
    window.location.href = '/admin-login'; // Redirect to the login page
  };

  return (
    <div className={`bg-white border-end ${sidebarOpen ? 'd-block' : 'd-none'} d-md-block`} style={{ width: '250px' }}>
      <div className="text-center p-3 border-bottom">
        <img src={assessalogo} alt="Logo" style={{ width: '150px' }} />
      </div>
      <nav className="nav flex-column p-3">
        <NavItem icon={FaEnvelope} label="Contact Us" path="admin-contact" />
        <NavItem icon={FaUserPlus} label="Subscribe" path="admin-subscribe" />
        <NavItem icon={FaUsers} label="Visitors" path="admin-visitors" />
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
    <Link to={path} className={`nav-link d-flex align-items-center gap-2 ${isActive ? 'fw-bold text-primary' : 'text-dark'}`}>
      <Icon /> {label}
    </Link>
  );
}
