import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem('adminToken'); // Check if the token exists in localStorage

  if (!isAuthenticated) {
    // If not authenticated, redirect to login page
    return <Navigate to="/admin-login" />;
  }

  return <Outlet />; // If authenticated, render the child routes
};

export default PrivateRoute;
