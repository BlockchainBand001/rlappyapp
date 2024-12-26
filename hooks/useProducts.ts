import { useState, useEffect } from 'react';

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch products from an API or database
    const fetchedProducts = [
      { id: '1', name: 'Product 1', price: 29.99, image: 'https://via.placeholder.com/150' },
      { id: '2', name: 'Product 2', price: 19.99, image: 'https://via.placeholder.com/150' },
      // ...more products
    ];
    setProducts(fetchedProducts);
  }, []);

  return products;
}
