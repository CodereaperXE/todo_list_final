const Task = require("../Models/userModel");
//new task handler
let createTask=async(req,res)=>{//post packet end up here
        let data = req.body;
        const newTask = new Task(data);
      
        newTask.save()
        .then((savedTask) => {
          console.log('Task saved:', savedTask);
      
          // Find the user by _id and associate the task with the user
          UserData.findByIdAndUpdate('6544e54ab8364b86d2adf72b', { $push: { Tasks: savedTask._id } })
            .then((updatedUser) => {
              console.log('Task associated with user:', updatedUser);
            })
            .catch((error) => {
              console.error('Error associating task with user:', error);
            });
        })
        .catch((error) => {
          console.error('Error saving task:', error);
        });
    }



//task update handler
let updateTask = async function (req, res) {
    try {
        //retrieving data from request
        const { TaskName, Reminder } = req.body;

        console.log(TaskName);
        console.log(Reminder);
       
        //check if missing 
        if (!TaskName || !Reminder) {
            return res.status(400).send({ status: false, msg: 'Missing TaskName or Reminder field' });
        }
        //updating into database
        const taskUpdated = await taskModel.updateMany(
            { TaskName: TaskName },
            { $set: { Reminder: Reminder } }, // Use $set to update the Reminder field
            { new: true }
        );
         console.log(taskUpdated);
        if (!taskUpdated) {
            return res.status(404).send({ status: false, msg: "Task not found or could not be updated" });
        }
        //if taskupdated 
        return res.status(200).send({ status: true, msg: taskUpdated });
    } catch (error) {
        console.log(error)
        res.status(500).send({ status: false, msg: "Internal Server Error" });
    }
}


//exporting modules
 module.exports={createTask,updateTask};
