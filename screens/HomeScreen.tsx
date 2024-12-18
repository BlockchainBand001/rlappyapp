import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

const products = [
  { id: '1', name: 'Product 1', image: 'https://via.placeholder.com/150' },
  { id: '2', name: 'Product 2', image: 'https://via.placeholder.com/150' },
  // Add more products as needed
];

const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to rlappy!</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.product}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default HomeScreen;

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
  product: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
});