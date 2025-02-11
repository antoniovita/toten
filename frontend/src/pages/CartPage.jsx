import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const { cartItems, removeFromCart, updateCartQuantity } = useContext(CartContext);
  const [quantities, setQuantities] = useState({});
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const initialQuantities = {};
    cartItems.forEach(item => {
      initialQuantities[item.id] = item.quantity || 1;
    });
    setQuantities(initialQuantities);
    calculateTotal(initialQuantities);
  }, [cartItems]);

  const calculateTotal = (quantities) => {
    const newTotal = cartItems.reduce((acc, item) => acc + Number(item.price) * (quantities[item.id] || 1), 0).toFixed(2);
    setTotal(newTotal);
  };

  const updateQuantityInDB = (productId, quantity) => {
    axios.put(`http://localhost:3000/cart/${productId}`, { quantity })
      .then(response => {
        console.log('Quantity updated in DB', response.data);
      })
      .catch(error => {
        console.error('Error updating quantity in DB', error);
      });
  };

  const handleIncreaseQuantity = (productId) => {
    setQuantities((prevQuantities) => {
      const newQuantities = {
        ...prevQuantities,
        [productId]: (prevQuantities[productId] || 1) + 1,
      };
      calculateTotal(newQuantities);
      updateQuantityInDB(productId, newQuantities[productId]);
      updateCartQuantity(productId, newQuantities[productId]);
      return newQuantities;
    });
  };

  const handleDecreaseQuantity = (productId) => {
    setQuantities((prevQuantities) => {
      const newQuantities = {
        ...prevQuantities,
        [productId]: Math.max((prevQuantities[productId] || 1) - 1, 1),
      };
      calculateTotal(newQuantities);
      updateQuantityInDB(productId, newQuantities[productId]);
      updateCartQuantity(productId, newQuantities[productId]);
      return newQuantities;
    });
  };

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold ml-20">Carrinho</h1>
        <div className="flex justify-around gap-10 mr-20">
          <Link to={"/"}>
          <h1 className="text-2xl font-bold mb-4 text-center text-blue-500 my-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-utensils">
              <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
              <path d="M7 2v20"/>
              <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>
            </svg>
          </h1>
          </Link>
          <Link to="/cart" className="text-blue-500 underline my-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-shopping-cart">
              <circle cx="8" cy="21" r="1"/>
              <circle cx="19" cy="21" r="1"/>
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
            </svg>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        {cartItems.map(item => (
          <div key={item.id} className="border p-4 rounded-lg">
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <p className="text-gray-600">{item.description}</p>
            <p className="font-bold">R$ {item.price}</p>
            <div className='flex gap-7 items-center'>
              <button
                onClick={() => removeFromCart(item.id)}
                className="mt-2 bg-red-500 text-white px-6 py-2 rounded"
              >
                Remover
              </button>
              <div className="flex gap-7 items-center mt-2">
                <button
                  onClick={() => handleIncreaseQuantity(item.id)}
                  className="font-bold"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-plus">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M8 12h8"/>
                      <path d="M12 8v8"/>
                    </svg>
                </button>
                <p className="font-bold">{quantities[item.id] || 1}</p>
                <button
                  onClick={() => handleDecreaseQuantity(item.id)}
                  className="font-bold"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-minus">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M8 12h8"/>
                    </svg>
          
                </button>
                <p className='font-bold p-2 border rounded-lg'> R$ {(item.price * quantities[item.id]).toFixed(2)}</p>
              </div>
          </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <p className="font-bold">Total: R$ {total}</p>
        <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Finalizar Compra</button>
      </div>
    </div>
  );
}