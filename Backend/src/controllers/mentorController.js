import * as mentorService from "../services/mentorService.js";

export async function greeting(req, res) {
  const message = await mentorService.getGreeting();
  res.json({ message });
}

export async function message(req, res) {
  const { message: text } = req.body;
  if (!text || !text.trim()) {
    return res.status(400).json({ message: "El mensaje no puede estar vacío." });
  }
  const reply = await mentorService.reply(text);
  res.json({ reply });
}
