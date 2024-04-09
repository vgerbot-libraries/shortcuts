export * from './forward';
import { ForwardCommandOptions, ForwardShortcutOptions } from './forward';

declare module 'solid-js' {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        interface Directives {
            forward: ForwardCommandOptions | ForwardShortcutOptions;
        }
    }
}
