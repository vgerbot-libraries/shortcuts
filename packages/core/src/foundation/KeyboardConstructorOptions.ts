import { MacroRegistry } from '../macro/MacroRegistry';
import { ShortcutEventTarget } from './ShortcutEventTarget';

export interface KeyboardConstructorOptions {
    anchor?: ShortcutEventTarget;
    eventOptions?: AddEventListenerOptions;
    registerEvents?: boolean;
    macroRegistry?: MacroRegistry;
}
