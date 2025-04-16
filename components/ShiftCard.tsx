import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { format } from 'date-fns';
import { MapPin, Clock } from 'lucide-react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring 
} from 'react-native-reanimated';

interface ShiftCardProps {
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  city: string;
  isBooked: boolean;
  onPress: () => void;
}

export function ShiftCard({
  date,
  startTime,
  endTime,
  location,
  city,
  isBooked,
  onPress,
}: ShiftCardProps) {
  const scale = useSharedValue(1);
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.98);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

  return (
    <View style={styles.cardContainer}>
      <AnimatedTouchable
        style={[styles.card, isBooked && styles.bookedCard, animatedStyle]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}>
        <View style={[styles.dateStrip, isBooked && styles.bookedDateStrip]}>
          <Text style={styles.dateText}>
            {format(new Date(date), 'EEE, MMM d')}
          </Text>
        </View>
        <View style={styles.content}>
          <View style={styles.timeContainer}>
            <Clock size={16} color="#6B7280" style={styles.icon} />
            <Text style={styles.time}>
              {startTime} - {endTime}
            </Text>
          </View>
          <View style={styles.locationContainer}>
            <MapPin size={16} color="#6B7280" style={styles.icon} />
            <View>
              <Text style={styles.location}>{location}</Text>
              <Text style={styles.city}>{city}</Text>
            </View>
          </View>
          <View style={[styles.statusBadge, isBooked ? styles.bookedBadge : styles.availableBadge]}>
            <Text style={[styles.statusText, isBooked ? styles.bookedStatusText : styles.availableStatusText]}>
              {isBooked ? 'Cancel Shift' : 'Book Shift'}
            </Text>
          </View>
        </View>
      </AnimatedTouchable>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
  },
  bookedCard: {
    backgroundColor: '#F0F9FF',
  },
  dateStrip: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  bookedDateStrip: {
    backgroundColor: '#3B82F6',
  },
  dateText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    padding: 16,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  icon: {
    marginRight: 8,
    marginTop: 2,
  },
  time: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  location: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  city: {
    fontSize: 14,
    color: '#6B7280',
  },
  statusBadge: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  availableBadge: {
    backgroundColor: '#DCFCE7',
  },
  bookedBadge: {
    backgroundColor: '#EFF6FF',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  availableStatusText: {
    color: '#059669',
  },
  bookedStatusText: {
    color: '#3B82F6',
  },
});