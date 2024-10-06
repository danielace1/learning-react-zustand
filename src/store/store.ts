import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface Habit {
  id: string;
  name: string;
  frequency: "daily" | "weekly";
  completedDates: string[];
  createdAt: string;
}

interface HabitState {
  habits: Habit[];
  addHabit: (name: string, frequency: "daily" | "weekly") => void;
  removeHabit: (id: string) => void;
  toggleHabit: (id: string, date: string) => void;
  fetchHabits: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const useHabitStore = create<HabitState>()(
  devtools(
    persist(
      (set, get) => {
        return {
          habits: [],
          isLoading: false,
          error: null,
          addHabit: (name, frequency) =>
            set((state) => {
              return {
                habits: [
                  ...state.habits,
                  {
                    id: Math.random().toString(36).substr(2, 9),
                    name,
                    frequency,
                    completedDates: [],
                    createdAt: new Date().toISOString(),
                  },
                ],
              };
            }),
          removeHabit: (id) =>
            set((state) => ({
              habits: state.habits.filter((habit) => habit.id !== id),
            })),

          toggleHabit: (id, date) =>
            set((state) => ({
              habits: state.habits.map((habit) =>
                habit.id === id
                  ? {
                      ...habit,
                      completedDates: habit.completedDates.includes(date)
                        ? habit.completedDates.filter((d) => d !== date)
                        : [...habit.completedDates, date],
                    }
                  : habit
              ),
            })),

          fetchHabits: async () => {
            set({ isLoading: true });
            try {
              const currentHabits = get().habits;
              console.log(currentHabits);

              if (currentHabits.length > 0) {
                set({ isLoading: false });
                return;
              }
              await new Promise((resolve) => setTimeout(resolve, 100));
              const mockHabits: Habit[] = [
                {
                  id: "1",
                  name: "Drink Water",
                  frequency: "daily",
                  completedDates: ["2021-10-01", "2021-10-02"],
                  createdAt: new Date().toISOString(),
                },
                {
                  id: "2",
                  name: "Read a book",
                  frequency: "daily",
                  completedDates: ["2021-10-01"],
                  createdAt: new Date().toISOString(),
                },
                {
                  id: "3",
                  name: "Workout",
                  frequency: "daily",
                  completedDates: ["2021-10-01", "2021-10-02"],
                  createdAt: new Date().toISOString(),
                },
              ];
              set({ habits: mockHabits, isLoading: false });
            } catch (error) {
              set({ error: "Failed to fetch Habits", isLoading: false });
            }
          },
        };
      },
      { name: "habits-local" }
    )
  )
);
export default useHabitStore;
