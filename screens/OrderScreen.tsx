
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OrderScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Your Orders</Text>
      {/* Display order history here */}
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});