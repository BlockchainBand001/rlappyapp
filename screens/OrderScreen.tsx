import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const orders = [
  { id: '1', date: '2023-01-01', total: '$100.00' },
  { id: '2', date: '2023-02-01', total: '$150.00' },
  // Add more orders as needed
];

const OrderScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Orders</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.order}>
            <Text>Order ID: {item.id}</Text>
            <Text>Date: {item.date}</Text>
            <Text>Total: {item.total}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  order: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});