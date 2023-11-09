const express = require("express")
const router = express.Router()
//login controller
const loginController = require("../Controllers/loginController")
//task controller
const taskController = require("../Controllers/taskController")

//signup request forwarding
router.post("/signup", loginController.signup)
//login controller
router.post("/login", loginController.login)

router.patch("/task", taskController.createTask)

//task update
router.patch("/updateTask", taskController.updateTask)
router.get("/alltask", taskController.getAllTasks)

//exporting modules
module.exports = router
