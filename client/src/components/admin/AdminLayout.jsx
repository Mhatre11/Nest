import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { FiHome, FiBox, FiUsers, FiTag, FiMenu, FiX } from 'react-icons/fi';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  
  const menuItems = [
    { path: '/admin', icon: FiHome, label: 'Dashboard' },
    { path: '/admin/products', icon: FiBox, label: 'Products' },
    { path: '/admin/users', icon: FiUsers, label: 'Users' },
    { path: '/admin/categories', icon: FiTag, label: 'Categories' },
  ];

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-gray-900 text-white transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-0 md:w-20'
      } z-30`}
    >
      <div className="flex justify-between items-center p-4">
        <h1 className={`font-bold text-xl ${!isOpen && 'hidden md:hidden'}`}>Admin Panel</h1>
        <button onClick={toggleSidebar} className="text-white md:hidden">
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>
      
      <nav className="mt-8">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-4 py-3 transition-colors ${
              location.pathname === item.path
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className={`ml-4 ${!isOpen && 'hidden md:hidden'}`}>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0 md:ml-20'}`}>
        <header className="bg-white shadow-sm">
          <div className="flex justify-between items-center px-4 py-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <FiMenu size={24} />
            </button>
            <div className="flex items-center space-x-4">
              {/* Add profile dropdown or other header items here */}
            </div>
          </div>
        </header>
        
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
