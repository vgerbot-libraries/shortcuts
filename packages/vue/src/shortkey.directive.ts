import {
    Shortcut,
    ShortcutEventImpl,
    addKeydownEventListener,
    addKeyupEventListener,
    combine,
    ShortcutKeyboardEvent
} from '@vgerbot/shortcuts';
import { DirectiveBinding } from 'vue/types/options';
import { DirectiveOptions } from 'vue/types/umd';
import { ShortcutDirectiveOptions } from './ShortcutDirectiveOptions';
import { VNodeWithDetach } from './VNodeWithDetach';

export function createShortkeyDirectiveDefinition(
    directiveOptions: ShortcutDirectiveOptions
): DirectiveOptions {
    return {
        bind: function (el, binding, vnode) {
            const detach = update(
                el,
                binding,
                vnode as VNodeWithDetach,
                directiveOptions
            );
            (vnode as VNodeWithDetach).detach = detach;
        },
        unbind: (el, binding, vnode) => {
            const dnode = vnode as VNodeWithDetach;
            if (dnode.detach) {
                dnode.detach();
            }
        },
        update: function (el, binding, vnode) {
            const detach = update(
                el,
                binding,
                vnode as VNodeWithDetach,
                directiveOptions
            );
            (vnode as VNodeWithDetach).detach = detach;
        }
    };
}

function update(
    el: HTMLElement,
    binding: DirectiveBinding,
    vnode: VNodeWithDetach,
    directiveOptions: ShortcutDirectiveOptions
) {
    if (vnode.detach) {
        vnode.detach();
    }
    const shortcutKey = binding.value;
    if (typeof shortcutKey !== 'string') {
        return () => undefined;
    }
    const once = binding.modifiers?.once || false;
    const preventDefault = binding.modifiers.preventDefault || false;
    const stopPropagation = binding.modifiers.stopPropagation || false;
    const directiveName = directiveOptions.directiveName;
    const emitEventName = binding.arg || directiveName;

    const keyup = binding.modifiers.keyup;
    const modKeydown = binding.modifiers.keydown;
    const keydown = modKeydown || keyup || true;
    const shortcut = Shortcut.from(shortcutKey, directiveOptions.macroRegistry);

    const listener = (event: ShortcutKeyboardEvent) => {
        if (!shortcut.match(event)) {
            return;
        }
        if (preventDefault) {
            event.preventDefault();
        }
        if (stopPropagation) {
            event.stopPropagation();
        }
        const shortcutEvent = new ShortcutEventImpl(shortcut, event);
        const customEvent = new CustomEvent(emitEventName, {
            detail: shortcutEvent
        });
        vnode.elm?.dispatchEvent(customEvent);
        if (emitEventName !== directiveName) {
            const directiveNameEvent = new CustomEvent(directiveName, {
                detail: shortcutEvent
            });
            vnode.elm?.dispatchEvent(directiveNameEvent);
        }
    };
    const addEventListenerOptions: AddEventListenerOptions = {
        once
    };
    return combine(
        keydown &&
            addKeydownEventListener(el, listener, addEventListenerOptions),
        keyup && addKeyupEventListener(el, listener, addEventListenerOptions)
    );
}
