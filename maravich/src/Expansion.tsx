import styled from '@emotion/styled'
import React, { useState } from 'react'
import { Hexagon } from './HexagonButtons'
import {
  GitHub,
  LinkedIn,
  LockOpen,
  SportsBasketball,
  WbSunny,
  DirectionsBoat,
} from '@mui/icons-material'

type ExpansionStyleProps = {
  hexWidth: number
  hexHeight: number
}

const LeftCenteredDiv = styled.div({
  position: 'absolute',
  top: '50%',
  left: '25%',
  transform: 'translate(-50%, -50%)',
})

const ExpandWrapper = styled(LeftCenteredDiv)((props: ExpansionStyleProps) => ({
  width: props.hexWidth * 3 + 12 * 2,
  height: props.hexHeight * 2.5 + 12 * 2,
}))

const ExpandButton = styled.div((props: ExpansionStyleProps) => ({
  position: 'absolute',
  top: props.hexHeight * 0.75 + 12,
  left: props.hexWidth + 12,
}))

const GithubButton = styled.a((props: ExpansionStyleProps) => ({
  position: 'absolute',
  top: 0,
  left: props.hexWidth / 2 + 6,
}))

const LinkedInButton = styled.a((props: ExpansionStyleProps) => ({
  position: 'absolute',
  top: 0,
  right: props.hexWidth / 2 + 6,
}))

const LoginButton = styled.a((props: ExpansionStyleProps) => ({
  position: 'absolute',
  top: props.hexHeight * 0.75 + 10,
  right: 0,
}))

const BattleShipButton = styled.a({
  position: 'absolute',
  bottom: 0,
  right: 100 / 2 + 6,
})

const FantasyButton = styled.a({
  position: 'absolute',
  bottom: 0,
  left: 100 / 2 + 6,
})

const DarkModeButton = styled.div((props: ExpansionStyleProps) => ({
  position: 'absolute',
  top: props.hexHeight * 0.75 + 12,
  left: 0,
}))

interface ExpansionProps {
  hexHeight?: number
  hexWidth?: number
}

export const Expansion: React.FC<ExpansionProps> = ({
  hexWidth = 100,
  hexHeight = hexWidth * 1.16,
}) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <ExpandWrapper hexWidth={hexWidth} hexHeight={hexHeight}>
      <ExpandButton
        onClick={() => setExpanded(!expanded)}
        hexWidth={hexWidth}
        hexHeight={hexHeight}
      >
        <Hexagon width={hexWidth}>Get Started</Hexagon>
      </ExpandButton>
      {expanded && (
        <>
          <GithubButton
            href={'#/Github'}
            hexWidth={hexWidth}
            hexHeight={hexHeight}
          >
            <Hexagon width={hexWidth}>
              <GitHub fontSize='large' />
            </Hexagon>
          </GithubButton>
          <LinkedInButton
            href={'#/LinkedIn'}
            hexWidth={hexWidth}
            hexHeight={hexHeight}
          >
            <Hexagon width={hexWidth}>
              <LinkedIn fontSize='large' />
            </Hexagon>
          </LinkedInButton>
          <LoginButton
            href={'#/Login'}
            hexWidth={hexWidth}
            hexHeight={hexHeight}
          >
            <Hexagon width={hexWidth}>
              <LockOpen fontSize='large' />
            </Hexagon>
          </LoginButton>
          <BattleShipButton
            href={'#/BattleShip'}
          >
            <Hexagon width={hexWidth}>
              <DirectionsBoat fontSize='large' />
            </Hexagon>
          </BattleShipButton>
          <FantasyButton
            href={'#/Fantasy'}
          >
            <Hexagon width={hexWidth}>
              <SportsBasketball fontSize='large' />
            </Hexagon>
          </FantasyButton>
          <DarkModeButton hexWidth={hexWidth} hexHeight={hexHeight}>
            <Hexagon width={hexWidth}>
              <WbSunny fontSize='large' />
            </Hexagon>
          </DarkModeButton>
        </>
      )}
    </ExpandWrapper>
  )
}
