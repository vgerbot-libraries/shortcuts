import { useKeyboard } from '../hooks';
import type { Shortcut } from '@vgerbot/shortcuts';

type ForwardEventOptions =
    | {
          eventType: 'click' | 'mouseup' | 'mousedown' | 'dblclick';
          eventInitDict?: MouseEventInit;
      }
    | {
          eventType: 'pointerdown' | 'pointerup';
          eventInitDict?: PointerEventInit;
      }
    | {
          eventType: 'touchstart' | 'touchend';
          eventInitDict?: TouchEventInit;
      };

export type ForwardCommandOptions = ForwardEventOptions & {
    command: string;
};
export type ForwardShortcutOptions = ForwardEventOptions & {
    shortcut: string | Shortcut;
};

/**
 * const shortcut = useShortcutOfCommand('cut')
 * <ContextMenu>
 *  <ContextMenuItem use:command={{
 *      command: 'cut',
 *      eventType: 'click'
 *    }} extra={shortcutKey()}></ContextMenuItem>
 * </ContextMenu>
 */
export function forward(el: HTMLElement, options: ForwardCommandOptions): void;
export function forward(el: HTMLElement, options: ForwardShortcutOptions): void;
export function forward(
    el: HTMLElement,
    options: ForwardCommandOptions | ForwardShortcutOptions
) {
    useKeyboard(keyboard => {
        const forwardHandler = () => {
            const event = createManualEvent(options);
            el.dispatchEvent(event);
        };
        if ('command' in options) {
            return keyboard.on(options.command, forwardHandler);
        } else {
            return keyboard.onShortcutKeyMatch(
                options.shortcut,
                forwardHandler
            );
        }
    });
}

function createManualEvent(options: ForwardEventOptions) {
    switch (options.eventType) {
        case 'click':
        case 'mousedown':
        case 'mouseup':
        case 'dblclick':
            return new MouseEvent(options.eventType, options.eventInitDict);
        case 'pointerdown':
        case 'pointerup':
            return new PointerEvent(options.eventType, options.eventInitDict);
        case 'touchend':
        case 'touchstart':
            return new TouchEvent(options.eventType, options.eventInitDict);
        default:
            throw new Error(
                `Incorrect eventType: ${
                    (options as { eventType: unknown }).eventType
                }`
            );
    }
}
