import { NavigationStart } from '@angular/router';
import '@vgerbot/shortcuts-core';

declare module '@vgerbot/shortcuts-core' {
    export interface FullContextOptions {
        matchRouter?: (e: NavigationStart) => boolean;
    }
}
