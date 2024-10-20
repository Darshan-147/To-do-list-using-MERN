// This is the CRUD for tasks

const Task = require("../models/Task");

// Get Tasks
exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
};

// Add Task
exports.addTask = async (req, res) => {
  const { text, priority, dueDate } = req.body;
  const newTask = new Task({ text, priority, dueDate, user: req.user.id });

  await newTask.save();
  res.status(201).json(newTask);
};

// Update Task
exports.updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (task.user.toString() !== req.user.Id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { text, priority, dueDate, completed } = req.body;
  task.text=text;
  task.priority=priority;
  task.dueDate=dueDate;
  task.completed=completed;
  await task.save();

  res.json(task);
};

// Delete task

exports.deleteTask=async(req,res)=>{
    const task=await Task.findById(req.params.id);
    if(task.user.toString()!==req.user.id){
        return res.status(401).json({message:'Unauthorized'});
    }
    await task.remove();
    res.json({message: 'Task removed successfully!'});
};
