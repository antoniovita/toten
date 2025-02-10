import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const { cartItems, removeFromCart } = useContext(CartContext);

  const total = cartItems.reduce((acc, item) => acc + Number(item.price), 0).toFixed(2);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Carrinho</h1>
      <Link to="/" className="text-blue-500 underline">Voltar ao Menu</Link>
      <ul className="my-4">
        {cartItems.map(item => (
          <li key={item.id} className="my-2">
            {item.name} - R$ {item.price}
            <button
              onClick={() => removeFromCart(item.id)}
              className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <p className="font-bold">Total: R$ {total}</p>
        <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Finalizar Compra</button>
      </div>
    </div>
  );
}