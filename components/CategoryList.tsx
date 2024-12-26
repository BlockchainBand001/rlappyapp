import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

type CategoryListProps = {
  categories: Array<{
    id: string;
    name: string;
    icon: string;
  }>;
};

export function CategoryList({ categories }: CategoryListProps) {
  const theme = useColorScheme() ?? 'light';

  return (
    <FlatList
      data={categories}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Pressable style={[styles.category, { backgroundColor: Colors[theme].surface }]}>
          <Text style={[styles.icon, { color: Colors[theme].primary }]}>{item.icon}</Text>
          <Text style={[styles.name, { color: Colors[theme].text }]}>{item.name}</Text>
        </Pressable>
      )}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  category: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  icon: {
    fontSize: 24,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
});
