import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import ErrorBoundary from './components/ErrorBoundary';
import WelcomePage from './pages/WelcomePage';

function App() {
  return (
    <CartProvider>
      <Router>
        <ErrorBoundary>
        <Routes>
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/" element={<WelcomePage />} />
        </Routes>
        </ErrorBoundary>
      </Router>
    </CartProvider>
  );
}

export default App;