import * as contentService from "../services/contentService.js";

export async function create(req, res) {
  try {
    const { name, type, text } = req.body;

    if (!name || !type) {
      return res.status(400).json({ message: "Faltan datos del contenido (name, type)." });
    }

    const content = await contentService.createContent(req.user.uid, { name, type, text });
    res.status(201).json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "No se pudo guardar el contenido." });
  }
}

export async function list(req, res) {
  try {
    const content = await contentService.getContent(req.user.uid);
    res.json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "No se pudo obtener el contenido." });
  }
}
