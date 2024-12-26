import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ProductCard } from '@/components/ProductCard';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

type FeaturedSectionProps = {
  title: string;
  products: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
  }>;
  onAddToCart: (productId: string) => void;
};

export function FeaturedSection({ title, products, onAddToCart }: FeaturedSectionProps) {
  const theme = useColorScheme() ?? 'light';

  return (
    <View style={styles.container}>
      <ThemedText type="subtitle" style={styles.title}>{title}</ThemedText>
      <View style={styles.products}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    marginBottom: 16,
    fontSize: 20,
    fontWeight: '600',
  },
  products: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
