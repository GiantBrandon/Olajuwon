import {PaletteType} from '@material-ui/core';
import React, {useState} from 'react';
import {App} from './App';
import {VisualModeContext} from './theme/visualModeContext';

export const Bootstrap: React.FC = () => {
  const [mode, setMode] = useState<PaletteType>('dark');

  return (
    <VisualModeContext.Provider value={{mode, setMode}}>
      <App />
    </VisualModeContext.Provider>
  );
};
