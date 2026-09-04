import React, { useState } from 'react';
import { Header } from '../components/common/Header.jsx';
import { Sidebar } from '../components/common/Sidebar.jsx';
import { Footer } from '../components/common/Footer.jsx';

export const AdminLayout = ({ children }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-[#F5FAFC] text-[#17324D] font-sans selection:bg-[#20B8C8] selection:text-white">
      
      {/* Left Sidebar */}
      <Sidebar 
        isMobileOpen={isMobileSidebarOpen} 
        setIsMobileOpen={setIsMobileSidebarOpen} 
      />

      {/* Main Workstation Column */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Header Bar */}
        <Header 
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} 
        />

        {/* Main Workstation Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </div>

    </div>
  );
};

export default AdminLayout;
