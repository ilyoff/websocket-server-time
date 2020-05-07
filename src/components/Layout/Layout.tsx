import React from 'react';
import './Layout.scss';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout">
        {children}
    </div>
  );
}

export default Layout;
