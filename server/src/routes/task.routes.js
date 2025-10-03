////////////////////////////////////////
// 2) Creating Routes
////////////////////////////////////////


import { Router } from "express";
import * as ctl from "../controllers/task.controller.js"

const router = Router()

// "/api/tasks/(*)"
router.get("/", ctl.list)
router.get("/stats", ctl.stats)
router.get("/:id", ctl.getOne)

router.post("/", ctl.create)
router.put("/:id", ctl.update)
router.delete("/:id", ctl.remove)

export default router


