import * as youtubeService from "../services/youtubeService.js";
import * as userService from "../services/userService.js";

export async function recommendations(req, res) {
  try {
    const { category } = req.query;
    const profile = await userService.getUserProfile(req.user.uid);

    const videos = await youtubeService.searchVideos({
      category,
      interests: profile?.interests || [],
    });

    res.json(videos);
  } catch (error) {
    console.error("⚠️ Error de YouTube:", error);
    res.status(502).json({ message: error.message || "No se pudieron obtener videos recomendados." });
  }
}
