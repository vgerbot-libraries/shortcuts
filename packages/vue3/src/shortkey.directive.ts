import {
    addKeydownEventListener,
    addKeyupEventListener,
    combine,
    Shortcut,
    ShortcutEventImpl
} from '@vgerbot/shortcuts-core';
import { Directive, DirectiveBinding, VNode } from 'vue';
import { ShortcutDirectiveOptions } from './ShortcutDirectiveOptions';
import './types';

export function createShortcutKeyDirectiveDefinition(
    directiveOptions: ShortcutDirectiveOptions
): Directive {
    return {
        mounted: function (el, binding, vnode) {
            vnode.detach = update(el, binding, vnode, directiveOptions);
        },
        unmounted: (el, binding, vnode) => {
            if (vnode.detach) {
                vnode.detach();
            }
        },
        updated: function (el, binding, vnode) {
            vnode.detach = update(el, binding, vnode, directiveOptions);
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
    return combine(
        keydown &&
            addKeydownEventListener(el, listener, addEventListenerOptions),
        keyup && addKeyupEventListener(el, listener, addEventListenerOptions)
    );
}
