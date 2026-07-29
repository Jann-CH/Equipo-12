import { useState } from 'react'

export function SubjectList({ subjects, onAdd, onRemove }) {
  const [showInput, setShowInput] = useState(false)
  const [newSubject, setNewSubject] = useState('')

  const handleAdd = () => {
    if (!newSubject.trim()) return
    onAdd(newSubject.trim())
    setNewSubject('')
    setShowInput(false)
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4">
      <div className="flex justify-between items-center mb-3">
        <p className="text-xs font-medium text-gray-500">Mis materias</p>
        <button
          onClick={() => setShowInput(true)}
          className="text-xs border border-indigo-400 text-indigo-600 rounded-lg px-2.5 py-1 hover:bg-indigo-50 transition-colors"
        >
          + Agregar
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        {subjects.map(subject => (
          <span
            key={subject}
            className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 text-xs font-medium px-3 py-1.5 rounded-full"
          >
            {subject}
            <button
              onClick={() => onRemove(subject)}
              className="opacity-50 hover:opacity-100 transition-opacity ml-1"
              aria-label={`Eliminar ${subject}`}
            >
              ✕
            </button>
          </span>
        ))}

        {/* Input inline para agregar */}
        {showInput && (
          <div className="flex items-center gap-2">
            <input
              autoFocus
              type="text"
              value={newSubject}
              onChange={e => setNewSubject(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAdd()}
              placeholder="Nombre de la materia"
              className="text-xs border border-indigo-300 rounded-full px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-300 w-36"
            />
            <button onClick={handleAdd} className="text-xs bg-indigo-600 text-white rounded-full px-3 py-1.5">
              OK
            </button>
            <button onClick={() => setShowInput(false)} className="text-xs text-gray-400">
              Cancelar
            </button>
          </div>
        )}
      </div>

      <div className="border-t border-gray-100 pt-3">
        <p className="text-xs font-medium text-gray-500 mb-2">Próximo año</p>
        <p className="text-xs text-gray-400 mb-2">Podés preparar tus materias del próximo año</p>
        <button
          className="inline-flex items-center gap-1 border border-dashed border-indigo-300 text-indigo-500 text-xs rounded-full px-3 py-1.5 hover:bg-indigo-50 transition-colors"
        >
          + Crear nuevo año
        </button>
      </div>
    </div>
  )
}