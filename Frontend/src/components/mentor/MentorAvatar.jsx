import { X } from 'lucide-react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

export function MentorAvatar({ isOpen, onToggle, animationSrc }) {
  return (
    <button
      onClick={onToggle}
      aria-label={isOpen ? 'Cerrar mentor' : 'Abrir mentor'}
      className={`
        fixed z-50 rounded-full
        shadow-xl shadow-[#186875]/35
        border-2 border-[#C3EDE1]
        overflow-hidden
        hover:scale-105 active:scale-95
        transition-all duration-200

        bottom-20 right-4 w-14 h-14

        ${isOpen
          ? 'md:bottom-6 md:right-6 md:w-14 md:h-14'
          : 'md:bottom-6 md:right-6 md:w-24 md:h-24'
        }
      `}
    >
      {/* X — visible solo cuando está abierto */}
      <div className={`
        absolute inset-0 bg-[#186875] flex items-center justify-center
        transition-opacity duration-200
        ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}>
        <X size={16} className="text-white" />
      </div>

      {/* Animación Lottie — siempre montada, nunca se destruye */}
      <div className={`
        absolute inset-0
        transition-opacity duration-200
        ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}
      `}>
        {animationSrc ? (
          <DotLottieReact
            src={animationSrc}
            loop
            autoplay
            style={{ width: '100%', height: '100%' }}
          />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-[#186875] to-[#C3EDE1] flex items-center justify-center">
            <span className="text-3xl">🤖</span>
          </div>
        )}
      </div>
    </button>
  )
}