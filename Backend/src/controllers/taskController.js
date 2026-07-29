import * as taskService from "../services/taskService.js";

export async function create(req, res) {
  try {
    const { title, notes, dueDate } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "El título de la tarea es obligatorio." });
    }

    const task = await taskService.createTask(req.user.uid, {
      title: title.trim(),
      notes: notes?.trim() || null,
      dueDate: dueDate || null,
    });
    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "No se pudo crear la tarea." });
  }
}

export async function list(req, res) {
  try {
    const tasks = await taskService.getTasks(req.user.uid);
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "No se pudieron obtener las tareas." });
  }
}

export async function complete(req, res) {
  try {
    const task = await taskService.completeTask(req.user.uid, req.params.id);
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "No se pudo completar la tarea." });
  }
}
