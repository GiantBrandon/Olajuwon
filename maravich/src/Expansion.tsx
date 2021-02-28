import styled from '@emotion/styled'
import React, { useState } from 'react'
import { HexagonButton, HexagonRedirect } from './HexagonButtons'
import { CenteredDiv, spacing } from './styles'

type ExpansionStyleProps = {
    hexWidth: number
    hexHeight: number
}

const ExpandWrapper = styled(CenteredDiv)((props: ExpansionStyleProps) => ({
    width: props.hexWidth * 3 + spacing.smaller * 2,
    height: props.hexHeight * 2.5 + spacing.smaller * 2
}))

const ExpandButton = styled(HexagonButton)((props: ExpansionStyleProps) => ({
    position: 'absolute',
    top: props.hexHeight * .75 + spacing.smaller,
    left: props.hexWidth + spacing.smaller
}))

const GithubButton = styled(HexagonRedirect)((props: ExpansionStyleProps) => ({
    position: 'absolute',
    top: 0,
    left: props.hexWidth / 2 + spacing.smallest
}))

const LinkedInButton = styled(HexagonRedirect)((props: ExpansionStyleProps) => ({
    position: 'absolute',
    top: 0,
    right: props.hexWidth / 2 + spacing.smallest
}))

const LoginButton = styled(HexagonRedirect)((props: ExpansionStyleProps) => ({
    position: 'absolute',
    top: props.hexHeight * .75 + 10,
    right: 0
}))

const ComingButton1 = styled(HexagonRedirect)((props: ExpansionStyleProps) => ({
    position: 'absolute',
    bottom: 0,
    right: 100/ 2 + spacing.smallest
}))

const ComingButton2 = styled(HexagonRedirect)((props: ExpansionStyleProps) => ({
    position: 'absolute',
    bottom: 0,
    left: 100/ 2 + spacing.smallest
}))

const ComingButton3 = styled(HexagonRedirect)((props: ExpansionStyleProps) => ({
    position: 'absolute',
    top: props.hexHeight * .75 + spacing.smaller,
    left: 0
}))

interface ExpansionProps {
    hexHeight?: number
    hexWidth?: number
}

export const Expansion: React.FC<ExpansionProps> = ({hexWidth = 100, hexHeight = hexWidth * 1.16}) => {
    const [expanded, setExpanded] = useState(false)
    return (
    <ExpandWrapper hexWidth={hexWidth} hexHeight={hexHeight}>
    <ExpandButton label={'Get Started'} onClick={() => setExpanded(!expanded)} hexWidth={hexWidth} hexHeight={hexHeight} />
    {expanded && 
    <>
    <GithubButton label={'GitHub'} path={'/Github'} hexWidth={hexWidth} hexHeight={hexHeight} />
    <LinkedInButton label={'LinkedIn'} path={'/LinkedIn'} hexWidth={hexWidth} hexHeight={hexHeight} />
    <LoginButton label={'Login'} path={'/Login'} hexWidth={hexWidth} hexHeight={hexHeight} />
    <ComingButton1 label={'Coming Soon'} path={'/ComingSoon'} hexWidth={hexWidth} hexHeight={hexHeight} />
    <ComingButton2 label={'Coming Soon'} path={'/ComingSoon'} hexWidth={hexWidth} hexHeight={hexHeight} />
    <ComingButton3 label={'Coming Soon'} path={'/ComingSoon'} hexWidth={hexWidth} hexHeight={hexHeight} />
    </>
    }
    </ExpandWrapper>
    )

}