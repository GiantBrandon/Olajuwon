import React, { useContext, useState } from 'react';
import styled from '@emotion/styled'
import { ThemeContext } from './theme/themeContext';
import { colors, shift, Theme } from './Color';
import { Link } from 'react-router-dom'

type HexagonProps = {
  theme: Theme
  width: number
  hover: boolean
}

const HexagonButtonWrapper = styled.button((props: HexagonProps) => ({
  height: props.width * 1.16,
  width: props.width,
  backgroundColor: 'transparent',
  borderWidth: 0,
  margin: 0,
  padding: 0,
  outline: 0,
}))

const HexagonBack = styled.div((props: HexagonProps) => ({
  height: props.width * 1.16 / 2,
  width: props.width,
  backgroundColor: props.hover ? props.theme.highlight : shift(props.theme.highlight, 10, 10, 10),
  borderRadius: '1px',
  border: 0,
  transform: 'rotate(-60deg)',
}))

const HexagonMid = styled.div((props: HexagonProps) => ({
  height: props.width * 1.16 / 2,
  width: props.width,
  marginTop: -(props.width * 1.16 / 2),
  backgroundColor: props.hover ? shift(props.theme.highlight, -10, -10, -10) : props.theme.highlight,
  borderRadius: '1px',
  border: 0,
  transform: 'rotate(0deg)',
}))

const HexagonFront = styled.div((props: HexagonProps) => ({
  height: props.width * 1.16 / 2,
  width: props.width,
  marginTop: -(props.width * 1.16 / 2),
  backgroundColor: props.hover ? shift(props.theme.highlight, -20, -20, -20) : shift(props.theme.highlight, -10, -10, -10),
  borderRadius: '1px',
  border: 0,
  transform: 'rotate(60deg)',
}))

const HexagonTextContainer = styled.div((props: HexagonProps) => ({
  height: props.width * 1.16 / 2,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  fontSize: props.width / 5,
  marginTop: -(props.width * 1.16) / 2,
  textAlign: 'center',
  color: props.hover ? props.theme.BG : props.theme.BG,
  transform: 'rotate(0deg)',
}))

const HexagonText = styled.p(() => ({
  margin: 0
}))

interface HexagonRedirectProps {
  width?: number
  path: string
  label: string
  className?: string
}

export const HexagonRedirect: React.FC<HexagonRedirectProps> = ({width=100, ...props}) => {
  const [hover, setHover] = useState(false)

  const theme: string = useContext(ThemeContext).theme
  return (
    <Link to={props.path} className={props.className} >
      <HexagonButtonWrapper onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} theme={colors[theme]} width={width} hover={hover}>
        <HexagonBack theme={colors[theme]} width={width} hover={hover}/>
        <HexagonMid theme={colors[theme]} width={width} hover={hover} />
        <HexagonFront theme={colors[theme]} width={width} hover={hover} />
        <HexagonTextContainer theme={colors[theme]} width={width} hover={hover}><HexagonText>{props.label}</HexagonText></HexagonTextContainer>
      </HexagonButtonWrapper>
    </Link>
  );
};

interface HexagonButtonProps {
  width?: number
  onClick: () => void
  label: string
  className?: string
}

export const HexagonButton: React.FC<HexagonButtonProps> = ({width=100, ...props}) => {
  const [hover, setHover] = useState(false)

  const theme: string = useContext(ThemeContext).theme
  return (
      <HexagonButtonWrapper className={props.className} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={props.onClick} theme={colors[theme]} width={width} hover={hover}>
        <HexagonBack theme={colors[theme]} width={width} hover={hover}/>
        <HexagonMid theme={colors[theme]} width={width} hover={hover} />
        <HexagonFront theme={colors[theme]} width={width} hover={hover} />
        <HexagonTextContainer theme={colors[theme]} width={width} hover={hover}><HexagonText>{props.label}</HexagonText></HexagonTextContainer>
      </HexagonButtonWrapper>
  );
};
