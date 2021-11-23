import { ShortcutEvent } from './ShortcutEvent';

export interface Interceptor {
    (event: ShortcutEvent, next: (event: ShortcutEvent) => void): void;
}
