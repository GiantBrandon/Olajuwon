import React from 'react'

type SocketContextType = {
    sendMessage: (
      name: string,
      command: string,
      props: Record<string, unknown>
    ) => void
  }
    
export const SocketContext = React.createContext<SocketContextType>({sendMessage: () => undefined})