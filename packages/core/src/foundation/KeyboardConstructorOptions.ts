import { MacroRegistry } from '../macro/MacroRegistry';
import { ShortcutEventTarget } from './ShortcutEventTarget';

export interface KeyboardConstructorOptions {
    anchor?: ShortcutEventTarget;
    eventOptions?: AddEventListenerOptions;
    macroRegistry?: MacroRegistry;
}
