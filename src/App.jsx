import { useState, useEffect } from "react";
import TaskItem from "./components/TaskItem";
import { TextField, Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { useSprings, animated } from 'react-spring';

function App() {
  const getSavedTasks = () => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  };

  const [tasks, setTasks] = useState(getSavedTasks);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [category, setCategory] = useState("Personal");
  const [priority, setPriority] = useState("Medium");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTitle.trim() && newDescription.trim()) {
      const newTask = {
        id: tasks.length + 1,
        title: newTitle,
        description: newDescription,
        category,
        priority,
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setNewTitle("");
      setNewDescription("");
      setCategory("Personal");
      setPriority("Medium");
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTask = (id, updatedTitle, updatedDescription, updatedCategory, updatedPriority) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, title: updatedTitle, description: updatedDescription, category: updatedCategory, priority: updatedPriority }
          : task
      )
    );
  };

  const filteredTasks = tasks
    .filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((task) => (filterCategory === "All" ? true : task.category === filterCategory))
    .filter((task) => (filterPriority === "All" ? true : task.priority === filterPriority));

  // انیمیشن برای لیست تسک‌ها
  const springs = useSprings(
    tasks.length,
    tasks.map((task, index) => ({
      opacity: 1,
      transform: 'translateY(0)',
      from: { opacity: 0, transform: 'translateY(-20px)' },
      config: { duration: 500 },
    }))
  );

  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-5 text-center">To-Do App</h1>

      <div className="mb-5 flex justify-center gap-5">
        <TextField
          type="text"
          placeholder="Search ..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          variant="outlined"
          className="w-1/3"
        />

        <FormControl className="w-1/4">
          <InputLabel>Category</InputLabel>
          <Select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Personal">Personal</MenuItem>
            <MenuItem value="Work">Work</MenuItem>
            <MenuItem value="Shopping">Shopping</MenuItem>
          </Select>
        </FormControl>

        <FormControl className="w-1/4">
          <InputLabel>Priority</InputLabel>
          <Select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
          </Select>
        </FormControl>
      </div>

      <animated.div className="mb-5 flex justify-center gap-3">
        <TextField
          type="text"
          placeholder="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          variant="outlined"
          className="w-1/4"
        />
        <TextField
          type="text"
          placeholder="Description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          variant="outlined"
          className="w-1/4"
        />

        <FormControl className="w-1/6">
          <InputLabel>Category</InputLabel>
          <Select value={category} onChange={(e) => setCategory(e.target.value)}>
            <MenuItem value="Personal">Personal</MenuItem>
            <MenuItem value="Work">Work</MenuItem>
            <MenuItem value="Shopping">Shopping</MenuItem>
          </Select>
        </FormControl>

        <FormControl className="w-1/6">
          <InputLabel>Priority</InputLabel>
          <Select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
          </Select>
        </FormControl>

        <Button onClick={addTask} variant="contained" color="primary">
          Add
        </Button>
      </animated.div>

      <div>
        {springs.map((props, index) => (
          <animated.div style={props} key={filteredTasks[index].id}>
            <TaskItem {...filteredTasks[index]} deleteTask={deleteTask} updateTask={updateTask} />
          </animated.div>
        ))}
      </div>
    </div>
  );
}

export default App;
