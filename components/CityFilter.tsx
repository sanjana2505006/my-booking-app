import { StyleSheet, ScrollView, TouchableOpacity, Text, View } from 'react-native';
import { useCallback } from 'react';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring 
} from 'react-native-reanimated';

interface CityFilterProps {
  cities: string[];
  selectedCity: string | null;
  onSelectCity: (city: string | null) => void;
}

export function CityFilter({ cities, selectedCity, onSelectCity }: CityFilterProps) {
  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
  
  const createChipComponent = useCallback(({ city, isSelected }: { city: string | null; isSelected: boolean }) => {
    const scale = useSharedValue(1);
    
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }]
    }));

    const handlePressIn = () => {
      scale.value = withSpring(0.95);
    };

    const handlePressOut = () => {
      scale.value = withSpring(1);
    };

    return (
      <AnimatedTouchable
        key={city ?? 'all'}
        style={[styles.chip, isSelected && styles.selectedChip, animatedStyle]}
        onPress={() => onSelectCity(city)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}>
        <Text style={[styles.chipText, isSelected && styles.selectedChipText]}>
          {city ?? 'All Cities'}
        </Text>
      </AnimatedTouchable>
    );
  }, [onSelectCity]);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {createChipComponent({ city: null, isSelected: !selectedCity })}
        {cities.map((city) => 
          createChipComponent({ city, isSelected: selectedCity === city })
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingVertical: 12,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  selectedChip: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4B5563',
  },
  selectedChipText: {
    color: '#fff',
  },
});