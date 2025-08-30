import { Outlet } from 'react-router-dom';
import AppBar from '@renderer/component/appbar/AppBar'
import React from 'react'
import './Layout.css'

const Layout: React.FC = () => {
  return (
    <div>
      <AppBar />
      <main className="main-outlet space-y-3 mt-25 mb-4 p-2">
        <Outlet />
      </main>
      <footer className="p-2 text-right">
        <p>Copyright co Ltd.</p>
      </footer>
    </div>
  );
};

export default Layout;
