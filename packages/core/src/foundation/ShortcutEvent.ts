import { Shortcut } from '../shortcut/Shortcut';
import { ShortcutContext } from './ShortcutContext';

export interface ShortcutEvent {
    readonly shortcut: Shortcut;
    readonly native: KeyboardEvent;
    preventDefault(): void;
    stopImmediatePropagation(): void;
    stopPropagation(): void;
}

export interface ShortcutCommandEvent extends ShortcutEvent {
    readonly command: string;
    readonly context: ShortcutContext;
}
