import { KeymapOptions, Keyboard } from '@shortcuts/core';
import { PluginObject, VueConstructor, PluginFunction } from 'vue';

import { ShortcutsMixVue } from './ShortcutsMixVue';

import { shortcutDirectiveDef } from './shortcut.directive';

export type ShortcutsVuePluginOptions = {
    keymap?: KeymapOptions;
    anchor?: GlobalEventHandlers;
};

export type ShortcutsPluginObject = PluginObject<ShortcutsVuePluginOptions>;

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

        vue.directive('shortcut', shortcutDirectiveDef);
    })
};
