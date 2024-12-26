import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  withSpring,
  useSharedValue,
  withTiming 
} from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
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
  const theme = useColorScheme() ?? 'light';
  const translateY = useSharedValue(0);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const cartStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }]
  }));

  const toggleCart = () => {
    translateY.value = withSpring(translateY.value === 0 ? -300 : 0);
  };

  return (
    <Animated.View style={[
      styles.container, 
      cartStyle,
      { backgroundColor: Colors[theme].surface }
    ]}>
      <Pressable onPress={toggleCart} style={styles.handle}>
        <View style={styles.handleBar} />
      </Pressable>
      
      <View style={styles.content}>
        {cartItems.map((item) => (
          <View key={item.id} style={styles.item}>
            <Text style={[styles.itemName, { color: Colors[theme].text }]}>
              {item.name}
            </Text>
            <View style={styles.itemDetails}>
              <Text style={[styles.quantity, { color: Colors[theme].textSecondary }]}>
                x{item.quantity}
              </Text>
              <Text style={[styles.price, { color: Colors[theme].primary }]}>
                ${(item.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          </View>
        ))}

        <View style={[styles.totalContainer, { borderTopColor: Colors[theme].border }]}>
          <Text style={[styles.totalText, { color: Colors[theme].text }]}>
            Total
          </Text>
          <Text style={[styles.totalAmount, { color: Colors[theme].primary }]}>
            ${total.toFixed(2)}
          </Text>
        </View>

        <Pressable 
          style={[styles.checkoutButton, { backgroundColor: Colors[theme].primary }]}
          onPress={onCheckout}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: -300,
    left: 0,
    right: 0,
    height: 400,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  handle: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: '#CBD5E1',
    borderRadius: 2,
  },
  content: {
    padding: 16,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
  },
  itemDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    marginRight: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    marginTop: 16,
  },
  totalText: {
    fontSize: 18,
    fontWeight: '600',
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: '700',
  },
  checkoutButton: {
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
