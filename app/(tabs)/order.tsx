
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function OrderScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order History</Text>
      {/* Add your order history components here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});