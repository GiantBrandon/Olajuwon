import styled from '@emotion/styled';
import React, {useState} from 'react';
import {Hexagon} from './HexagonButtons';
import {LeftCenteredDiv, spacing} from './styles';
import {GitHub, LinkedIn, LockOpen, SportsBasketball, WbSunny} from '@material-ui/icons';

type ExpansionStyleProps = {
    hexWidth: number
    hexHeight: number
}

const ExpandWrapper = styled(LeftCenteredDiv)((props: ExpansionStyleProps) => ({
  width: props.hexWidth * 3 + spacing.smaller * 2,
  height: props.hexHeight * 2.5 + spacing.smaller * 2,
}));

const ExpandButton = styled.div((props: ExpansionStyleProps) => ({
  position: 'absolute',
  top: props.hexHeight * .75 + spacing.smaller,
  left: props.hexWidth + spacing.smaller,
}));

const GithubButton = styled.a((props: ExpansionStyleProps) => ({
  position: 'absolute',
  top: 0,
  left: props.hexWidth / 2 + spacing.smallest,
}));

const LinkedInButton = styled.a((props: ExpansionStyleProps) => ({position: 'absolute', top: 0, right: props.hexWidth / 2 + spacing.smallest}));

const LoginButton = styled.a((props: ExpansionStyleProps) => ({
  position: 'absolute',
  top: props.hexHeight * .75 + 10,
  right: 0,
}));

const PingButton = styled.a((props: ExpansionStyleProps) => ({
  position: 'absolute',
  bottom: 0,
  right: 100/ 2 + spacing.smallest,
}));

const ComingButton2 = styled.a((props: ExpansionStyleProps) => ({
  position: 'absolute',
  bottom: 0,
  left: 100/ 2 + spacing.smallest,
}));

const DarkModeButton = styled.div((props: ExpansionStyleProps) => ({
  position: 'absolute',
  top: props.hexHeight * .75 + spacing.smaller,
  left: 0,
}));

interface ExpansionProps {
    hexHeight?: number
    hexWidth?: number
}

export const Expansion: React.FC<ExpansionProps> = ({hexWidth = 100, hexHeight = hexWidth * 1.16}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <ExpandWrapper hexWidth={hexWidth} hexHeight={hexHeight}>
      <ExpandButton onClick={() => setExpanded(!expanded)} hexWidth={hexWidth} hexHeight={hexHeight}>
        <Hexagon width={hexWidth}>Get Started</Hexagon>
      </ExpandButton>
      {expanded &&
        <>
          <GithubButton href={'#/Github'} hexWidth={hexWidth} hexHeight={hexHeight}>
            <Hexagon width={hexWidth}><GitHub fontSize='large'/></Hexagon>
          </GithubButton>
          <LinkedInButton href={'#/LinkedIn'} hexWidth={hexWidth} hexHeight={hexHeight}>
            <Hexagon width={hexWidth}><LinkedIn fontSize='large'/></Hexagon>
          </LinkedInButton>
          <LoginButton href={'#/Login'} hexWidth={hexWidth} hexHeight={hexHeight}>
            <Hexagon width={hexWidth}><LockOpen fontSize='large'/></Hexagon>
          </LoginButton>
          <PingButton href={'#/Ping'} hexWidth={hexWidth} hexHeight={hexHeight}>
            <Hexagon width={hexWidth}>Ping Server</Hexagon>
          </PingButton>
          <ComingButton2 href={'#/Fantasy'} hexWidth={hexWidth} hexHeight={hexHeight}>
            <Hexagon width={hexWidth}><SportsBasketball fontSize='large'/></Hexagon>
          </ComingButton2>
          <DarkModeButton hexWidth={hexWidth} hexHeight={hexHeight}>
            <Hexagon width={hexWidth}><WbSunny fontSize='large'/></Hexagon>
          </DarkModeButton>
        </>
      }
    </ExpandWrapper>
  );
};
