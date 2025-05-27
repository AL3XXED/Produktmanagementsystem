import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../api';
import type { Product } from '../types/Product';

function ProductDetails() {
    const {id} = useParams();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        if (id) {
            api.get(`/products/${id}`)
                .then((res) => setProduct(res.data))
                .catch((error) => console.error('Error fetching product:', error));
        }   
    }, [id]);

    if (!product) return <p className="p-4">Lade Produktdetails...</p>;

    return (
        <div className="p-6">
        <Link to="/" className="text-blue-600 underline">&larr; Zurück</Link>
        <div className="mt-4 flex flex-col md:flex-row gap-8">
          <img src={product.image} alt={product.title} className="h-64 mx-auto object-contain" />
          <div>
            <h1 className="text-2xl font-bold">{product.title}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-xl font-semibold text-green-700">${product.price}</p>
            <p className="text-sm text-gray-400 mt-2">Kategorie: {product.category}</p>
          </div>
        </div>
      </div>
    );
}

export default ProductDetails;