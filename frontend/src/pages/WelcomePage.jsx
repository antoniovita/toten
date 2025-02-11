import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function WelcomePage() {
  const [name, setName] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:3000/tables/${tableNumber}`)
      .then(response => {
        if (response.data.exists) {
          navigate('/menu', { state: { name, tableNumber } });
        } else {
          setError('Número da mesa inválido. Por favor, tente novamente.');
        }
      })
      .catch(error => {
        console.error('Error verifying table number', error);
        setError('Erro ao verificar o número da mesa. Por favor, tente novamente.');
      });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Bem-vindo!</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Nome:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Número da Mesa:</label>
            <input
              type="text"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}