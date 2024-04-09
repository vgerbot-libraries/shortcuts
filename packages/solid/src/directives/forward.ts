import { useKeyboard } from '../hooks';
import type { Shortcut } from '@vgerbot/shortcuts';

type EventOptions =
    | {
          eventType: 'click' | 'mouseup' | 'mousedown' | 'dblclick';
          eventInitDict: MouseEventInit;
      }
    | {
          eventType: 'pointerdown' | 'pointerup';
          eventInitDict: PointerEventInit;
      }
    | {
          eventType: 'touchstart' | 'touchend';
          eventInitDict: TouchEventInit;
      };

/**
 * const shortcutKey = useKeyOfCommand('cut')
 * <ContextMenu>
 *  <ContextMenuItem use:command={{
 *      command: 'cut',
 *      eventType: 'click'
 *    }} extra={shortcutKey()}></ContextMenuItem>
 * </ContextMenu>
 */
export function forward(
    el: HTMLElement,
    options: EventOptions & {
        command: string;
    }
): void;
export function forward(
    el: HTMLElement,
    options: EventOptions & {
        shortcut: string | Shortcut;
    }
): void;
export function forward(
    el: HTMLElement,
    options: EventOptions &
        (
            | {
                  command: string;
              }
            | {
                  shortcut: string | Shortcut;
              }
        )
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

function createManualEvent(options: EventOptions) {
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
