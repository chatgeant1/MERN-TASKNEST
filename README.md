# MERN-TASKNEST

Ứng dụng TaskNest – Quản lý công việc cá nhân (MERN Stack)

## Mô tả

TaskNest giúp người dùng quản lý danh sách công việc với các tính năng:

* CRUD nhiệm vụ (thêm, sửa, xóa, cập nhật trạng thái).
* Bộ lọc theo trạng thái (`completed`, `pending`) và theo ngày tạo.
* Phân trang danh sách nhiệm vụ.
* Thống kê số nhiệm vụ đã/đang thực hiện.

---

## Cấu hình môi trường (.env)

### Backend (`server/.env`)
```
PORT=5000
MONGO_URI=<MongoDB Atlas connection string>
CLIENT_URL=https://mern-tasknest.vercel.app
```

### Frontend (`client/.env`)
```
VITE_API_BASE=https://mern-tasknest.onrender.com/api
```

> Lưu ý:
>> * Khi chạy local, có thể dùng:
>>   * `MONGO_URI` trỏ đến Atlas.
>   * `CLIENT_URL=http://localhost:5173`
>   * `VITE_API_BASE=http://localhost:5000/api`
> * Khi deploy, cập nhật lại `.env` tương ứng cho môi trường Render (backend) và Vercel (frontend).

---

## Triển khai (Deployment)

* Backend: [Render](https://render.com) → Deploy từ repo và đặt env `PORT`, `MONGO_URI`, `CLIENT_URL`.
* Frontend: [Vercel](https://vercel.com) → Deploy từ repo và đặt env `VITE_API_BASE`.

### Liên kết mẫu:

* Backend (Render): `https://mern-tasknest.onrender.com/api/tasks`
* Frontend (Vercel): 
`https://mern-tasknest.vercel.app`
`https://mern-tasknest.vercel.app/testing`
`https://mern-tasknest.vercel.app/notfound`

---

## Cách chạy local

1. Clone repo:
   ```bash
   git clone https://github.com/<your-username>/mern-tasknest.git
   cd mern-tasknest
   ```
2. Cài đặt dependencies:
   ```bash
   cd server && npm install
   cd ../client && npm install
   ```
3. Chạy ứng dụng:
   * Backend: `npm start` (hoặc `nodemon server.js`)
   * Frontend: `npm run dev`
