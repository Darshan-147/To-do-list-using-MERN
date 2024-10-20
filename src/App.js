import React, { useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import useTaskManager from "./hooks/useTaskManager";
import "./App.css";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // WebSocket server will be set up on this localhost

const App = () => {
  const {
    tasks,
    addTask,
    editTask,
    deleteTask,
    toggleCompletion,
    searchQuery,
    setSearchQuery,
  } = useTaskManager();

  useEffect(() => {
    socket.on("task-added", (newTask) => {
      addTask(newTask); // This will update UI when a new task is added
    });

    socket.on("task-updated", (updatedTask) => {
      editTask(updatedTask.id, updatedTask);
    });

    socket.on("task-completed", (taskId) => {
      toggleCompletion(taskId);
    });

    return () => {
      socket.off("task-added");
      socket.off("task-updated");
      socket.off("task-completed");
    };
  }, [addTask, editTask, toggleCompletion]);

  return (
    <div className="app">
      <h1>To-Do List</h1>
      <TaskForm onSubmit={addTask} />
      <input
        type="text"
        placeholder="Search tasks or filter by pirority"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <TaskList
        tasks={tasks}
        onEdit={editTask}
        onDelete={deleteTask}
        onComplete={toggleCompletion}
        searchQuery={searchQuery}
      />
    </div>
  );
};

export default App;
