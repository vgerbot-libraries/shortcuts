import { Keyboard } from '@vgerbot/shortcuts';
import { Plugin } from 'vue';
import { useRouter } from 'vue-router';
import { noop } from './noop';
import { PluginOptions } from './PluginOptions';
import { createShortcutDirectiveDefinition } from './shortcut.directive';
import { createShortcutKeyDirectiveDefinition } from './shortkey.directive';
import './types';
import { ShortcutEventTarget } from '@vgerbot/shortcuts';

const SHORTCUT_DIRECTIVE_NAME = 'shortcut';
const SHORTKEY_DIRECTIVE_NAME = 'shortkey';

export const Shortcuts: Plugin = {
    install: (app, options: PluginOptions = {}) => {
        const appContainer = app._container;
        let anchor: ShortcutEventTarget | null = null;
        if (options.anchor) {
            anchor = options.anchor;
        } else if (typeof appContainer === 'string') {
            anchor = document.querySelector(
                appContainer
            ) as ShortcutEventTarget | null;
        } else if (
            appContainer instanceof HTMLElement ||
            appContainer instanceof Document ||
            appContainer instanceof SVGElement
        ) {
            anchor = appContainer;
        }
        if (!anchor) {
            throw new Error('Unsupported container: ' + appContainer);
        }
        app.keyboard = new Keyboard({
            anchor
        });
        if (options.keymap) {
            app.keyboard.keymap(options.keymap);
        }

        app.keymap = keymapOptions => app.keyboard.keymap(keymapOptions);

        app.directive(
            SHORTCUT_DIRECTIVE_NAME,
            createShortcutDirectiveDefinition({
                directiveName: SHORTCUT_DIRECTIVE_NAME,
                macroRegistry: options.macroRegistry
            })
        );
        app.directive(
            SHORTKEY_DIRECTIVE_NAME,
            createShortcutKeyDirectiveDefinition({
                directiveName: SHORTKEY_DIRECTIVE_NAME,
                macroRegistry: options.macroRegistry
            })
        );
        app.mixin({
            setup() {
                const router = useRouter();
                let unbind = noop;
                const keyboard = app.keyboard;
                router.afterEach(to => {
                    const contexts = keyboard.getContexts();
                    loop: for (const name in contexts) {
                        const { router } = contexts[name];
                        switch (router) {
                            case to.name:
                            case to.path:
                            case to.fullPath:
                                unbind();
                                unbind = keyboard.switchContext(name);
                                break loop;
                        }
                    }
                });
            }
        });
    }
};
