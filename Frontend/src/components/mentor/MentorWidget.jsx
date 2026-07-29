import { useMentor } from '../../hooks/useMentor'
import { MentorAvatar } from './MentorAvatar'
import { MentorChat } from './MentorChat'

export function MentorWidget({ animationSrc, userId }) {
  const { isOpen, toggleChat, messages, sendMessage, isTyping } = useMentor(userId)

  return (
    <>
      {isOpen && (
        <MentorChat
          messages={messages}
          isTyping={isTyping}
          onClose={toggleChat}
          onSend={sendMessage}
        />
      )}
      <MentorAvatar
        isOpen={isOpen}
        onToggle={toggleChat}
        animationSrc={animationSrc}
      />
    </>
  )
}