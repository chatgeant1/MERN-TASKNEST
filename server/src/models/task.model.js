////////////////////////////////////////
// 3) Tạo Model cho Database
////////////////////////////////////////

import mongoose from "mongoose";

// TaskSchema(title, status, dueDate)
const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },

    status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending"
    },

    dueDate: {
        type: Date
    },
}, 
    {timestamps: true}  
)

// index trên field createdAt - index tăng dần (ascending) 
// giúp query sắp xếp, lọc theo ngày tạo nhanh hơn khi dữ liệu lớn.
TaskSchema.index({createdAt: 1})


/**
Tạo ra  Model "Task" = khung Schema ánh xạ với collection trong MongoDB 
Khi dùng Task.find(), Task.create(), Task.updateOne()… là thao tác với collection
Task là biến export để import ở chỗ khác và gọi hàm CRUD.
Mongoose tự tạo collection.
 */
const Task = mongoose.model("Task", TaskSchema, "my_tasks_collection")
export default Task


