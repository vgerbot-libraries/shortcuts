import { Keyboard } from '@vgerbot/shortcuts';
import { Context, createContext } from 'solid-js';
export const KeyboardContext = createContext<() => Keyboard>() as Context<
    () => Keyboard
>;
