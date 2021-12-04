import { Interceptor } from './Interceptor';

export interface KeymapOptions {
    commands?: Record<string, CommandOptions | string>;
    contexts?: Record<string, ContextOptions>;
}

export interface CommandOptions extends Partial<FullCommandOptions> {
    shortcut: string;
}
export interface FullCommandOptions {
    shortcut: string;
    event: Opportunity[];
    preventDefault: boolean;
    interceptors: Interceptor[];
}

export interface ContextOptions extends Partial<FullContextOptions> {
    commands: string[];
}

export interface FullContextOptions {
    commands: string[];
    abstract: boolean;
    fallbacks: string[];
}

export type Opportunity = 'keydown' | 'keyup';
