import { useEffect, useState } from "react";
import { VideoCard } from "../../components/video/VideoCard";
import { getRecommendedVideos } from "../../api/youtubeApi";

const CATEGORIES = ["Todos", "Estudio", "Productividad", "Motivación", "Bienestar"];

export default function Content() {

  const [category, setCategory] = useState("Todos");
  const [videos, setVideos] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [videoError, setVideoError] = useState("");

  useEffect(() => {

    setLoadingVideos(true);
    setVideoError("");

    getRecommendedVideos(category)
      .then(setVideos)
      .catch((error) => {
        console.error("⚠️ Error cargando videos:", error);
        // Mostramos el error REAL que vino del Backend, no un mensaje genérico
        // (puede ser una API key inválida, cuota agotada, restricciones, etc.)
        setVideoError(error.message || "No se pudieron cargar los videos recomendados.");
      })
      .finally(() => setLoadingVideos(false));

  }, [category]);

  return (
    <div className="flex flex-col gap-4 py-2 pb-6 max-w-2xl mx-auto">

      <h1 className="text-lg font-medium text-gray-900">Contenido</h1>
      <p className="text-sm text-gray-500 -mt-2">
        Videos seleccionados para inspirarte y ayudarte a crecer.
      </p>

      {/* ===== Chips de categoría ===== */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {CATEGORIES.map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item)}
            className={`text-xs px-4 py-1.5 rounded-full whitespace-nowrap transition-colors ${
              category === item
                ? "bg-[#186875] text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:border-[#186875]/40"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* ===== Videos recomendados (YouTube) ===== */}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-medium text-gray-500">Videos recomendados para vos</p>

        {loadingVideos && <p className="text-xs text-gray-400">Cargando videos...</p>}

        {videoError && (
          <div className="bg-red-50 border border-red-100 rounded-lg p-3">
            <p className="text-xs text-red-600">{videoError}</p>
            <p className="text-xs text-red-400 mt-1">
              Chequeá en Google Cloud Console: que la "YouTube Data API v3" esté HABILITADA para
              el proyecto de esa key, que la key no tenga restricciones de HTTP referrer (esas
              solo sirven para llamados desde el navegador, no desde el Backend), y que no haya
              superado la cuota diaria gratuita.
            </p>
          </div>
        )}

        {!loadingVideos && !videoError && videos.length === 0 && (
          <p className="text-xs text-gray-400">No encontramos videos para esta categoría.</p>
        )}

        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}
