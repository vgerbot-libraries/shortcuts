import { Keyboard } from '@vgerbot/shortcuts';
import React, { Context } from 'react';

export const KeyboardContext = React.createContext<Keyboard | null>(
    null
) as Context<Keyboard>;
