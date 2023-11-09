const Task = require("../Models/taskModel")
const UserData = require("../Models/userModel")
//new task handler
let createTask = async (req, res) => {
  //post packet end up here
  let data = req.body
  console.log(data)
  const newTask = new Task(data)

  await newTask
    .save()
    .then((savedTask) => {
      console.log("Task saved:", savedTask)

      // Find the user by _id and associate the task with the user
      UserData.findByIdAndUpdate("654bb6d4b6f173728904861c", {
        $push: { Tasks: savedTask._id },
      })
        .then((updatedUser) => {
          console.log("Task associated with user:", updatedUser)
        })
        .catch((error) => {
          console.error("Error associating task with user:", error)
        })
    })
    .catch((error) => {
      console.error("Error saving task:", error)
    })
}

//task update handler
let updateTask = async function (req, res) {
  try {
    //retrieving data from request
    const { TaskName, Reminder } = req.body

    console.log(TaskName)
    console.log(Reminder)

    //check if missing
    if (!TaskName || !Reminder) {
      return res
        .status(400)
        .send({ status: false, msg: "Missing TaskName or Reminder field" })
    }
    //updating into database
    const taskUpdated = await taskModel.updateMany(
      { TaskName: TaskName },
      { $set: { Reminder: Reminder } }, // Use $set to update the Reminder field
      { new: true }
    )
    console.log(taskUpdated)
    if (!taskUpdated) {
      return res
        .status(404)
        .send({ status: false, msg: "Task not found or could not be updated" })
    }
    //if taskupdated
    return res.status(200).send({ status: true, msg: taskUpdated })
  } catch (error) {
    console.log(error)
    res.status(500).send({ status: false, msg: "Internal Server Error" })
  }
}

const getAllTasks = async (req, res) => {
  try {
    const tasks = []
    // Get tasks from the user
    const user = await UserData.findById("654bb6d4b6f173728904861c")
    user.Tasks.forEach(async (task) => {
      tasks.push(await Task.findById(task))
    })
    console.log(tasks)
    await res.status(200).send({ status: true, tasks: tasks })
  } catch (error) {
    console.error(error)
    res.status(500).send({ status: false, msg: "Internal Server Error" })
  }
}

//exporting modules
module.exports = { createTask, updateTask, getAllTasks }
