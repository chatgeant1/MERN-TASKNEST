////////////////////////////////////////
// 4) Logic Controllers & test API (Thunder Client/Postman)
// list (GET /tasks)
// getOne (GET /tasks/:id)

// create (POST /tasks)
// update (PUT /tasks/:id)
// remove (DELETE /tasks/:id)

// stats (GET /tasks/stats)
////////////////////////////////////////

import Task from "../models/task.model.js"

// lấy danh sách, lọc, phân trang
export const list = async (req, res) => {
    const {status, from, to, page=1, limit=10} = req.query

    const q = {}

    // ["pending", "completed"]
    if(status) q.status = status  

    // lọc theo ngày tạo
    if(from || to){
        q.createdAt = {}
        if(from)    q.createdAt.$gte = new Date(from)
        if(to)      q.createdAt.$lte = new Date(to)
    }

    const skip = (Number(page) - 1) * Number(limit)

    const [items, total] = await Promise.all([
        Task.find(q).sort({createdAt: -1}).skip(skip).limit(Number(limit)),
        Task.countDocuments(q)
    ])

    res.json({
        items,
        total,
        page: Number(page),
        pages: Math.ceil(total/Number(limit))
    })
}

// tạo task mới
export const create = async (req, res) => {
    const {title, status, dueDate} = req.body
    const task = await Task.create({title, status, dueDate})
    res.status(201).json(task)
}

// cập nhật task
export const update = async (req, res) => {
    const task = await Task.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        {new: true}
    )
    res.json(task)
}

// thống kê
export const stats = async (req, res) => {
    const [byStatus, byDay] = await Promise.all([
        // thống kê theo status
        Task.aggregate([
            {
                $group: {
                    _id: "$status", 
                    count: {$sum: 1}
                }
            }
        ]),
        // thống kê theo ngày tạo
        Task.aggregate([
            {
                $group:{
                    _id: {$dateToString: {format: "%Y-%m-%d", date: "$createdAt"}},
                    count: {$sum: 1}

                }
            },
            {$sort: {_id: 1}}
        ])
    ])
    res.json({byStatus, byDay})
}


// lấy 1 task theo id (để hiển thị chi tiết hoặc form edit)
export const getOne = async (req, res) => {
    const task = await Task.findById(req.params.id)
    if(!task) return res.status(404).json({message: "Not found"})
    res.json(task)
}

// xóa 1 task
export const remove = async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id)
    if(!task) return res.status(404).json({message: "Not found"})
    res.json({message: "Deleted"})
}

// Test nhanh (Thunder Client)
// • POST /api/task body: { "title": "Learn MERN", "status":"pending","dueDate": "2025-09-30" }
// • GET /api/todos?status=pending&page=1&limit=5
// • GET /api/todos/stats