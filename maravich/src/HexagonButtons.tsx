import React, {ReactNode, useState} from 'react';
import styled from '@emotion/styled';
import {useTheme} from '@material-ui/styles';
import {Box} from '@material-ui/core';

type HexagonStyleProps = {
  width: number
  hover: boolean
}

const HexagonWrapper = styled.button((props: HexagonStyleProps) => ({
  height: props.width * 1.16,
  width: props.width,
  backgroundColor: 'transparent',
  borderWidth: 0,
  margin: 0,
  padding: 0,
  outline: 0,
}));

const HexagonBack = styled(Box)((props: HexagonStyleProps) => ({
  height: props.width * 1.16 / 2,
  width: props.width,
  borderRadius: '1px',
  border: 0,
  transform: 'rotate(-60deg)',
}));

const HexagonMid = styled(Box)((props: HexagonStyleProps) => ({
  height: props.width * 1.16 / 2,
  width: props.width,
  marginTop: -(props.width * 1.16 / 2),
  borderRadius: '1px',
  border: 0,
  transform: 'rotate(0deg)',
}));

const HexagonFront = styled(Box)((props: HexagonStyleProps) => ({
  height: props.width * 1.16 / 2,
  width: props.width,
  marginTop: -(props.width * 1.16 / 2),
  borderRadius: '1px',
  border: 0,
  transform: 'rotate(60deg)',
}));

const HexagonContainer = styled.div((props: HexagonStyleProps) => ({
  height: props.width * 1.16 / 2,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: props.width / 5,
  marginTop: -(props.width * 1.16) / 2,
  textAlign: 'center',
  transform: 'rotate(0deg)',
}));

interface HexagonProps {
  width?: number
  className?: string
  children: ReactNode
}

export const Hexagon: React.FC<HexagonProps> = ({width=100, ...props}: HexagonProps) => {
  const [hover, setHover] = useState(false);
  const palette = (useTheme() as any).palette;

  return (
    <HexagonWrapper
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      width={width}
      hover={hover}>
      <HexagonBack
        width={width}
        hover={hover}
        bgcolor={hover ? palette.info.light : palette.primary.light}
      />
      <HexagonMid
        width={width}
        hover={hover}
        bgcolor={hover ? palette.info.main : palette.primary.main}
      />
      <HexagonFront
        width={width}
        hover={hover}
        bgcolor={hover ? palette.info.dark : palette.primary.dark}
      />
      <HexagonContainer
        width={width}
        hover={hover}>
        {props.children}
      </HexagonContainer>
    </HexagonWrapper>
  );
};
