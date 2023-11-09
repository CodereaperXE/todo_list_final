const express = require("express") //importing express
const mongoose = require("mongoose") //importing mongoose
const app = express() //used for main operations in express
const routes = require("./Routes/Route") //used for routing

const cors = require("cors") //used to tackle issue of cors

app.use(express.json()) //using json format

app.use(cors()) //should be called before defining routes

app.use("/", routes) //app '/' to routes basically redirection

//setting up database
mongoose
  .connect(
    "mongodb+srv://rb:mongodbiscrazy1234@cluster0.r0xtiw6.mongodb.net/internship"
  )
  .then(() => {
    console.log("Database connected successfully")
  })
  .catch((err) => {
    console.log(err, "Something went wrong")
  })

//Test api
app.get("/test", (req, res) => {
  res.send("Hello this is a test api")
})

app.listen(5000, () => {
  console.log("Server is running on port 5000")
})
