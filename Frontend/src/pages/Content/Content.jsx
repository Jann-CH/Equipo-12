import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import { VideoCard } from "../../components/video/VideoCard";
import { getRecommendedVideos } from "../../api/youtubeApi";
import useDashboard from "../../hooks/useDashboard";

const BASE_CATEGORIES = ["Estudio", "Productividad", "Motivación", "Bienestar"];

export default function Content() {

  const { userProfile } = useDashboard();

  // La primera opción después de "Todos" es el primer interés que el
  // usuario eligió en el onboarding (/intereses) — si ya está entre las
  // categorías base, no la repetimos.
  const categories = useMemo(() => {
    const interest = userProfile?.interests?.[0];
    const base = interest && !BASE_CATEGORIES.includes(interest)
      ? [interest, ...BASE_CATEGORIES]
      : BASE_CATEGORIES;

    return ["Todos", ...base];
  }, [userProfile?.interests]);

  const [category, setCategory] = useState("Todos");
  const [videos, setVideos] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [videoError, setVideoError] = useState("");
  const [activeVideo, setActiveVideo] = useState(null);

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

  // Si cambiás de categoría, cerramos el reproductor que estaba abierto
  // (el video activo puede no tener sentido en la nueva lista).
  useEffect(() => {
    setActiveVideo(null);
  }, [category]);

  return (
    <div className="flex flex-col gap-4 py-2 pb-6 max-w-2xl mx-auto">

      <h1 className="text-lg font-medium text-gray-900">Contenido</h1>
      <p className="text-sm text-gray-500 -mt-2">
        Videos seleccionados para inspirarte y ayudarte a crecer.
      </p>

      {/* ===== Chips de categoría ===== */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {categories.map((item) => (
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

      {/* ===== Reproductor embebido, insertado en la misma página ===== */}
      {activeVideo && (
        <div className="bg-black rounded-xl overflow-hidden">
          <div className="flex justify-end p-1.5 bg-black">
            <button
              onClick={() => setActiveVideo(null)}
              className="text-white/70 hover:text-white"
              aria-label="Cerrar video"
            >
              <X size={18} />
            </button>
          </div>

          <div className="aspect-video">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1`}
              title={activeVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="p-3 bg-white">
            <p className="text-sm font-medium text-gray-900">{activeVideo.title}</p>
            <p className="text-xs text-gray-400">{activeVideo.channelTitle}</p>
          </div>
        </div>
      )}

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
          <VideoCard
            key={video.id}
            video={video}
            onPlay={setActiveVideo}
            isActive={activeVideo?.id === video.id}
          />
        ))}
      </div>
    </div>
  );
}
