import React, { useState, useRef } from 'react';
import { 
  View, 
  Image, 
  StyleSheet, 
  Dimensions,
  Pressable 
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { ThemedText } from './ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width - 32;
const ITEM_HEIGHT = 200;

export function HeroCarousel({ data }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const theme = useColorScheme() ?? 'light';

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH + 16}
        decelerationRate="fast"
        contentContainerStyle={styles.scrollContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
      >
        {data.map((item, index) => (
          <Animated.View
            key={item.id}
            style={[
              styles.itemContainer,
              {
                transform: [{
                  scale: interpolate(
                    scrollX,
                    [(index - 1) * ITEM_WIDTH, index * ITEM_WIDTH, (index + 1) * ITEM_WIDTH],
                    [0.9, 1, 0.9]
                  ),
                }],
              },
            ]}
          >
            <Image source={item.image} style={styles.image} />
            <View style={[styles.overlay, { backgroundColor: Colors[theme].background + '80' }]}>
              <ThemedText type="title" style={styles.title}>{item.title}</ThemedText>
            </View>
          </Animated.View>
        ))}
      </Animated.ScrollView>

      <View style={styles.pagination}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor: 
                  index === activeIndex 
                    ? Colors[theme].primary 
                    : Colors[theme].border,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    marginRight: 16,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});
