import { Play } from "lucide-react";

export function VideoCard({ video }) {
  return (
    <a
      href={video.url}
      target="_blank"
      rel="noreferrer"
      className="flex gap-3 bg-white rounded-xl border border-gray-100 p-3 hover:shadow-sm transition-shadow"
    >
      <div className="relative w-28 h-20 rounded-lg overflow-hidden shrink-0 bg-gray-100">
        {video.thumbnail && (
          <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <Play size={20} className="text-white" fill="white" />
        </div>
      </div>

      <div className="flex flex-col min-w-0 justify-center">
        <p className="text-sm font-medium text-gray-900 line-clamp-2">{video.title}</p>
        <p className="text-xs text-gray-400 mt-1 truncate">{video.channelTitle}</p>
      </div>
    </a>
  );
}
