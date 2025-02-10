import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function MenuPage() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);
  const [addedProductId, setAddedProductId] = useState(null);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    axios.get("http://localhost:3000/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 1;
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
      console.log("Adicionado ao carrinho", product);
    }
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId(null);
    }, 2000);
  };

  const handleIncreaseQuantity = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: (prevQuantities[productId] || 1) + 1,
    }));
  };

  const handleDecreaseQuantity = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.max((prevQuantities[productId] || 1) - 1, 0),
    }));
  };

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold ml-20">Menu</h1>
        <div className="flex justify-around gap-10 mr-20">
          <h1 className="text-2xl font-bold mb-4 text-center text-blue-500 my-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-utensils">
              <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
              <path d="M7 2v20"/>
              <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>
            </svg>
          </h1>
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
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="font-bold">R$ {product.price}</p>
            <div className="flex gap-7 items-center">
              <button
                onClick={() => handleAddToCart(product)}
                className={`mt-2 bg-blue-500 text-white px-6 py-2 rounded w-32 ${addedProductId === product.id ? 'bg-blue-900' : 'bg-blue-500'}`}
              >
                {addedProductId === product.id ? "Adicionado" : "Adicionar"}
              </button>
              <div className="bg-grey-700 flex flex-row gap-5 mt-2">
                <button 
                  onClick={() => handleIncreaseQuantity(product.id)}
                  className="font-bold"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-plus">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M8 12h8"/>
                    <path d="M12 8v8"/>
                  </svg>
                </button>
                <p className="font-bold">{quantities[product.id] || 1}</p>
                <button 
                  onClick={() => handleDecreaseQuantity(product.id)}
                  className="font-bold"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-minus">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M8 12h8"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}