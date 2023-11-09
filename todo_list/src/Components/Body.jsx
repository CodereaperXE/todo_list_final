import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"
import React, { useEffect, useState } from "react"
import "./Body.css"
import {
  addNewDivToOngoingTask,
  addNewDivToReminder,
  deleteTask,
  loadDetails,
  loadFromInput,
} from "./TaskBox"

function Body() {
  const [taskTitle, setTaskTitle] = useState("")
  const [tasks, setTasks] = useState("")
  const handleNewTask = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/v1/todo",
        {
          title: taskTitle,
        },
        {
          withCredentials: true,
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const getTasks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/v1/todo", {
          withCredentials: true,
        })
        setTasks(res.data)
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getTasks()
  }, [])
  return (
    <>
      {/* <img src="https://armory.visualsoldiers.com/wp-content/uploads/2021/09/parallax-scroll-animations.jpg" alt="" /> */}
      <div id="main" className="container-fluid vh-100 overflow-hidden">
        <div id="mainrow" className="row container-fluid">
          <div id="reminder" className="col-4 container-fluid">
            <center>
              <h4 id="reminder_title" className="title_font">
                Ongoing Task
              </h4>
            </center>

            <button onClick={() => addNewDivToReminder("Reminder")}>
              Add Reminder
            </button>
            {/* <button onClick={ModalBox}>Add New Div</button> */}
          </div>
          <div id="task" className="col-4 container-fluid">
            <input
              id="add_task_input"
              type="text"
              placeholder="Enter Task"
              onChange={(e) => setTaskTitle(e.target.value)}
            />
            <button id="add_task_button" onClick={handleNewTask}>
              +
            </button>
            <div id="ongoing_task" className="container-fluid">
              <center>
                <h4 className="title_font">Ongoing Task</h4>
                {tasks &&
                  tasks.todos?.map((task) => (
                    <p className="title_font" key={task._id}>
                      {task.title}
                    </p>
                  ))}
              </center>
            </div>
            <div id="done_task" className="container-fluid">
              <center>
                <h4 className="title_font">Completed Task</h4>
              </center>

              {/* <button onClick={()=>deleteTask("1")}>hello</button> */}
            </div>
          </div>
          <div id="recommend" className="col-4 container-fluid">
            <div id="task_details" className="container-fluid">
              <center>
                <h4 className="title_font">Task Description</h4>
              </center>

              {/* <input id="get_description" placeholder="enter details" type="text" /> */}
              {/* <button id="description_button"></button> */}
              <div id="details" className="details container">
                No Description
              </div>
            </div>
            <div id="task_recommendation" className="container-fluid"></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Body
