import { KeymapOptions, Keyboard, MacroRegistry } from '@shortcuts/core';
import { PluginObject, VueConstructor, PluginFunction } from 'vue';

import { ShortcutsMixVue } from './ShortcutsMixVue';

import { createShortcutDirectiveDefinition } from './shortcut.directive';
import { createShortkeyDirectiveDefinition } from './shortkey.directive';

export type ShortcutsVuePluginOptions = {
    keymap?: KeymapOptions;
    anchor?: GlobalEventHandlers;
    macroRegistry?: MacroRegistry;
};

export type ShortcutsPluginObject = PluginObject<ShortcutsVuePluginOptions>;

const SHORTCUT_DIRECTIVE_NAME = 'shortcut';
const SHORTKEY_DIRECTIVE_NAME = 'shortkey';

export const Shortcuts: ShortcutsPluginObject = {
    install: <PluginFunction<ShortcutsVuePluginOptions>>((
        vue: VueConstructor<ShortcutsMixVue>,
        installOptions: ShortcutsVuePluginOptions = {}
    ) => {
        vue.prototype.keymap = function (extKeymapOptions: KeymapOptions) {
            let keyboard = this.keyboard as Keyboard;
            if (!keyboard) {
                const { anchor, keymap: setupKeymap } = installOptions;
                const targetAnchor = anchor || this.$el;
                const tabindex = targetAnchor.tabIndex;
                if (isNaN(tabindex)) {
                    targetAnchor.tabIndex = -1;
                }
                keyboard = new Keyboard(targetAnchor);
                keyboard.keymap(setupKeymap || {});
            }
            keyboard.keymap(extKeymapOptions);
        };
        vue.directive(
            SHORTCUT_DIRECTIVE_NAME,
            createShortcutDirectiveDefinition({
                directiveName: SHORTCUT_DIRECTIVE_NAME,
                macroRegistry: installOptions.macroRegistry
            })
        );
        vue.directive(
            SHORTKEY_DIRECTIVE_NAME,
            createShortkeyDirectiveDefinition({
                directiveName: SHORTKEY_DIRECTIVE_NAME,
                macroRegistry: installOptions.macroRegistry
            })
        );
    })
};
