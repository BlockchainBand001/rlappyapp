import React from 'react';
import { StyleSheet, TextInput, Pressable } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  withSpring,
  useSharedValue 
} from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { IconSymbol } from '@/components/ui/IconSymbol';

export function SearchBar() {
  const theme = useColorScheme() ?? 'light';
  const scale = useSharedValue(1);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.98);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <Animated.View style={[styles.container, animatedStyles]}>
      <Pressable
        style={[
          styles.searchBar,
          { backgroundColor: Colors[theme].surface }
        ]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <IconSymbol 
          name="magnifyingglass" 
          size={20} 
          color={Colors[theme].textSecondary} 
        />
        <TextInput
          placeholder="Search products..."
          placeholderTextColor={Colors[theme].textSecondary}
          style={[styles.input, { color: Colors[theme].text }]}
        />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
});
