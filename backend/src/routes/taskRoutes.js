import express from "express";
import * as TaskController from "../controllers/taskController.js";

const router = express.Router();

router.get("/tasks", TaskController.listarTasks);
router.get("/tasks/:id", TaskController.buscarTaskPorId);
router.post("/tasks", TaskController.criarTask);
router.put("/tasks/:id", TaskController.atualizarTask);
router.delete("/tasks/:id", TaskController.deletarTask);

export default router;
