import { Shortcut, ShortcutEventImpl } from '@shortcuts/core';
import { DirectiveBinding, Directive, VNode } from 'vue';
import { ShortcutDirectiveOptions } from './ShortcutDirectiveOptions';
import './types';

export function createShortkeyDirectiveDefinition(
    directiveOptions: ShortcutDirectiveOptions
): Directive {
    return {
        mounted: function (el, binding, vnode) {
            const detach = update(el, binding, vnode, directiveOptions);
            vnode.detach = detach;
        },
        updated: function (el, binding, vnode) {
            const detach = update(el, binding, vnode, directiveOptions);
            vnode.detach = detach;
        },
        unmounted: (el, binding, vnode) => {
            if (vnode.detach) {
                vnode.detach();
            }
        }
    };
}

function update(
    el: HTMLElement,
    binding: DirectiveBinding,
    vnode: VNode,
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

    const listener = (event: KeyboardEvent) => {
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
        vnode.el?.dispatchEvent(customEvent);
        if (emitEventName !== directiveName) {
            const directiveNameEvent = new CustomEvent(directiveName, {
                detail: shortcutEvent
            });
            vnode.el?.dispatchEvent(directiveNameEvent);
        }
    };
    const addEventListenerOptions: AddEventListenerOptions = {
        once
    };
    if (keydown) {
        el.addEventListener('keydown', listener, addEventListenerOptions);
    }
    if (keyup) {
        el.addEventListener('keyup', listener, addEventListenerOptions);
    }
    return (): void => {
        if (keydown) {
            el.removeEventListener(
                'keydown',
                listener,
                addEventListenerOptions
            );
        }
        if (keyup) {
            el.removeEventListener('keyup', listener, addEventListenerOptions);
        }
    };
}
