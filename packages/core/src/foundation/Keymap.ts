import { Interceptor } from './Interceptor';

export interface KeymapOptions {
    commands: Record<string, CommandOptions | string>;
    contexts: Record<string, ContextOptions>;
}

export interface CommandOptions {
    shortcut: string;
    event?: Opportunity[];
    preventDefault?: boolean;
    interceptors?: Interceptor[];
}

export interface ContextOptions {
    commands: string[];
    abstract?: boolean;
    fallbacks?: string[];
}

export type Opportunity = 'keyboard' | 'keyup' | 'keypress';
