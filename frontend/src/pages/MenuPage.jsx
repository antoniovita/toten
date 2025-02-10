import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function MenuPage() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);
  const [addedProductId, setAddedProductId] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3000/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId(null);
    }, 2000); 
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Menu</h1>
      <Link to="/cart" className="text-blue-500 underline">Ir para o Carrinho</Link>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="font-bold">R$ {product.price}</p>
            <button
              onClick={() => handleAddToCart(product)}
              className={`mt-2 bg-blue-500 text-white px-6 py-2 rounded w-32 ${addedProductId === product.id ? 'bg-blue-900' : 'bg-blue-500'}`}
            >
              {addedProductId === product.id ? "Adicionado" : "Adicionar"}

            </button>
          </div>
        ))}
      </div>
    </div>
  );
}