import {
    Component,
    EventEmitter,
    HostListener,
    Input,
    Output
} from '@angular/core';
import {
    Shortcut,
    ShortcutEvent,
    ShortcutEventImpl,
    ShortcutKeyboardEvent
} from '@vgerbot/shortcuts';

@Component({
    selector: 'shortcuts[key]',
    template: '<!-- &lt;shortcuts[key]&gt; -->'
})
export class ShortcutsKeyComponent {
    @Input('key') shortcutKey?: string;
    @Input('keydown') handleOnKeydown: boolean = true;
    @Input('keyup') handleOnKeyup: boolean = false;
    @Input('preventDefault') preventDefault: boolean = false;
    @Input('stopPropagation') stopPropagation: boolean = false;
    @Input('disabled') disabled: boolean = false;
    @Output('handle') emitter: EventEmitter<ShortcutEvent> =
        new EventEmitter<ShortcutEvent>();

    @HostListener('keydown', ['$event'])
    onKeydown(event: KeyboardEvent): void {
        if (this.handleOnKeydown) {
            this.fire(event);
        }
    }
    @HostListener('keyup', ['$event'])
    onKeyup(event: KeyboardEvent) {
        if (this.handleOnKeyup) {
            this.fire(event);
        }
    }
    fire(event: KeyboardEvent) {
        if (this.disabled) {
            return;
        }
        if (!this.shortcutKey) {
            return;
        }
        if (this.preventDefault) {
            event.preventDefault();
        }
        if (this.stopPropagation) {
            event.stopPropagation();
        }
        const shortcut = Shortcut.from(this.shortcutKey);
        if (shortcut.match(event as ShortcutKeyboardEvent)) {
            const shortcutEvent = new ShortcutEventImpl(shortcut, event);
            this.emitter.emit(shortcutEvent);
        }
    }
}
