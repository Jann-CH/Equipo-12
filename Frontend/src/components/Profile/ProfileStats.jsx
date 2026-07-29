const StatCard = ({ label, value, color }) => (
  <div className="bg-gray-50 rounded-lg p-3 text-center">
    <p className="text-xs text-gray-400 mb-1">{label}</p>
    <p className={`text-lg font-medium ${color}`}>{value}</p>
  </div>
)

export function ProfileStats({ stats }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4">
      <p className="text-xs font-medium text-gray-500 mb-3">Mi progreso</p>
      <div className="grid grid-cols-2 gap-2">
        <StatCard label="Racha actual"         value={`🔥 ${stats.currentStreak}`}            color="text-amber-500" />
        <StatCard label="Mejor racha"          value={stats.bestStreak}                        color="text-indigo-600" />
        <StatCard label="Desafíos completados" value={stats.completedChallenges}               color="text-green-600" />
        <StatCard label="Logros"               value={stats.unlockedAchievements}              color="text-orange-500" />
      </div>
    </div>
  )
}