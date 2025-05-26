import { useEffect, useState } from "react";
import { api } from "./api";
import type { Product } from "./types/Product";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/products")
      .then((res) => setProducts(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-4">Lade Produkte...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {products.map((product) => (
        <div key={product.id} className="border p-4 rounded shadow">
          <img src={product.image} alt={product.title} className="h-40 mx-auto mb-2 object-contain" />
          <h2 className="text-lg font-semibold">{product.title}</h2>
          <p className="text-gray-600 text-sm">{product.category}</p>
          <p className="text-green-700 font-bold mt-2">${product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
