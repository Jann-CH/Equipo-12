import { NavLink } from 'react-router-dom'
import { Home, PlayCircle, LayoutDashboard, User, Plus } from 'lucide-react'

const DESKTOP_LINKS = [
    { to: '/mi-recorrido', icon: Home, label: 'Inicio' },
    { to: '/contenido', icon: PlayCircle, label: 'Contenido' },
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
]

const MOBILE_LINKS = [
    { to: '/mi-recorrido', icon: Home, label: 'Inicio' },
    { to: '/contenido', icon: PlayCircle, label: 'Contenido' },
    null, // botón central (+)
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/perfil', icon: User, label: 'Perfil' },
]

export function Navbar({ currentStreak = 0, onAddClick }) {
    return (
        <>
            {/* ====== DESKTOP — top nav ====== */}
            <nav className="hidden md:flex items-center h-12 px-6 bg-indigo-600 relative">

                {/* Logo — izquierda */}
                <div className="flex items-center gap-2 shrink-0">
                    <img
                        src="/branding/avatar-nova-hi.png"
                        alt="Innova Mentor"
                        className="h-7 w-auto"
                    />
                    <span className="text-sm font-medium text-white">Innova Mentor</span>
                </div>

                {/* Links — absolutamente centrados */}
                <div className="absolute left-1/2 -translate-x-1/2 flex items-stretch h-12">
                    {DESKTOP_LINKS.map(({ to, icon: Icon, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `flex items-center gap-2 px-4 h-12 text-xs border-b-2 transition-colors ${isActive
                                    ? 'text-white border-white'
                                    : 'text-white/70 border-transparent hover:text-white'
                                }`
                            }
                        >
                            <Icon size={14} />
                            {label}
                        </NavLink>
                    ))}
                </div>

                {/* Derecha: nueva tarea + racha + perfil */}
                <div className="flex items-center gap-3 ml-auto">
                    <button
                        onClick={onAddClick}
                        className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 text-white text-xs rounded-full px-3 py-1.5 transition-colors"
                    >
                        <Plus size={14} />
                        Nueva tarea
                    </button>

                    {currentStreak > 0 && (
                        <div className="flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1">
                            <span className="text-xs text-white font-medium">🔥 {currentStreak} días</span>
                        </div>
                    )}
                    <NavLink
                        to="/perfil"
                        className={({ isActive }) =>
                            `w-7 h-7 rounded-full flex items-center justify-center transition-colors ${isActive ? 'bg-white/40' : 'bg-white/20 hover:bg-white/30'
                            }`
                        }
                    >
                        <User size={14} className="text-white" />
                    </NavLink>
                </div>

            </nav>

            {/* ====== MÓVIL — bottom nav ====== */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100">
                <div className="flex items-end justify-around h-16 px-2">
                    {MOBILE_LINKS.map((item, i) => {
                        if (!item) {
                            return (
                                <button key="add" onClick={onAddClick} className="flex flex-col items-center gap-1 -mt-5">
                                    <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200">
                                        <Plus size={22} className="text-white" />
                                    </div>
                                    <span className="text-xs text-gray-400">Agregar</span>
                                </button>
                            )
                        }
                        const { to, icon: Icon, label } = item
                        return (
                            <NavLink
                                key={to}
                                to={to}
                                className={({ isActive }) =>
                                    `flex flex-col items-center gap-1 pt-3 min-w-[44px] ${isActive ? 'text-indigo-600' : 'text-gray-400'
                                    }`
                                }
                            >
                                <Icon size={20} />
                                <span className="text-xs">{label}</span>
                            </NavLink>
                        )
                    })}
                </div>
            </nav>
        </>
    )
}
