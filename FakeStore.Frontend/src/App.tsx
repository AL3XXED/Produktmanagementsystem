import { useEffect, useState } from "react";
import { api } from "./api";
import type { Product } from "./types/Product";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<Product[]>("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("API Fehler:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-4">🔄 Lade Produkte...</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">🛍️ Produkte im Überblick</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={`${product.source}-${product.id}`} className="bg-white border rounded-2xl shadow hover:shadow-lg transition p-4 flex flex-col">
            <div className="h-48 flex items-center justify-center mb-4">
              <img 
                src={product.image} 
                alt={product.title} 
                className="max-h-full object-contain" 
              />
            </div>
  
            <h2 className="text-lg font-semibold mb-1 line-clamp-2">{product.title}</h2>
            <p className="text-sm text-gray-500 mb-2">{product.category}</p>
            <p className="text-xl font-bold text-green-700">${product.price.toFixed(2)}</p>
  
            <div className="mt-auto pt-2 text-right">
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                product.source === "local"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-700"
              }`}>
                {product.source === "local" ? "Eigenes Produkt" : "FakeStore"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
