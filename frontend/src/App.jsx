import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <CartProvider>
      <Router>
        <ErrorBoundary>
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
        </ErrorBoundary>
      </Router>
    </CartProvider>
  );
}

export default App;