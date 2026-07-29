export function ProfileHeader({ profile, onEdit }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
          <span className="text-xl">👤</span>
        </div>
        <div className="flex-1">
          <p className="font-medium text-gray-900">{profile.name}</p>
          <p className="text-xs text-gray-500">{profile.email}</p>
        </div>
        <button
          onClick={onEdit}
          className="text-xs border border-indigo-500 text-indigo-600 rounded-lg px-3 py-1.5 hover:bg-indigo-50 transition-colors"
        >
          Editar perfil
        </button>
      </div>

      <div className="border-t border-gray-100 pt-4 grid grid-cols-2 gap-3">
        <div>
          <p className="text-xs text-gray-400">Nombre</p>
          <p className="text-sm text-gray-800">{profile.name}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Edad</p>
          <p className="text-sm text-gray-800">{profile.age != null ? `${profile.age} años` : "—"}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Año escolar</p>
          <p className="text-sm text-gray-800">{profile.schoolYear || "—"}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Horario preferido</p>
          <p className="text-sm text-gray-800">{profile.preferredSchedule || "—"}</p>
        </div>
      </div>
    </div>
  )
}