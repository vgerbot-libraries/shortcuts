export type {} from 'vue-router';
import { Keyboard, KeymapOptions, macro } from '@vgerbot/shortcuts';

declare module 'vue' {
    export default interface Vue {
        keyboard: Keyboard;
        keymap(options: KeymapOptions): void;
        macro: typeof macro;
    }
}

declare module '@vgerbot/shortcuts' {
    export interface FullContextOptions {
        routerNameOrPath?: string;
    }
}
