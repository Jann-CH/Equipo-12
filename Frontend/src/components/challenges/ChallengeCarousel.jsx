import { useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Elige 'count' elementos al azar de la lista, sin repetir.
function pickRandom(items, count) {
  const shuffled = [...items].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function ChallengeCarousel({ challenges, selectedId, onSelect }) {

  // Se eligen una sola vez (mientras el componente esté montado), así no
  // cambian solos cada vez que el usuario navega con las flechas.
  const dailyChallenges = useMemo(() => pickRandom(challenges, 3), [challenges]);

  const currentIndex = Math.max(
    dailyChallenges.findIndex((c) => c.id === selectedId),
    0
  );

  const current = dailyChallenges[currentIndex];

  function goTo(index) {
    const clamped = Math.max(0, Math.min(index, dailyChallenges.length - 1));
    onSelect(dailyChallenges[clamped].id);
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <button
        onClick={() => goTo(currentIndex - 1)}
        disabled={currentIndex === 0}
        aria-label="Desafío anterior"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          flexShrink: 0,
          opacity: currentIndex === 0 ? 0.2 : 1,
        }}
      >
        <ChevronLeft size={26} color="#9CA3AF" />
      </button>

      <button
        onClick={() => onSelect(current.id)}
        style={{
          flex: 1,
          textAlign: "center",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          padding: 0,
        }}
      >
        <h2 style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
          <span>{current.icon || "📖"}</span>
          {current.title}
        </h2>

        {current.description && <p>{current.description}</p>}

        <p style={{ fontSize: 12, color: "#9CA3AF", marginTop: 4 }}>
          {current.durationMinutes} min · {currentIndex + 1} de {dailyChallenges.length}
        </p>
      </button>

      <button
        onClick={() => goTo(currentIndex + 1)}
        disabled={currentIndex === dailyChallenges.length - 1}
        aria-label="Siguiente desafío"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          flexShrink: 0,
          opacity: currentIndex === dailyChallenges.length - 1 ? 0.2 : 1,
        }}
      >
        <ChevronRight size={26} color="#9CA3AF" />
      </button>
    </div>
  );
}
