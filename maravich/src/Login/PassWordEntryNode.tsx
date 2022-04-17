import { Radio } from '@mui/material'
import React, { useEffect, useState } from 'react'

type PasswordEntryNodeProps = {
  drawing: boolean
  isActive: boolean
  activate: () => void
}

export const PasswordEntryNode: React.FC<PasswordEntryNodeProps> = ({
  drawing,
  isActive,
  activate,
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleActivate = () => {
    drawing && !isActive && activate()
  }

  useEffect(() => {
    isHovered && handleActivate()
  })

  return (
    <Radio
      checked={isActive}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    />
  )
}
