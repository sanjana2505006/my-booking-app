import { create } from 'zustand';
import { Shift } from '@/types/shift';

interface ShiftState {
  shifts: Shift[];
  cities: string[];
  selectedCity: string | null;
  setSelectedCity: (city: string | null) => void;
  bookShift: (shiftId: string) => void;
  cancelShift: (shiftId: string) => void;
}

// Sample data
const initialShifts: Shift[] = [
  {
    id: '1',
    date: '2024-02-20',
    startTime: '09:00',
    endTime: '17:00',
    location: 'Downtown Hospital',
    city: 'New York',
    isBooked: true,
  },
  {
    id: '2',
    date: '2024-02-20',
    startTime: '14:00',
    endTime: '22:00',
    location: 'Central Clinic',
    city: 'Boston',
    isBooked: false,
  },
  {
    id: '3',
    date: '2024-02-21',
    startTime: '08:00',
    endTime: '16:00',
    location: 'Medical Center',
    city: 'New York',
    isBooked: true,
  },
];

export const useShiftStore = create<ShiftState>((set) => ({
  shifts: initialShifts,
  cities: [...new Set(initialShifts.map(shift => shift.city))],
  selectedCity: null,
  setSelectedCity: (city) => set({ selectedCity: city }),
  bookShift: (shiftId) =>
    set((state) => ({
      shifts: state.shifts.map((shift) =>
        shift.id === shiftId ? { ...shift, isBooked: true } : shift
      ),
    })),
  cancelShift: (shiftId) =>
    set((state) => ({
      shifts: state.shifts.map((shift) =>
        shift.id === shiftId ? { ...shift, isBooked: false } : shift
      ),
    })),
}));