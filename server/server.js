////////////////////////////////////////
// 1) Bắt đầu tạo APIs (Express server)
////////////////////////////////////////

import express from "express"
import cors from "cors"
import morgan from "morgan"
import dotenv from "dotenv"
import mongoose from "mongoose"
import taskRoutes from "./src/routes/task.routes.js"

dotenv.config()
const app = express()

const allowedOrigins = [
  process.env.CLIENT_URL,        // Vercel FE
  'http://localhost:5173'       // Local dev
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // Postman / curl
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

console.log("CLIENT_URL:", process.env.CLIENT_URL)

app.use(express.json())
app.use(morgan("dev"))

mongoose.connect(process.env.MONGO_URI)
    .then( () => console.log("MongoDB connected"))
    .catch(err => console.error("Mongo error: ", err.message))


app.use("/api/tasks", taskRoutes)

const PORT = process.env.PORT || 5000 

app.listen(PORT, (req, res) => { console.log(`API on ${process.env.PORT}`)})









