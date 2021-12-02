import { ShortcutEvent } from './ShortcutEvent';

export interface ShortcutEventHandler {
    <T>(event: ShortcutEvent): T;
}
