import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw, RotateCw, Square } from "lucide-react";

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

// Reproductor para archivos de audio reales (mp3/wav/etc), con play/pausa/± 10s
function AudioFilePlayer({ item }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  }

  function seek(offsetSeconds) {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(
      Math.max(audio.currentTime + offsetSeconds, 0),
      duration || audio.duration || 0
    );
  }

  if (!item.objectUrl) {
    return (
      <p className="text-xs text-gray-400 italic">
        Este audio se subió en otra sesión del navegador, así que ya no está disponible para reproducir
        (todavía no guardamos el archivo en un storage persistente — ver nota más abajo).
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <audio
        ref={audioRef}
        src={item.objectUrl}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onLoadedMetadata={(e) => setDuration(e.target.duration)}
        onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="flex items-center gap-3">
        <button onClick={() => seek(-10)} className="text-gray-500 hover:text-indigo-600" aria-label="Retroceder 10 segundos">
          <RotateCcw size={18} />
        </button>

        <button
          onClick={togglePlay}
          className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700"
          aria-label={isPlaying ? "Pausar" : "Reproducir"}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>

        <button onClick={() => seek(10)} className="text-gray-500 hover:text-indigo-600" aria-label="Adelantar 10 segundos">
          <RotateCw size={18} />
        </button>

        <span className="text-xs text-gray-400 ml-auto">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>
    </div>
  );
}

// Divide el texto en fragmentos (oraciones/párrafos) para poder "adelantar"
// y "retroceder" de verdad, algo que la Web Speech API no soporta nativamente.
function splitIntoChunks(text) {
  const chunks = text
    .split(/(?<=[.!?])\s+|\n+/)
    .map((chunk) => chunk.trim())
    .filter(Boolean);

  return chunks.length ? chunks : [text];
}

// "Reproductor" para texto convertido a voz con el sintetizador del navegador
// (gratis, sin backend). Soporta pausa/reanudación real y adelantar/retroceder
// saltando fragmentos de texto (oraciones), ya que no se puede "buscar" tiempo
// dentro de una síntesis de voz como en un audio real.
function TextToSpeechPlayer({ item }) {
  const chunksRef = useRef(splitIntoChunks(item.text));
  const [chunkIndex, setChunkIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    return () => window.speechSynthesis.cancel();
  }, []);

  function speakFrom(index) {
    const chunks = chunksRef.current;
    if (index < 0 || index >= chunks.length) {
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(chunks[index]);
    utterance.lang = "es-ES";

    utterance.onend = () => {
      // Avanza automáticamente al siguiente fragmento (reproducción continua)
      if (index + 1 < chunks.length) {
        setChunkIndex(index + 1);
        speakFrom(index + 1);
      } else {
        setIsSpeaking(false);
      }
    };

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
    setIsPaused(false);

    // Media Session API: permite controlar la reproducción desde la pantalla
    // de bloqueo / controles multimedia del sistema operativo (cuando el
    // navegador lo soporta).
    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new window.MediaMetadata({
        title: item.name,
        artist: "Nova · Innova Mentor",
      });
      navigator.mediaSession.setActionHandler("play", () => handlePlay());
      navigator.mediaSession.setActionHandler("pause", () => handlePause());
      navigator.mediaSession.setActionHandler("previoustrack", () => handleSeek(-1));
      navigator.mediaSession.setActionHandler("nexttrack", () => handleSeek(1));
    }
  }

  function handlePlay() {
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsSpeaking(true);
      return;
    }
    speakFrom(chunkIndex);
  }

  function handlePause() {
    window.speechSynthesis.pause();
    setIsPaused(true);
    setIsSpeaking(false);
  }

  function handleStop() {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
    setChunkIndex(0);
  }

  function handleSeek(direction) {
    const nextIndex = Math.min(
      Math.max(chunkIndex + direction, 0),
      chunksRef.current.length - 1
    );
    setChunkIndex(nextIndex);
    speakFrom(nextIndex);
  }

  return (
    <div className="flex items-center gap-3">
      <button onClick={() => handleSeek(-1)} className="text-gray-500 hover:text-indigo-600" aria-label="Fragmento anterior">
        <RotateCcw size={18} />
      </button>

      <button
        onClick={isSpeaking ? handlePause : handlePlay}
        className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700"
        aria-label={isSpeaking ? "Pausar lectura" : "Reproducir lectura"}
      >
        {isSpeaking ? <Pause size={16} /> : <Play size={16} />}
      </button>

      <button onClick={() => handleSeek(1)} className="text-gray-500 hover:text-indigo-600" aria-label="Siguiente fragmento">
        <RotateCw size={18} />
      </button>

      <button onClick={handleStop} className="text-gray-400 hover:text-indigo-600" aria-label="Detener lectura">
        <Square size={14} />
      </button>

      <span className="text-xs text-gray-400 ml-auto">
        {chunkIndex + 1}/{chunksRef.current.length}
      </span>
    </div>
  );
}

export function AudioPlayer({ item }) {
  return item.type === "tts"
    ? <TextToSpeechPlayer item={item} />
    : <AudioFilePlayer item={item} />;
}
