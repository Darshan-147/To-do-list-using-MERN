const TaskItem = ({ task, onEdit, onDelete, onComplete }) => (
  <div className={`task-item ${task.completed ? "completed" : ""}`}>
    <p>{task.text}</p>
    <p>Priority: {task.priority}</p>
    {task.dueDate && <p>Due:{task.dueDate}</p>}
    <button onClick={() => onComplete(task.id)}>
      {task.completed ? "Unmark" : "Complete"}
    </button>
    <button onClick={() => onEdit(task.id)}>Edit</button>
    <button onClick={() => onDelete(task.id)}>Delete</button>
  </div>
);

export default TaskItem;
