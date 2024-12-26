import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ProductList } from '@/components/ProductList';
import { Cart } from '@/components/Cart';
import { useProducts } from '@/hooks/useProducts';
import { useCart } from '@/hooks/useCart';

export default function HomeScreen() {
  const products = useProducts();
  const { cartItems, addToCart, checkout } = useCart();

  return (
    <View style={styles.container}>
      <ProductList products={products} onAddToCart={addToCart} />
      <Cart cartItems={cartItems} onCheckout={checkout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});