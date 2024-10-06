import { Box, Container, Typography } from "@mui/material";
import "./App.css";
import useHabitStore from "./store/store";
import AddhabitForm from "./components/form";
import HabitList from "./components/HabitList";
import { useEffect } from "react";
import HabitStat from "./components/HabitStat";

function App() {
  const { fetchHabits } = useHabitStore();

  useEffect(() => {
    fetchHabits();
  }, []);

  return (
    <Container>
      <Box>
        <Typography variant="h2" component="h1" gutterBottom align="center">
          Habit Tracker
        </Typography>

        {/* Form */}
        <AddhabitForm />
        {/* Lists */}
        <HabitList />
        {/* stats */}
        <HabitStat />
      </Box>
    </Container>
  );
}

export default App;
