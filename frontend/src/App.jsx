import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import ErrorBoundary from './components/ErrorBoundary';
import WelcomePage from './pages/WelcomePage';
import OrderPage from './pages/OrderPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <CartProvider>
      <Router>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/order" element={<OrderPage />} />
          </Routes>
        </ErrorBoundary>
      </Router>
    </CartProvider>
  );
}

export default App;