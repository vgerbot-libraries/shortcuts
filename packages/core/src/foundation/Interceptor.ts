import { ShortcutEvent } from './ShortcutEvent';
import { ShortcutEventHandler } from './ShortcutEventHandler';

export interface Interceptor {
    (event: ShortcutEvent, next: ShortcutEventHandler): void;
}
