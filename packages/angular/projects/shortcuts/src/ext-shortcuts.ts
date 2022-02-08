import { NavigationStart } from '@angular/router';
import '@shortcuts/core';

declare module '@shortcuts/core' {
    export interface FullContextOptions {
        matchRouter?: (e: NavigationStart) => boolean;
    }
}
