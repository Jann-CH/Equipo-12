import { useState, useEffect } from 'react'
import { getMentorGreeting, sendMessageToMentor } from '../services/mentor/mentorService'

export function useMentor(userId) {
  const [isOpen, setIsOpen]         = useState(false)
  const [messages, setMessages]     = useState([])
  const [isTyping, setIsTyping]     = useState(false)
  const [isLoading, setIsLoading]   = useState(true)

  // Cargar saludo inicial
  useEffect(() => {
    getMentorGreeting(userId)
      .then(greeting => {
        setMessages([{ from: 'mentor', text: greeting }])
      })
      .finally(() => setIsLoading(false))
  }, [userId])

  const toggleChat = () => setIsOpen(prev => !prev)

  const sendMessage = async (text) => {
    if (!text.trim()) return

    // Agregar mensaje del usuario
    setMessages(prev => [...prev, { from: 'user', text }])
    setIsTyping(true)

    try {
      const reply = await sendMessageToMentor(text, userId)
      setMessages(prev => [...prev, { from: 'mentor', text: reply }])
    } catch {
      setMessages(prev => [...prev, {
        from: 'mentor',
        text: 'Ups, tuve un problema. ¿Podés intentarlo de nuevo?'
      }])
    } finally {
      setIsTyping(false)
    }
  }

  return { isOpen, toggleChat, messages, sendMessage, isTyping, isLoading }
}