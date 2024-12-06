import React, { useState, useEffect } from 'react';
import { FiUsers, FiShoppingBag, FiDollarSign, FiBarChart } from 'react-icons/fi';
import axios from 'axios';

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className="text-2xl font-bold mt-2">{value}</h3>
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalRevenue: 0,
    totalOrders: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Replace with your actual API endpoints
        const [users, products] = await Promise.all([
          axios.get('/api/users/count'),
          axios.get('/api/products/count'),
        ]);

        setStats({
          totalUsers: users.data.count || 0,
          totalProducts: products.data.count || 0,
          totalRevenue: 25000, // Replace with actual revenue data
          totalOrders: 150, // Replace with actual orders data
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={FiUsers}
          color="bg-blue-500"
        />
        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          icon={FiShoppingBag}
          color="bg-green-500"
        />
        <StatCard
          title="Total Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          icon={FiDollarSign}
          color="bg-yellow-500"
        />
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          icon={FiBarChart}
          color="bg-purple-500"
        />
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
          {/* Add your orders table or list here */}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Top Products</h2>
          {/* Add your products list here */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
