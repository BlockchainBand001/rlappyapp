import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from './ui/Button';

type CartProps = {
  cartItems: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  onCheckout: () => void;
};

export function Cart({ cartItems, onCheckout }: CartProps) {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={styles.cart}>
      {cartItems.map((item) => (
        <View key={item.id} style={styles.cartItem}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>${item.price.toFixed(2)} x {item.quantity}</Text>
        </View>
      ))}
      <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
      <Button title="Checkout" onPress={onCheckout} />
    </View>
  );
}

const styles = StyleSheet.create({
  cart: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
  },
  itemPrice: {
    fontSize: 16,
    color: '#888',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});
