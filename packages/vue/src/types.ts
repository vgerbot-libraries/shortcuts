export type {} from 'vue-router';
import { Keyboard, KeymapOptions, macro } from '@shortcuts/core';

declare module 'vue' {
    export default interface Vue {
        keyboard: Keyboard;
        keymap(options: KeymapOptions): void;
        macro: typeof macro;
    }
}

declare module '@shortcuts/core' {
    export interface FullContextOptions {
        routerNameOrPath?: string;
    }
}
