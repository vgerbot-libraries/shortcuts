import { Keyboard } from '@shortcuts/core';
import { Plugin } from 'vue';
import { PluginOptions } from './PluginOptions';
import { createShortcutDirectiveDefinition } from './shortcut.directive';
import { createShortkeyDirectiveDefinition } from './shortcytkey.directive';
import './types';

const SHORTCUT_DIRECTIVE_NAME = 'shortcut';
const SHORTKEY_DIRECTIVE_NAME = 'shortkey';

export const Shortcuts: Plugin = {
    install: (app, options: PluginOptions = {}) => {
        const appContainer = app._container;
        let anchor: EventTarget | null = null;
        if (options.anchor) {
            anchor = options.anchor;
        } else if (typeof appContainer === 'string') {
            anchor = document.querySelector(appContainer);
        } else if (
            appContainer instanceof Element ||
            appContainer instanceof Document
        ) {
            anchor = appContainer;
        }
        if (!anchor) {
            throw new Error('');
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
            createShortkeyDirectiveDefinition({
                directiveName: SHORTKEY_DIRECTIVE_NAME,
                macroRegistry: options.macroRegistry
            })
        );
    }
};
