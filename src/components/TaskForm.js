import { useState } from "react";

const TaskForm = ({ onSubmit, editTask }) => {
  const [task, setTask] = useState(editTask ? editTask.text : "");
  const [priority, setPriority] = useState(
    editTask ? editTask.priority : "normal"
  );
  const [dueDate, setDueDate] = useState(editTask ? editTask.dueDate : "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      onSubmit({ text: task, priority, dueDate });
      setTask("");
      setPriority("normal");
      setDueDate("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter your task"
        required
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">Low</option>
        <option value="normal">Normal</option>
        <option value="high">High</option>
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button type="submit">{editTask ? "Update task" : "Add task"}</button>
    </form>
  );
};

export default TaskForm;
