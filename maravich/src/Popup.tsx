import styled from '@emotion/styled'
import React, { useContext } from 'react'
import { colors, Theme } from './Color'
import { CenteredDiv, spacing } from './styles'
import { ThemeContext } from './theme/themeContext'

interface PopupWrapperProps {
  theme: Theme
}

const PopupWrapper = styled(CenteredDiv)((props: PopupWrapperProps) => ({
    display: 'inline-block',
    padding: spacing.medium,
    backgroundColor: props.theme.parallel
}))

export const Popup: React.FC = (props) => {
    const theme: string = useContext(ThemeContext).theme
    return (
        <PopupWrapper theme={colors[theme]}>
            {props.children}
        </PopupWrapper>
    )
}