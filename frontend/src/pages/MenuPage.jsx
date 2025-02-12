import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { Link, useLocation } from "react-router-dom";

export default function MenuPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const { addToCart, updateCartQuantity, cartItems } = useContext(CartContext);
  const [addedProductId, setAddedProductId] = useState(null);
  const [quantities, setQuantities] = useState({});
  const location = useLocation();
  const storedName = localStorage.getItem('name');
  const storedTableNumber = localStorage.getItem('tableNumber');
  const { name, tableNumber } = location.state || { name: storedName, tableNumber: storedTableNumber };

  useEffect(() => {
    axios.get("http://localhost:3000/products").then((response) => {
      setProducts(response.data);
      setFilteredProducts(response.data);
    });
  }, []);

  const handleAddToCart = (product) => {
    const existingCartItem = cartItems.find(item => item.id === product.id);
    const quantity = (existingCartItem ? existingCartItem.quantity : 0) + (quantities[product.id] || 1);
    addToCart(product);
    updateCartQuantity(product.id, quantity);
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
      [productId]: Math.max((prevQuantities[productId] || 1) - 1, 1),
    }));
  };

  const handleFilterChange = (category) => {
    setSelectedCategory(category);
    if (category === 'Todos') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === category));
    }
  };

  return (
    <div className="p-10">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold ml-5">Menu</h1>
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

      <div className="mb-4 flex justify-center gap-4 mt-5">
        <button onClick={() => handleFilterChange('Todos')} className={`px-4 py-2 rounded ${selectedCategory === 'Todos' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Todos</button>
        <button onClick={() => handleFilterChange('Hambúrguer')} className={`px-4 py-2 rounded ${selectedCategory === 'Hambúrguer' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Hambúrguer</button>
        <button onClick={() => handleFilterChange('Acompanhamento')} className={`px-4 py-2 rounded ${selectedCategory === 'Acompanhamento' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Acompanhamento</button>
        <button onClick={() => handleFilterChange('Bebida')} className={`px-4 py-2 rounded ${selectedCategory === 'Bebida' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Bebida</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg flex flex-direction-row">

          <div>
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

            <img className="rounded-lg w-40 ml-10" src={product.image_url} alt={product.name} srcset="" />

          </div>
        ))}
      </div>
    </div>
  );
}