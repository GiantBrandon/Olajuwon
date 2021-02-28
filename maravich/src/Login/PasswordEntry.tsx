import React, { ReactNode, useState } from 'react'
import { PasswordEntryNode } from './PassWordEntryNode'

type PasswordEntryProps = {

}

export const PasswordEntry: React.FC<PasswordEntryProps> = (props) => {
    const [selected, setSelected] = useState<number[]>([])
    const [drawing, setDrawing] = useState(false)
    return (
        <div onMouseDown={() => {setDrawing(true); setSelected([])}} onMouseUp={() => setDrawing(false)}>
        {Array(3).fill(0).map((_, row) => 
        <div>
            {Array(3).fill(0).map((_, column) => <PasswordEntryNode drawing={drawing} isActive={selected.includes(row * 4 + column)} activate={() => setSelected([...selected, row * 4 + column])} /> )}
        </div>
        )}
        </div>
    )
}