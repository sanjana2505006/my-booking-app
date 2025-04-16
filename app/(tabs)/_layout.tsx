import { Tabs } from 'expo-router';
import { Calendar, CalendarCheck } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#007AFF',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#E5E7EB',
        },
        headerStyle: {
          backgroundColor: '#ffffff',
        },
        headerTitleStyle: {
          fontWeight: '600',
          color: '#111827',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'My Shifts',
          tabBarIcon: ({ color, size }) => (
            <CalendarCheck size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="available"
        options={{
          title: 'Available Shifts',
          tabBarIcon: ({ color, size }) => (
            <Calendar size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}