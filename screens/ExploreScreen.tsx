import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

const categories = [
  { id: '1', name: 'Category 1', image: 'https://via.placeholder.com/150' },
  { id: '2', name: 'Category 2', image: 'https://via.placeholder.com/150' },
  // Add more categories as needed
];

const ExploreScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Explore Products</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.category}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  category: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  text: {
    fontSize: 18,
  },
});