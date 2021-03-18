import styled from '@emotion/styled';
import React, {useContext, useState} from 'react';
import {Hexagon} from './HexagonButtons';
import {Link} from 'react-router-dom';
import {CenteredDiv, spacing} from './styles';
import {VisualModeContext} from './theme/visualModeContext';
import {GitHub, LinkedIn, LockOpen, WbSunny} from '@material-ui/icons';

type ExpansionStyleProps = {
    hexWidth: number
    hexHeight: number
}

const ExpandWrapper = styled(CenteredDiv)((props: ExpansionStyleProps) => ({
  width: props.hexWidth * 3 + spacing.smaller * 2,
  height: props.hexHeight * 2.5 + spacing.smaller * 2,
}));

const ExpandButton = styled.div((props: ExpansionStyleProps) => ({
  position: 'absolute',
  top: props.hexHeight * .75 + spacing.smaller,
  left: props.hexWidth + spacing.smaller,
}));

const GithubButton = styled(Link)((props: ExpansionStyleProps) => ({
  position: 'absolute',
  top: 0,
  left: props.hexWidth / 2 + spacing.smallest,
}));

const LinkedInButton = styled(Link)((props: ExpansionStyleProps) => ({position: 'absolute', top: 0, right: props.hexWidth / 2 + spacing.smallest}));

const LoginButton = styled(Link)((props: ExpansionStyleProps) => ({
  position: 'absolute',
  top: props.hexHeight * .75 + 10,
  right: 0,
}));

const PingButton = styled(Link)((props: ExpansionStyleProps) => ({
  position: 'absolute',
  bottom: 0,
  right: 100/ 2 + spacing.smallest,
}));

const ComingButton2 = styled(Link)((props: ExpansionStyleProps) => ({
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
  const modeContext = useContext(VisualModeContext);

  return (
    <ExpandWrapper hexWidth={hexWidth} hexHeight={hexHeight}>
      <ExpandButton onClick={() => setExpanded(!expanded)} hexWidth={hexWidth} hexHeight={hexHeight}>
        <Hexagon width={hexWidth}>Get Started</Hexagon>
      </ExpandButton>
      {expanded &&
        <>
          <GithubButton to={'/Github'} hexWidth={hexWidth} hexHeight={hexHeight}>
            <Hexagon width={hexWidth}><GitHub fontSize='large'/></Hexagon>
          </GithubButton>
          <LinkedInButton to={'/LinkedIn'} hexWidth={hexWidth} hexHeight={hexHeight}>
            <Hexagon width={hexWidth}><LinkedIn fontSize='large'/></Hexagon>
          </LinkedInButton>
          <LoginButton to={'/Login'} hexWidth={hexWidth} hexHeight={hexHeight}>
            <Hexagon width={hexWidth}><LockOpen fontSize='large'/></Hexagon>
          </LoginButton>
          <PingButton to={'/Ping'} hexWidth={hexWidth} hexHeight={hexHeight}>
            <Hexagon width={hexWidth}>Ping Server</Hexagon>
          </PingButton>
          <ComingButton2 to={'/ComingSoon'} hexWidth={hexWidth} hexHeight={hexHeight}>
            <Hexagon width={hexWidth}>Coming Soon</Hexagon>
          </ComingButton2>
          <DarkModeButton onClick={() => {
            modeContext.setMode(modeContext.mode === 'light' ? 'dark' : 'light');
          }} hexWidth={hexWidth} hexHeight={hexHeight}>
            <Hexagon width={hexWidth}><WbSunny fontSize='large'/></Hexagon>
          </DarkModeButton>
        </>
      }
    </ExpandWrapper>
  );
};
