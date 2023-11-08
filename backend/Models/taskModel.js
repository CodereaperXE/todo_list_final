const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema(
  {
    TaskName: {
      type: String,
      required: false,
    },
    Description: {
      type: String,
      required: false,
    },
    Reminder: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
)
//creating new mongoose schema
// module.exports=new mongoose.model("Tasks",taskSchema);
//exporting taskSchema
module.exports = new mongoose.model("Task", taskSchema)
