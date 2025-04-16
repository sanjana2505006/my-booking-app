import { StyleSheet, View, ScrollView, Text, RefreshControl } from 'react-native';
import { useShiftStore } from '@/store/shifts';
import { ShiftCard } from '@/components/ShiftCard';
import { groupBy } from '@/utils/array';
import { CityFilter } from '@/components/CityFilter';
import { useState, useCallback } from 'react';

export default function AvailableScreen() {
  const { shifts, bookShift, cities, selectedCity, setSelectedCity } = useShiftStore();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate a refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const availableShifts = shifts.filter(
    shift => !shift.isBooked && (!selectedCity || shift.city === selectedCity)
  );
  const groupedShifts = groupBy(availableShifts, 'date');

  return (
    <View style={styles.container}>
      <CityFilter
        cities={cities}
        selectedCity={selectedCity}
        onSelectCity={setSelectedCity}
      />
      <ScrollView
        style={styles.scrollView}
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
                onPress={() => bookShift(shift.id)}
              />
            ))}
          </View>
        ))}
        {availableShifts.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>No Available Shifts</Text>
            <Text style={styles.emptyStateText}>
              {selectedCity
                ? `No shifts available in ${selectedCity}. Try selecting a different city.`
                : 'No shifts available at the moment. Pull down to refresh.'}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  scrollView: {
    flex: 1,
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