import { Outlet } from 'react-router-dom';
import AppBar from '@renderer/component/appbar/AppBar'
import React from 'react'
import './Layout.css'

const Layout: React.FC = () => {
  return (
    <div className="layout-container">
      <AppBar />
      <main className="main-outlet">
        <Outlet />
      </main>
      <footer className="p-2 text-right border-t-1 border-t-gray-300">
        <p>Copyright co Ltd.</p>
      </footer>
    </div>
  );
};

export default Layout;
