import { Shortcut } from '../shortcut/Shortcut';
import { ShortcutContext } from './ShortcutContext';
import { ShortcutKeyboardEvent } from './ShortcutKeyboardEvent';

export interface ShortcutEvent {
    readonly shortcut: Shortcut;
    readonly native: ShortcutKeyboardEvent | KeyboardEvent;
    preventDefault(): void;
    stopImmediatePropagation(): void;
    stopPropagation(): void;
}

export interface ShortcutCommandEvent extends ShortcutEvent {
    readonly command: string;
    readonly context: ShortcutContext;
}

export class ShortcutEventImpl implements ShortcutEvent {
    constructor(
        public readonly shortcut: Shortcut,
        public readonly native: ShortcutKeyboardEvent | KeyboardEvent
    ) {}
    preventDefault(): void {
        this.native.preventDefault && this.native.preventDefault();
    }
    stopImmediatePropagation(): void {
        this.native.stopImmediatePropagation &&
            this.native.stopImmediatePropagation();
    }
    stopPropagation(): void {
        this.native.stopPropagation && this.native.stopPropagation();
    }
}
