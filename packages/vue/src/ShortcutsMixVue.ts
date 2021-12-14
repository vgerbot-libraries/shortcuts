import { KeymapOptions, Keyboard } from '@shortcuts/core';

export type ShortcutsMixVue = Vue & {
    keymap(options: KeymapOptions): void;
    keyboard: Keyboard;
};
