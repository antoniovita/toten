import { useEffect, useState } from "react";
import axios from "axios";

export default function MenuPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Menu</h1>
      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="font-bold">R$ {product.price.toFixed(2)}</p>
            <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded">Adicionar</button>
          </div>
        ))}
      </div>
    </div>
  );
}
