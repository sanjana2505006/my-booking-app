import { StyleSheet, View, ScrollView, Text, RefreshControl } from 'react-native';
import { useShiftStore } from '@/store/shifts';
import { ShiftCard } from '@/components/ShiftCard';
import { groupBy } from '@/utils/array';
import { useState, useCallback } from 'react';

export default function BookedScreen() {
  const { shifts, cancelShift } = useShiftStore();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate a refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const bookedShifts = shifts.filter(shift => shift.isBooked);
  const groupedShifts = groupBy(bookedShifts, 'date');

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {Object.entries(groupedShifts).map(([date, shifts]) => (
        <View key={date} style={styles.dateGroup}>
          <Text style={styles.dateHeader}>
            {new Date(date).toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
          {shifts.map((shift) => (
            <ShiftCard
              key={shift.id}
              {...shift}
              onPress={() => cancelShift(shift.id)}
            />
          ))}
        </View>
      ))}
      {bookedShifts.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateTitle}>No Booked Shifts</Text>
          <Text style={styles.emptyStateText}>
            You haven't booked any shifts yet. Check the Available Shifts tab to find and book shifts.
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  dateGroup: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  dateHeader: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
    marginTop: 24,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
});