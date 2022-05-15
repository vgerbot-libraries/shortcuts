import { NavigationStart } from '@angular/router';
import '@vgerbot/shortcuts';

declare module '@vgerbot/shortcuts' {
    export interface FullContextOptions {
        matchRouter?: (e: NavigationStart) => boolean;
    }
}
