import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/header.tsx';
import Footer from '../Footer/footer.tsx';

const Layout: React.FC = () => {
  return (
    <div className="layout">
      <Header />
      <main className="content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;