import { Outlet } from 'react-router-dom'

// Layout "vacío" para el onboarding inicial: mismo ProtectedRoute que el resto
// de la app, pero sin Navbar ni MentorWidget (cada pantalla del onboarding ya
// es a pantalla completa por diseño).
export function OnboardingLayout() {
  return <Outlet />
}
