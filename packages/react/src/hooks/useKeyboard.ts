import { useContext } from 'react';
import { KeyboardContext } from '../context/KeyboardContext';

export function useKeyboard() {
    return useContext(KeyboardContext);
}
