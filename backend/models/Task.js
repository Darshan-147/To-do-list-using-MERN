const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  text: { type: String, required: true },
  priority: { type: String, default: "normal" },
  dueDate: { type: String },
  completed: {type:Boolean, default:false},
  user:{type:mongoose.Schema.Types.ObjectId, ref:'User'}
});

module.exports = mongoose.model('Task', TaskSchema);
