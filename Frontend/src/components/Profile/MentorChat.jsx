import { useState } from 'react'

const QUICK_REPLIES = [
  'Bien, aprendí mucho',
  'Me costó un poco',
  'Necesito ayuda',
]

export function MentorChat({ userName }) {
  const [messages, setMessages] = useState([
    {
      from: 'mentor',
      text: `¡Hola ${userName}! ¿Cómo te sentís con tus materias esta semana? 😊`,
    }
  ])
  const [input, setInput] = useState('')

  const sendMessage = (text) => {
    if (!text.trim()) return
    setMessages(prev => [...prev, { from: 'user', text }])
    setInput('')

    // Respuesta automática del mentor (mock)
    setTimeout(() => {
      setMessages(prev => [...prev, {
        from: 'mentor',
        text: '¡Gracias por contarme! Seguí así, cada día cuenta 💪',
      }])
    }, 800)
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 flex flex-col gap-3">
      <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center shrink-0">
          <span className="text-sm">🤖</span>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-900">Tu mentor</p>
          <p className="text-xs text-gray-400">Siempre disponible</p>
        </div>
      </div>

      {/* Mensajes */}
      <div className="flex flex-col gap-2 max-h-36 overflow-y-auto">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`text-xs px-3 py-2 rounded-xl max-w-[85%] ${
              msg.from === 'mentor'
                ? 'bg-gray-50 text-gray-800 self-start'
                : 'bg-indigo-600 text-white self-end'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Respuestas rápidas */}
      <div className="flex flex-wrap gap-2">
        {QUICK_REPLIES.map(reply => (
          <button
            key={reply}
            onClick={() => sendMessage(reply)}
            className="text-xs bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 hover:bg-indigo-100 transition-colors"
          >
            {reply}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
          placeholder="Escribile al mentor..."
          className="flex-1 text-xs border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
        <button
          onClick={() => sendMessage(input)}
          className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shrink-0 hover:bg-indigo-700 transition-colors"
        >
          <span className="text-white text-xs">➤</span>
        </button>
      </div>
    </div>
  )
}