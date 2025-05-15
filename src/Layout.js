import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar, Footer } from './NavbarFooter';
import './PlayZone.css';

function Layout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;