import { Keyboard } from '@vgerbot/shortcuts';
import React from 'react';

export const KeyboardContext = React.createContext<Keyboard>(
    null as unknown as Keyboard
);
