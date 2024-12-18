
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChatScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Chat with us!</Text>
      {/* Add chat interface here */}
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});