import {
    Opportunity,
    ShortcutEvent,
    ShortcutEventImpl,
    ShortcutEventHandler,
    Interceptor
} from '@shortcuts/core';
import { DirectiveOptions } from 'vue';
import { ShortcutsMixVue } from './ShortcutsMixVue';

export const shortcutDirectiveDef: DirectiveOptions = {
    bind: function (el, binding, vnode) {
        const vueInstance = vnode.context as ShortcutsMixVue;
        if (!vueInstance) {
            throw new Error('Unknown error occurred!');
        }
        const command = binding?.value;
        if (!command) {
            throw new Error(
                // eslint-disable-next-line max-len
                'The @shortcut command does not specify its command name, just like this (v-shortcut="commandName")'
            );
        }
        const once = binding?.modifiers?.once || false;
        const preventDefault = binding?.modifiers?.preventDefault || false;
        const stopPropagation = binding?.modifiers?.stopPropagation || false;
        let eventType: Opportunity | undefined =
            (binding?.arg as Opportunity) || 'keydown';
        if (eventType !== 'keydown' && eventType !== 'keyup') {
            eventType = 'keydown';
        }
        const keyboard = vueInstance.keyboard;
        const listener = (event: KeyboardEvent) => {
            const commandOptions = keyboard.getCommandOptions(command);
            if (!commandOptions) {
                return;
            }
            const { shortcut, interceptors } = commandOptions;
            if (!shortcut.match(event)) {
                return;
            }
            const handleEvent = (e: ShortcutEvent) => {
                if (preventDefault) {
                    e.preventDefault();
                }
                if (stopPropagation) {
                    e.stopPropagation();
                }
                vueInstance.$emit(binding.expression || '', e);
            };
            const runner = interceptors.reduceRight(
                (next: ShortcutEventHandler, cur: Interceptor) => {
                    return (evt: ShortcutEvent) => {
                        cur(evt, next);
                    };
                },
                handleEvent
            );
            runner(new ShortcutEventImpl(shortcut, event));
        };
        const options: AddEventListenerOptions = {
            once
        };
        el.addEventListener(eventType, listener, options);
    },
    unbind: () => {
        //
    }
};
