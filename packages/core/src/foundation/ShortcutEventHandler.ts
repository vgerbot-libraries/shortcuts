import { ShortcutEvent } from './ShortcutEvent';

export interface ShortcutEventHandler<T = void> {
    (event: ShortcutEvent): T;
}
