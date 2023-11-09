import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import { connectDB } from "./config/db"
import todoRouter from "./routes/todoRoutes"
import userRouter from "./routes/userRoutes"

const app: express.Application = express()
dotenv.config()
const { PORT } = process.env

// Adding middlewares
app.use(cookieParser())
app.use(express.json())
app.use(cors({ credentials: true, origin: "http://localhost:3000" }))
app.use(express.urlencoded({ extended: true }))

// Connecting to database
connectDB()

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World!!" })
})

app.use("/api/v1/user", userRouter)
app.use("/api/v1/todo", todoRouter)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})

export default app
