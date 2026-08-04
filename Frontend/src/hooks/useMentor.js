import { useState, useEffect } from "react";
import {
  getMentorGreeting,
  sendMessageToMentor,
} from "../services/mentor/mentorService";

export function useMentor() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Saludo inicial
  useEffect(() => {
    async function loadGreeting() {
      try {
        const greeting = await getMentorGreeting();

        setMessages([
          {
            from: "mentor",
            text: greeting,
          },
        ]);
      } catch {
        setMessages([
          {
            from: "mentor",
            text: "¡Hola! Soy Nova 👋 ¿En qué puedo ayudarte hoy?",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    }

    loadGreeting();
  }, []);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  const sendMessage = async (text) => {
    const message = text.trim();

    if (!message) return;

    // Mostrar mensaje del usuario inmediatamente
    setMessages((prev) => [
      ...prev,
      {
        from: "user",
        text: message,
      },
    ]);

    setIsTyping(true);

    try {
      const reply = await sendMessageToMentor(message);

      setMessages((prev) => [
        ...prev,
        {
          from: "mentor",
          text: reply,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          from: "mentor",
          text:
            error?.message ||
            "Ups, ocurrió un problema. Intentá nuevamente.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return {
    isOpen,
    toggleChat,
    messages,
    sendMessage,
    isTyping,
    isLoading,
  };
}