import { NavLink } from 'react-router-dom'
import { Home, PlayCircle, TrendingUp, User, Plus } from 'lucide-react'

const DESKTOP_LINKS = [
    { to: '/mi-recorrido', icon: Home, label: 'Inicio' },
    { to: '/contenido', icon: PlayCircle, label: 'Contenido' },
    { to: '/dashboard', icon: TrendingUp, label: 'Progreso' },
]

const MOBILE_LINKS = [
    { to: '/mi-recorrido', icon: Home, label: 'Inicio' },
    { to: '/contenido', icon: PlayCircle, label: 'Contenido' },
    null, // botón central (+)
    { to: '/dashboard', icon: TrendingUp, label: 'Progreso' },
    { to: '/perfil', icon: User, label: 'Perfil' },
]

export function Navbar({ currentStreak = 0, onAddClick }) {
    return (
        <>
            {/* ====== DESKTOP — top nav ====== */}
            <nav className="hidden md:flex items-center h-12 px-6 bg-[#C3EDE1] relative">

                {/* Logo — izquierda */}
                <div className="flex items-center gap-2 shrink-0">
                    <img
                        src="/branding/avatar-nova-hi.png"
                        alt="Innova Mentor"
                        className="h-9 w-auto"
                    />
                    {/* <span className="text-sm font-medium text-slate-800">Innova Mentor</span> */}
                </div>

                {/* Links — absolutamente centrados */}
                <div className="absolute left-1/2 -translate-x-1/2 flex items-stretch h-12">
                    {DESKTOP_LINKS.map(({ to, icon: Icon, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `flex items-center gap-2 px-4 h-12 text-xs border-b-2 transition-colors ${isActive
                                    ? 'text-slate-900 border-slate-900'
                                    : 'text-slate-700/70 border-transparent hover:text-slate-900'
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
                        className="flex items-center gap-1.5 bg-slate-900/10 hover:text-slate-900 text-slate-700/70 text-xs rounded-full px-3 py-1.5 transition-colors"
                    >
                        <Plus size={14} />
                        Nueva tarea
                    </button>

                    {currentStreak > 0 && (
                        <div className="flex items-center gap-1.5 bg-slate-900/10 rounded-full px-3 py-1">
                            <span className="text-xs text-slate-800 font-medium">🔥 {currentStreak} días</span>
                        </div>
                    )}
                    <NavLink
                        to="/perfil"
                        className={({ isActive }) =>
                            `w-7 h-7 rounded-full flex items-center justify-center transition-colors ${isActive ? 'bg-slate-900/30' : 'bg-slate-900/15 hover:bg-slate-900/25'
                            }`
                        }
                    >
                        <User size={14} className="text-slate-800" />
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
                                    <div className="w-12 h-12 rounded-full bg-[#C3EDE1] flex items-center justify-center shadow-lg shadow-[#C3EDE1]/50">
                                        <Plus size={22} className="text-slate-900" />
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
                                    `flex flex-col items-center gap-1 pt-3 min-w-[44px] ${isActive ? 'text-[#3a8a75]' : 'text-gray-400'
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