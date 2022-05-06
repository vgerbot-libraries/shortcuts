import { ShortcutEvent } from '@vgerbot/shortcuts-core';
import { DirectiveOptions } from 'vue';
import { DirectiveBinding } from 'vue/types/options';
import { noop } from './noop';
import { ShortcutDirectiveOptions } from './ShortcutDirectiveOptions';
import { VNodeWithDetach } from './VNodeWithDetach';

export function createShortcutDirectiveDefinition(
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
    const actionName = binding.value || binding.arg;
    if (typeof actionName !== 'string') {
        return noop;
    }
    const once = binding.modifiers?.once || false;
    const preventDefault = binding.modifiers.preventDefault || false;
    const stopPropagation = binding.modifiers.stopPropagation || false;
    const directiveName = directiveOptions.directiveName;
    const emitEventName = binding.arg || directiveName;

    const keyup = binding.modifiers.keyup;
    const modKeydown = binding.modifiers.keydown;
    const keydown = modKeydown || keyup || true;
    const keyboard = vnode.context?.keyboard;
    if (!keyboard) {
        return noop;
    }
    let removeKeydownEvent = noop;
    let removeKeyupEvent = noop;
    const listener = (event: ShortcutEvent) => {
        if (preventDefault) {
            event.preventDefault();
        }
        if (stopPropagation) {
            event.stopPropagation();
        }
        const customEvent = new CustomEvent(emitEventName, {
            detail: event
        });
        vnode.elm?.dispatchEvent(customEvent);
        if (emitEventName !== directiveName) {
            const directiveNameEvent = new CustomEvent(directiveName, {
                detail: event
            });
            vnode.elm?.dispatchEvent(directiveNameEvent);
        }
    };
    if (keydown) {
        removeKeydownEvent = keyboard.on(actionName, listener, {
            once,
            type: 'keydown'
        });
    }
    if (keyup) {
        removeKeyupEvent = keyboard.on(actionName, listener, {
            once,
            type: 'keyup'
        });
    }
    return (): void => {
        removeKeydownEvent();
        removeKeyupEvent();
    };
}
