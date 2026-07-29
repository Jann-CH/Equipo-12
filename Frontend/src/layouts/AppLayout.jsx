import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/Navigation/Navbar'
import { MentorWidget } from '../components/mentor/MentorWidget'
import { NewTaskModal } from '../components/tasks/NewTaskModal'
import { TaskDetailModal } from '../components/tasks/TaskDetailModal'
import { useTasks } from '../contexts/TasksContext'
import { useUser } from '../contexts/UserContext'
import { pingUsageTime } from '../api/authApi'

const PING_INTERVAL_SECONDS = 30

export function AppLayout() {
  const { openModal } = useTasks()
  const { userProfile } = useUser()

  // Registra tiempo real de uso: cada 30s, si la pestaña sigue visible,
  // le suma esos 30s al contador del perfil (totalTimeSpentSeconds).
  // Si el usuario minimiza o cambia de pestaña, no suma (para no inflar
  // el dato con tiempo en que no está usando la app de verdad).
  useEffect(() => {
    const interval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        pingUsageTime(PING_INTERVAL_SECONDS).catch((error) => {
          console.error('⚠️ No se pudo registrar el tiempo de uso:', error)
        })
      }
    }, PING_INTERVAL_SECONDS * 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentStreak={userProfile?.streak ?? 0} onAddClick={openModal} />
      <main className="w-full max-w-5xl mx-auto px-4 pt-6 pb-20 md:pb-6">
        <Outlet />
      </main>
      <MentorWidget
        animationSrc="/assets/mentor.lottie"
        userId="1"  // después lo sacás del contexto de auth
      />
      <NewTaskModal />
      <TaskDetailModal />
    </div>
  )
}
