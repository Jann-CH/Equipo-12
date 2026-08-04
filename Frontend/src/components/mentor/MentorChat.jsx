import { useState, useRef, useEffect } from 'react'
import { X, Send } from 'lucide-react'
import logoNova from "/branding/Avatar-Nova-Estrella.svg";

const QUICK_REPLIES = [
  "¿Qué tareas tengo hoy?",
  "¿Por dónde empiezo?",
  "Necesito ayuda para estudiar",
  "Motivame un poco 💪",
]

export function MentorChat({ messages, isTyping, onClose, onSend }) {
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleSend = (text) => {
    if (!text.trim()) return

    onSend(text)
    setInput('')
  }

  return (
    <div
      className="
        fixed z-50 bg-white rounded-2xl
        shadow-[0_8px_30px_rgba(24,104,117,0.18)]
        border border-[#C3EDE1]
        flex flex-col overflow-hidden

        right-4 w-72
        bottom-36
        md:right-6 md:w-80
        md:bottom-32
      "
    >
      {/* Header */}
      <div className="bg-[#186875] px-4 py-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0">
          <img
            src={logoNova}
            alt="Nova"
            className="w-6 h-6 object-contain"
          />
        </div>

        <div className="flex-1">
          <p className="text-xs font-medium text-white">
            Tu mentor
          </p>

          <p className="text-xs text-[#C3EDE1]">
            Siempre disponible
          </p>
        </div>

        <button
          onClick={onClose}
          className="text-white/70 hover:text-white transition-colors"
          aria-label="Cerrar chat"
        >
          <X size={16} />
        </button>
      </div>

      {/* Mensajes */}
      <div className="flex flex-col gap-2 p-3 overflow-y-auto max-h-56">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`text-xs px-3 py-2 rounded-xl max-w-[85%] leading-relaxed ${
              msg.from === 'mentor'
                ? 'bg-[#F5FBFA] text-gray-800 self-start border border-[#E2F6F0]'
                : 'bg-[#186875] text-white self-end'
            }`}
          >
            {msg.text}
          </div>
        ))}

        {isTyping && (
          <div className="bg-[#F5FBFA] border border-[#E2F6F0] text-gray-500 text-xs px-3 py-2 rounded-xl self-start">
            escribiendo...
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Respuestas rápidas */}
      <div className="flex flex-wrap gap-1.5 px-3 pb-2">
        {QUICK_REPLIES.map((reply) => (
          <button
            key={reply}
            onClick={() => handleSend(reply)}
            className="
              text-xs
              bg-[#C3EDE1]
              text-[#186875]
              rounded-full
              px-2.5 py-1
              hover:bg-[#B2E6D8]
              transition-colors
            "
          >
            {reply}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-2 px-3 pb-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
          placeholder="Escribile al mentor..."
          className="
            flex-1
            text-xs
            border border-[#C3EDE1]
            rounded-lg
            px-3 py-2
            focus:outline-none
            focus:ring-2
            focus:ring-[#C3EDE1]
            focus:border-[#186875]
          "
        />

        <button
          onClick={() => handleSend(input)}
          className="
            w-8 h-8
            bg-[#186875]
            rounded-lg
            flex items-center justify-center
            hover:bg-[#14545F]
            transition-colors
            shrink-0
          "
        >
          <Send size={13} className="text-white" />
        </button>
      </div>
    </div>
  )
}