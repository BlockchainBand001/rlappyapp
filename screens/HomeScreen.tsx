import React from 'react';
import { View, StatusBar, Platform, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  interpolate,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ProductList } from '@/components/ProductList';
import { Cart } from '@/components/Cart';
import { useProducts } from '@/hooks/useProducts';
import { useCart } from '@/hooks/useCart';
import { HeroCarousel } from '@/components/HeroCarousel';
import { SearchBar } from '@/components/SearchBar';
import { CategoryList } from '@/components/CategoryList';
import { FeaturedSection } from '@/components/FeaturedSection';

const HEADER_HEIGHT = 60;

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const theme = useColorScheme() ?? 'light';
  const products = useProducts();
  const { cartItems, addToCart, checkout } = useCart();
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerStyle = useAnimatedStyle(() => {
    const elevation = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT],
      [0, Platform.OS === 'ios' ? 0.5 : 4]
    );

    return {
      height: HEADER_HEIGHT + insets.top,
      paddingTop: insets.top,
      backgroundColor: Colors[theme].background,
      borderBottomWidth: elevation,
      borderBottomColor: Colors[theme].border,
      shadowOpacity: elevation * 0.1,
      shadowRadius: elevation * 2,
      elevation: elevation,
    };
  });

  const heroData = [
    { id: '1', image: require('@/assets/images/hero1.jpg'), title: 'Summer Sale' },
    { id: '2', image: require('@/assets/images/hero2.jpg'), title: 'New Arrivals' },
    { id: '3', image: require('@/assets/images/hero3.jpg'), title: 'Trending' },
  ];

  const categories = [
    { id: '1', name: 'Apple', icon: '🍏' },
    { id: '2', name: 'Dell', icon: '💻' },
    { id: '3', name: 'HP', icon: '🖥️' },
    { id: '4', name: 'Lenovo', icon: '🖱️' },
  ];

  return (
    <ThemedView style={styles.container}>
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
      
      {/* Animated Header */}
      <Animated.View style={[styles.header, headerStyle]}>
        <ThemedText type="title" style={styles.headerTitle}>Rlappy</ThemedText>
      </Animated.View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <View style={{ paddingTop: HEADER_HEIGHT + insets.top }}>
          {/* Search Bar */}
          <SearchBar />

          {/* Hero Carousel */}
          <HeroCarousel data={heroData} />

          {/* Categories */}
          <View style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Laptop Brands
            </ThemedText>
            <CategoryList categories={categories} />
          </View>

          {/* Featured Products */}
          <FeaturedSection 
            title="Featured Laptops"
            products={products.slice(0, 2)}
            onAddToCart={addToCart}
          />

          {/* Renting Section */}
          <FeaturedSection 
            title="Rent a Laptop"
            products={products.slice(2, 4)}
            onAddToCart={addToCart}
          />

          {/* Virtual Machines Section */}
          <FeaturedSection 
            title="Use a Virtual Machine"
            products={products.slice(4, 6)}
            onAddToCart={addToCart}
          />

          {/* All Products */}
          <View style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              All Products
            </ThemedText>
            <ProductList 
              products={products} 
              onAddToCart={addToCart} 
            />
          </View>
        </View>
      </Animated.ScrollView>

      {/* Cart */}
      <Cart cartItems={cartItems} onCheckout={checkout} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    marginBottom: 16,
    fontSize: 20,
    fontWeight: '600',
  },
});