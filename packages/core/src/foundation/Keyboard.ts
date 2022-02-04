import { EventEmitter } from '../event/EventEmitter';
import {
    DEFAULT_MACRO_REGISTRY,
    MacroRegistry,
    MacroRegistryImpl
} from '../macro/MacroRegistry';
import { Shortcut } from '../shortcut/Shortcut';
import { ActivationContextManager } from './ActivationContextManager';
import { AddShortcutEventOptions } from './AddShortcutEventOptions';
import { Disposable } from './Disposable';
import { Interceptor } from './Interceptor';
import { KeyboardConstructorOptions } from './KeyboardConstructorOptions';
import {
    CommandOptions,
    ContextOptions,
    FullContextOptions,
    KeymapOptions,
    Opportunity,
    ParsedCommandOptions
} from './Keymap';
import { ShortcutEvent, ShortcutEventImpl } from './ShortcutEvent';
import { ShortcutEventHandler } from './ShortcutEventHandler';
import { Store } from './Store';
import {
    addKeydownEventListener,
    addKeyupEventListener
} from '../common/addKeyboardEventListener';
import { combine } from '../common/combine';
import { ShortcutEventTarget } from './ShortcutEventTarget';

export class Keyboard {
    private readonly commands: Record<string, ParsedCommandOptions> = {};
    private readonly contexts: Record<string, FullContextOptions> = {};
    private readonly activationContextManager = new ActivationContextManager();
    private readonly eventEmitter = new EventEmitter<ShortcutEvent>();
    private paused: boolean = false;
    private destroyer = new Disposable();
    private anchor: ShortcutEventTarget;
    private readonly eventOptions?: AddEventListenerOptions;
    private readonly registry: MacroRegistry;
    private readonly partiallyMatchShortcutsStore: Store<Set<Shortcut>> =
        new Store();
    private readonly keyboardEventStore: Store<KeyboardEvent> =
        new Store<KeyboardEvent>();
    private readonly interceptors: Interceptor[] = [];
    private readonly _unregisterEvents = () => {
        // PASS
    };
    constructor(
        options: KeyboardConstructorOptions = {
            anchor: document
        }
    ) {
        this.eventOptions = options.eventOptions;
        this.registry = new MacroRegistryImpl(
            options.macroRegistry || DEFAULT_MACRO_REGISTRY
        );
        this.anchor = options.anchor || document;
        this.registerEvents();
        this.partiallyMatchShortcutsStore.dispatch(new Set<Shortcut>());
    }
    public setAnchor(anchor: ShortcutEventTarget) {
        this._unregisterEvents();
        this.anchor = anchor;
        this.keyboardEventStore.reset();
        this.registerEvents();
    }
    public getAnchor() {
        return this.anchor;
    }
    public getPartMatchShortcuts() {
        return Array.from(this._getPartiallyMatchShortcuts());
    }
    public resetAll() {
        const shortcuts = this._getPartiallyMatchShortcuts();
        shortcuts.forEach(it => it.reset());
        shortcuts.clear();
        this.partiallyMatchShortcutsStore.dispatch(shortcuts);
    }
    public fire(e: KeyboardEvent) {
        const currentContext = this.activationContextManager.peak();
        if (currentContext === undefined) {
            return;
        }
        const commands = this.commandsOf(currentContext);
        if (commands.length === 0) {
            return;
        }
        const shortcuts = this._getPartiallyMatchShortcuts();
        const sizeBeforeMatch = shortcuts.size;
        commands.forEach(it => {
            const opt = this.commands[it];
            const shortcut = opt?.shortcut;
            if (!shortcut) {
                return;
            }
            if (shortcut.match(e)) {
                if (shortcut.isFullMatch()) {
                    shortcuts.delete(shortcut);
                    this.executeCommand(e, it, opt);
                } else {
                    shortcuts.add(shortcut);
                }
            } else {
                shortcuts.delete(shortcut);
            }
        });
        const haseChanged = shortcuts.size != sizeBeforeMatch;
        if (haseChanged) {
            this.partiallyMatchShortcutsStore.dispatch(shortcuts);
        }
    }
    public addInterceptor(interceptor: Interceptor, unshift: boolean = false) {
        const index = this.interceptors.indexOf(interceptor);
        if (index > -1) {
            if (unshift) {
                this.interceptors.unshift(interceptor);
            } else {
                this.interceptors.push(interceptor);
            }
        }
        return () => {
            const index = this.interceptors.indexOf(interceptor);
            if (index > -1) {
                this.interceptors.splice(index, 1);
            }
        };
    }
    private registerEvents() {
        const keyboardEventHandler = <EventListener>((e: KeyboardEvent) => {
            if (this.paused) {
                return;
            }
            switch (e.type) {
                case 'keydown':
                case 'keyup':
                    this.keyboardEventStore.dispatch(e);
                    this.fire(e);
                    break;
            }
        });
        const removeListener = combine(
            addKeydownEventListener(
                this.anchor,
                keyboardEventHandler,
                this.eventOptions || {}
            ),
            addKeyupEventListener(
                this.anchor,
                keyboardEventHandler,
                this.eventOptions || {}
            )
        );
        const clear = this.destroyer.record(removeListener);
        return combine(removeListener, clear);
    }
    private commandsOf(context: string): string[] {
        const fallbackContexts: FullContextOptions[] = [];
        const obtainFallbackContexts = (ctx: string) => {
            const options = this.contexts[ctx];
            if (!options) {
                return;
            }
            if (fallbackContexts.indexOf(options) > -1) {
                return;
            }
            fallbackContexts.push(options);
            options.fallbacks.forEach(obtainFallbackContexts);
        };
        obtainFallbackContexts(context);
        const allCommands = fallbackContexts.reduce((allCommands, it) => {
            return allCommands.concat(it.commands);
        }, [] as string[]);
        return allCommands.filter(
            (it, index) => allCommands.indexOf(it) === index
        );
    }
    private executeCommand(
        e: KeyboardEvent,
        commandName: string,
        commandOptions: ParsedCommandOptions
    ) {
        const includesTheConfiguredEventType =
            commandOptions.event.indexOf(e.type as Opportunity) > -1;
        if (!includesTheConfiguredEventType) {
            return;
        }
        const handleEvent = (e: ShortcutEvent) => {
            if (commandOptions.preventDefault) {
                e.preventDefault();
            }
            this.eventEmitter.emit(commandName, e);
        };
        const interceptors = Array.from(this.interceptors).concat(
            commandOptions.interceptors
        );
        const runner = interceptors.reduceRight(
            (next: ShortcutEventHandler, cur: Interceptor) => {
                return (evt: ShortcutEvent) => {
                    cur(evt, next);
                };
            },
            handleEvent
        );
        const shortcutEvent = new ShortcutEventImpl(commandOptions.shortcut, e);
        runner(shortcutEvent);
    }
    private _getPartiallyMatchShortcuts() {
        return this.partiallyMatchShortcutsStore.getData() as Set<Shortcut>;
    }
    onMatchPartChange(callback: (shortcuts: Set<Shortcut>) => void) {
        return this.partiallyMatchShortcutsStore.subscribe(shortcuts => {
            callback(shortcuts as Set<Shortcut>);
        });
    }
    keymap(keymapOptions: KeymapOptions) {
        const commands = keymapOptions.commands;
        if (commands) {
            this.recordCommands(commands);
        }
        const contexts = keymapOptions.contexts;
        if (contexts) {
            this.recordContexts(contexts);
        }
    }
    getCommandOptions(commandName: string): ParsedCommandOptions | undefined {
        return this.commands[commandName];
    }
    getCommands() {
        return this.commands;
    }
    getContexts() {
        return this.contexts;
    }
    switchContext(context: string) {
        const contextOptions = this.contexts[context];
        if (!contextOptions) {
            throw new Error(
                'Cannot switch to a non-existent context: ' + context
            );
        }
        return this.activationContextManager.push(context);
    }
    onShortcutKeyMatch(
        shortcut: string | Shortcut,
        handler: ShortcutEventHandler,
        {
            type = 'keydown',
            once = false
        }: Partial<AddShortcutEventOptions> = {}
    ) {
        const oShortcut =
            typeof shortcut === 'string'
                ? Shortcut.from(shortcut, this.registry)
                : shortcut;
        const unsubscribe = this.keyboardEventStore.subscribe(e => {
            if (!e || e.type !== type) {
                return;
            }
            if (oShortcut.match(e) && oShortcut.isFullMatch()) {
                if (once) {
                    unsubscribe();
                }
                handler(new ShortcutEventImpl(oShortcut, e));
            }
        });
        return unsubscribe;
    }
    on(
        command: string,
        handler: ShortcutEventHandler,
        {
            type = 'keydown',
            once = false
        }: Partial<AddShortcutEventOptions> = {}
    ) {
        if (!this.commands[command]) {
            throw new Error(
                // eslint-disable-next-line max-len
                `Command has not been registered: ${command}, please make sure that the keymap configuration and the spelling are correct!`
            );
        }
        const remove = this.eventEmitter.on(command, e => {
            if (e.native.type !== type) {
                return;
            }
            if (this.paused) {
                return;
            }
            if (once) {
                remove();
            }
            handler(e);
        });
        return remove;
    }
    pause() {
        this.paused = true;
    }
    resume() {
        this.paused = false;
    }
    destroy() {
        this.destroyer.destroy();
    }
    private recordCommands(commands: Record<string, CommandOptions | string>) {
        for (const commandName in commands) {
            const options = commands[commandName];
            if (typeof options === 'string') {
                this.commands[commandName] = {
                    shortcut: Shortcut.from(options, this.registry),
                    preventDefault: false,
                    event: ['keydown'],
                    interceptors: []
                };
            } else {
                this.commands[commandName] = {
                    shortcut: Shortcut.from(options.shortcut, this.registry),
                    event: options.event || ['keydown'],
                    preventDefault: options.preventDefault !== false,
                    interceptors: options.interceptors || []
                };
            }
        }
    }
    private recordContexts(contexts: Record<string, ContextOptions>) {
        for (const name in contexts) {
            const contextOption = contexts[name];
            this.contexts[name] = {
                commands: contextOption.commands,
                abstract: contextOption.abstract === true,
                fallbacks: contextOption.fallbacks || []
            };
        }
    }
}
