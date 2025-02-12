import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function OrderPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [visibleDetails, setVisibleDetails] = useState({});
  const tableNumber = localStorage.getItem('tableNumber');

  useEffect(() => {
    if (tableNumber) {
      axios.get(`http://localhost:3000/orders/table/${tableNumber}`)
        .then(response => {
          setOrders(response.data);
        })
        .catch(error => {
          console.error('Erro ao buscar pedidos:', error);
          navigate('/menu');
        });
    } else {
      navigate('/menu');
    }
  }, [tableNumber, navigate]);

  const toggleDetails = (orderId) => {
    setVisibleDetails(prevState => ({
      ...prevState,
      [orderId]: !prevState[orderId]
    }));
  };

  if (orders.length === 0) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="p-8">

    <div className="flex justify-between">
        <h1 className="text-2xl font-bold ml-5">Pedidos</h1>
        <div className="flex justify-around gap-10 mr-5">
          <Link to={"/menu"}>
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

          <Link to="/order" className="text-blue-500 underline my-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-scroll-text"><path d="M15 12h-5"/><path d="M15 8h-5"/><path d="M19 17V5a2 2 0 0 0-2-2H4"/><path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3"/></svg>
          </Link>
        </div>
      </div>

      {orders.map(order => (
        <div key={order.id} className="bg-white p-4 rounded-lg shadow-md mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
            <div className="flex flex-col sm:flex-row sm:items-center">
              <div className="mr-4">
                <p className="text-lg font-semibold">Número do Pedido: {order.order_number}</p>
                <p className="text-lg">Nome: {order.name}</p>
                <p className="text-lg">Número da Mesa: {order.table_number}</p>
                <p className="text-lg font-bold">Total: R$ {order.total_price}</p>
              </div>
            </div>
            <button
              onClick={() => toggleDetails(order.id)}
              className="mt-2 sm:mt-0 px-4 py-2 bg-blue-500 text-white rounded"
            >
              {visibleDetails[order.id] ? 'Esconder Detalhes' : 'Ver Detalhes'}
            </button>
          </div>
          {visibleDetails[order.id] && (
            <div className="mt-4">
              <h2 className="text-xl font-bold">Itens do Pedido</h2>
              <ul className="mt-2">
                {order.items.map(item => (
                  <li key={item.id} className="border-b py-2 flex flex-col sm:flex-row sm:items-center">
                    <p className="text-lg sm:mr-4">{item.product.name}</p>
                    <p className="text-gray-600 sm:mr-4">Quantidade: {item.quantity}</p>
                    <p className="text-gray-600">Subtotal: R$ {item.subtotal}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}