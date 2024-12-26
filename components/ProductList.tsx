import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ProductCard } from './ProductCard';

type ProductListProps = {
  products: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
  }>;
  onAddToCart: (productId: string) => void;
};

export function ProductList({ products, onAddToCart }: ProductListProps) {
  return (
    <View style={styles.list}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 10,
  },
});
