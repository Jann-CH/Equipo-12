import { useState, useRef, useEffect } from 'react'
import { X, Send } from 'lucide-react'

const QUICK_REPLIES = [
  'Bien, aprendí mucho 😊',
  'Me costó un poco 😅',
  'Necesito ayuda 🙋',
]

export function MentorChat({ messages, isTyping, onClose, onSend }) {
  const [input, setInput]   = useState('')
  const bottomRef           = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleSend = (text) => {
    onSend(text)
    setInput('')
  }

  return (
    <div className="
      fixed z-50 bg-white rounded-2xl shadow-xl border border-gray-100
      flex flex-col overflow-hidden

      right-4 w-72
      bottom-36              
      md:right-6 md:w-80
      md:bottom-32           
    ">
      {/* Header */}
      <div className="bg-indigo-600 px-4 py-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
          <span className="text-sm">🤖</span>
        </div>
        <div className="flex-1">
          <p className="text-xs font-medium text-white">Tu mentor</p>
          <p className="text-xs text-white/70">Siempre disponible</p>
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
                ? 'bg-gray-50 text-gray-800 self-start'
                : 'bg-indigo-600 text-white self-end'
            }`}
          >
            {msg.text}
          </div>
        ))}
        {isTyping && (
          <div className="bg-gray-50 text-gray-400 text-xs px-3 py-2 rounded-xl self-start">
            escribiendo...
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Respuestas rápidas */}
      <div className="flex flex-wrap gap-1.5 px-3 pb-2">
        {['Bien, aprendí mucho 😊', 'Me costó un poco 😅', 'Necesito ayuda 🙋'].map(reply => (
          <button
            key={reply}
            onClick={() => handleSend(reply)}
            className="text-xs bg-indigo-50 text-indigo-700 rounded-full px-2.5 py-1 hover:bg-indigo-100 transition-colors"
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
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend(input)}
          placeholder="Escribile al mentor..."
          className="flex-1 text-xs border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
        <button
          onClick={() => handleSend(input)}
          className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center hover:bg-indigo-700 transition-colors shrink-0"
        >
          <Send size={13} className="text-white" />
        </button>
      </div>
    </div>
  )
}