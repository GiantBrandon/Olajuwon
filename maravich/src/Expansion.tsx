import React, { useState } from 'react'
import { HexagonButton, HexagonRedirect } from './HexagonButtons'

interface ExpansionProps {
}

export const Expansion: React.FC<ExpansionProps> = (props) => {
    const [expanded, setExpanded] = useState(false)
    return (
    <>
    <HexagonButton label={'Get Started'} onClick={() => setExpanded(!expanded)} style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}/>
    {expanded && 
    <>
    <HexagonRedirect label={'GitHub'} path={'/Github'} style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-160%, -50%)'}}/>
    <HexagonRedirect label={'LinkedIn'} path={'/LinkedIn'} style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-105%, -132%)'}}/>
    <HexagonRedirect label={'Coming Soon'} path={'/ComingSoon'} style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(5%, -132%)'}}/>
    <HexagonRedirect label={'Coming Soon'} path={'/ComingSoon'} style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(60%, -50%)'}}/>
    <HexagonRedirect label={'Coming Soon'} path={'/ComingSoon'} style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(5%, 32%)'}}/>
    <HexagonRedirect label={'Coming Soon'} path={'/ComingSoon'} style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-105%, 32%)'}}/>
    </>
    }
    </>
    )

}