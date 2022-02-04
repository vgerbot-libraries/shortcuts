import '@shortcuts/core';

declare module '@shortcuts/core' {
    export interface FullContextOptions {
        routerUrl: string | undefined | null;
    }
}
