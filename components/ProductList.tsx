import React, { useState } from 'react';
import { 
  View, 
  FlatList, 
  StyleSheet,
  TextInput,
  ActivityIndicator 
} from 'react-native';
import { ProductCard } from './ProductCard';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

type ProductListProps = {
  products: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
  }>;
  onAddToCart: (productId: string) => void;
  isLoading?: boolean;
};

export function ProductList({ products, onAddToCart, isLoading = false }: ProductListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useColorScheme() ?? 'light';

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors[theme].primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: Colors[theme].background }]}>
      <TextInput
        style={[styles.searchInput, { 
          backgroundColor: Colors[theme].surface,
          color: Colors[theme].text,
          borderColor: Colors[theme].border
        }]}
        placeholder="Search products..."
        placeholderTextColor={Colors[theme].textSecondary}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => (
          <ProductCard product={item} onAddToCart={onAddToCart} />
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    height: 50,
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 16,
    fontSize: 16,
  },
  row: {
    justifyContent: 'space-between',
  }
});
