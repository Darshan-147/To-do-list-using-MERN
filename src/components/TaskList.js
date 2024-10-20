import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onEdit, onDelete, onComplete, searchQuery }) => {
  const filteredTasks = tasks.filter(
    (task) =>
      task.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.priority === searchQuery
  );

  return (
    <div className="task-list">
      {filteredTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onComplete={onComplete}
        />
      ))}
    </div>
  );
};

export default TaskList;
