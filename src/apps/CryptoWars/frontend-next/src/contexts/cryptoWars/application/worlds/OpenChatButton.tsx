import { Button } from '@mui/material'
import { FC } from 'react'

type ChatWithButtonProps = {
  sender: { townId: string }
  receiver: { townId: string; playerId: string }
}

export const OpenChatButton: FC<ChatWithButtonProps> = ({ sender, receiver }) => {
  // const { createChat } = useCreateDirectChat()

  return (
    <Button
      key={receiver.townId}
      onClick={async () => {
        // await createChat(town.playerId)
        // navigate(AppRoutes.chat)
        alert('Not implemented yet')
      }}
      disabled={sender.townId === receiver.townId}
    >
      Chat with {receiver.playerId}
    </Button>
  )
}
