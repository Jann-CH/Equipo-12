import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import mentorRoutes from "./routes/mentorRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";
import youtubeRoutes from "./routes/youtubeRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/users", userRoutes);
app.use("/api/mentor", mentorRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/youtube", youtubeRoutes);

app.use((req, res) => res.status(404).json({ message: "Ruta no encontrada." }));

export default app;
