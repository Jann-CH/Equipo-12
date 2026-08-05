const CATEGORY_QUERIES = {
  Estudio: "técnicas de estudio para aprender mejor",
  Productividad: "productividad y organización del tiempo",
  Motivación: "motivación para crear hábitos",
  Bienestar: "bienestar y mindfulness para estudiantes",
  // Mismos valores que se pueden elegir en /intereses durante el onboarding
  Ciencia: "ciencia curiosidades y divulgación",
  Tecnología: "tecnología e innovación explicada fácil",
  Historia: "historia curiosidades y documentales cortos",
  Arte: "arte y creatividad inspiración",
  Literatura: "literatura y hábito de lectura",
  Naturaleza: "naturaleza y curiosidades del mundo",
};

export async function searchVideos({ category, interests }) {

  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Falta YOUTUBE_API_KEY en Backend/.env. Generá una en Google Cloud Console (habilitando 'YouTube Data API v3')."
    );
  }

  let query = CATEGORY_QUERIES[category];

  if (!query) {
    query = interests?.length
      ? `${interests[0]} para estudiar`
      : "hábitos de estudio y productividad";
  }

  const params = new URLSearchParams({
    key: apiKey,
    q: query,
    part: "snippet",
    type: "video",
    maxResults: "6",
    relevanceLanguage: "es",
    safeSearch: "strict",
  });

  const response = await fetch(`https://www.googleapis.com/youtube/v3/search?${params.toString()}`);

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody?.error?.message || "Error consultando la API de YouTube.");
  }

  const data = await response.json();

  return (data.items || []).map((item) => ({
    id: item.id.videoId,
    title: item.snippet.title,
    description: item.snippet.description,
    thumbnail: item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url,
    channelTitle: item.snippet.channelTitle,
    url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
  }));
}
