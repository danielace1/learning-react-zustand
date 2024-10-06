import useHabitStore from "../store/store";

const HabitStat = () => {
  const { habits } = useHabitStore();

  return (
    <div>
      <h1>HabitStaticts</h1>
      <h1>Total Habits: {habits.length}</h1>
      <h2>
        Completed Today:
        {
          habits.filter((habit) =>
            habit.completedDates?.includes(
              new Date().toISOString().split("T")[0]
            )
          ).length
        }
      </h2>
      <h3>
        Longest Streak:
        {habits.reduce((acc, habit) => {
          const streak = habit.completedDates?.reduce((acc, date) => {
            return acc + 1;
          }, 1);
          return streak > acc ? streak : acc;
        }, 0)}{" "}
        days
      </h3>
    </div>
  );
};

export default HabitStat;
