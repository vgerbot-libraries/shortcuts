import { ShortcutEvent } from '@shortcuts/core';
import {
    Directive,
    DirectiveBinding,
    VNode,
    RendererNode,
    RendererElement
} from 'vue';
import { noop } from './noop';
import { ShortcutDirectiveOptions } from './ShortcutDirectiveOptions';
import './types';

export function createShortcutDirectiveDefinition(
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
    vnode: VNode<RendererNode, RendererElement, unknown>,
    directiveOptions: ShortcutDirectiveOptions
) {
    if (vnode.detach) {
        vnode.detach();
    }
    const commandName = binding.value || binding.arg;
    if (typeof commandName !== 'string') {
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
    const keyboard = vnode.appContext?.app?.keyboard;
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
        vnode.el?.dispatchEvent(customEvent);
        if (emitEventName !== directiveName) {
            const directiveNameEvent = new CustomEvent(directiveName, {
                detail: event
            });
            vnode.el?.dispatchEvent(directiveNameEvent);
        }
    };
    if (keydown) {
        removeKeydownEvent = keyboard.on(commandName, listener, {
            type: 'keydown',
            once
        });
    }
    if (keyup) {
        removeKeyupEvent = keyboard.on(commandName, listener, {
            type: 'keyup',
            once
        });
    }
    return (): void => {
        removeKeydownEvent();
        removeKeyupEvent();
    };
}
