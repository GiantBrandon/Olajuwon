import { PaletteType } from '@material-ui/core';
import React, { Dispatch, SetStateAction } from 'react'

type VisualModeContextModel = {
    mode: PaletteType,
    setMode: Dispatch<SetStateAction<PaletteType>>
}

export const VisualModeContext = React.createContext<VisualModeContextModel>({mode: 'dark', setMode: () => {}});

