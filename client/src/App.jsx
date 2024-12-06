import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import ColdDrinks from "./components/ProductPages/ColdDrinks";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Cart from "./pages/Cart/Cart";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Vegetables from "./components/ProductPages/Vegetables";
import Dairy_Breakfast from "./components/ProductPages/Dairy_Breakfast";
import Snacks from "./components/ProductPages/Snacks";
import TeaCoffee_HealthDrinks from "./components/ProductPages/TeaCoffee_HealthDrinks";
import { CartProvider } from "./context/CartContext";
import { LocationProvider } from "./context/LocationContext";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

// Admin imports
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import AddProduct from "./pages/admin/AddProduct";
import ProtectedRoute from "./components/ProtectedRoute";

// Layout component to handle conditional rendering of Nav and Footer
const Layout = ({ children }) => {
  const location = useLocation();
  const isAuthPage = ['/login', '/signup'].includes(location.pathname);
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAuthPage && !isAdminPage && <Navbar />}
      {children}
      {!isAuthPage && !isAdminPage && <Footer />}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <LocationProvider>
        <CartProvider>
          <Router>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 2000,
                style: {
                  background: '#333',
                  color: '#fff',
                },
              }}
            />
            <Layout>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/category" element={<CategoryPage />} />
                <Route path="/category/vegetables-fruits" element={<Vegetables />} />
                <Route path="/category/dairy-breakfast" element={<Dairy_Breakfast />} />
                <Route path="/category/beverages" element={<ColdDrinks />} />
                <Route path="/category/snacks-munchies" element={<Snacks />} />
                <Route path="/category/tea-coffee" element={<TeaCoffee_HealthDrinks />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/cart" element={<Cart/>} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                
                {/* Admin Routes */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute requireAdmin>
                      <AdminLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Dashboard />} />
                  <Route path="products">
                    <Route index element={<Products />} />
                    <Route path="add" element={<AddProduct />} />
                  </Route>
                </Route>
              </Routes>
            </Layout>
          </Router>
        </CartProvider>
      </LocationProvider>
    </AuthProvider>
  );
}

export default App;
