import { apiRequest } from "./client";

export async function getRecommendedVideos(category = "Todos") {
  return apiRequest(`/youtube/recommendations?category=${encodeURIComponent(category)}`);
}
