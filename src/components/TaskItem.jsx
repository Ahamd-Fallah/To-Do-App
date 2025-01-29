import { useState } from "react";
import { TextField, Button, MenuItem, Select, FormControl } from "@mui/material";
import { Edit, Delete, Check, Close } from "@mui/icons-material";
import { useSpring, animated } from 'react-spring';

function TaskItem({ id, title, description, category, priority, deleteTask, updateTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedCategory, setEditedCategory] = useState(category);
  const [editedPriority, setEditedPriority] = useState(priority);

  const handleSave = () => {
    updateTask(id, editedTitle, editedDescription, editedCategory, editedPriority);
    setIsEditing(false);
  };

  const editProps = useSpring({
    opacity: isEditing ? 1 : 0,
    display: isEditing ? "block" : "none",
    transform: isEditing ? "scale(1)" : "scale(0.9)",
    config: { duration: 300 },
  });

  const showProps = useSpring({
    opacity: isEditing ? 0 : 1,
    transform: isEditing ? "scale(0.9)" : "scale(1)",
    config: { duration: 300 },
  });

  return (
    <div className="flex justify-between items-center bg-white shadow-md rounded-lg p-4 mb-3 border-l-4"
         style={{ borderColor: priority === "High" ? "red" : priority === "Medium" ? "orange" : "green" }}>

      <animated.div style={editProps} className="flex-grow">
        <TextField value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} variant="outlined" fullWidth />
        <TextField value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} variant="outlined" fullWidth />

        <FormControl fullWidth>
          <Select value={editedCategory} onChange={(e) => setEditedCategory(e.target.value)}>
            <MenuItem value="Personal">Personal</MenuItem>
            <MenuItem value="Work">Work</MenuItem>
            <MenuItem value="Shopping">Shopping</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <Select value={editedPriority} onChange={(e) => setEditedPriority(e.target.value)}>
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
          </Select>
        </FormControl>

        <Button onClick={handleSave}><Check /></Button>
        <Button onClick={() => setIsEditing(false)}><Close /></Button>
      </animated.div>

      <animated.div style={showProps} className="flex-grow">
        <h3>{title} ({category})</h3>
        <p>{description}</p>
      </animated.div>

      <div>
        <Button onClick={() => setIsEditing(true)}><Edit /></Button>
        <Button onClick={() => deleteTask(id)}><Delete /></Button>
      </div>
    </div>
  );
}

export default TaskItem;
