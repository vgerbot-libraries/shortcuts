import {
    Component,
    EventEmitter,
    HostListener,
    Input,
    Output
} from '@angular/core';
import { Shortcut, ShortcutEvent, ShortcutEventImpl } from '@shortcuts/core';

@Component({
    selector: 'shortcuts[key]',
    template: '<!-- &lt;shortcuts[key]&gt; -->'
})
export class ShortcutsKeyComponent {
    @Input('key') shortcutKey?: string;
    @Input('keydown') handleOnKeydown?: boolean;
    @Input('keyup') handleOnKeyup?: boolean;
    @Input('preventDefault') preventDefault?: boolean;
    @Input('stopPropagation') stopPropagation?: boolean;
    @Output('handle') emitter: EventEmitter<ShortcutEvent> =
        new EventEmitter<ShortcutEvent>();

    @HostListener('keydown', ['$event'])
    onKeydown(event: KeyboardEvent): void {
        if (this.handleOnKeydown !== false) {
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
        if (shortcut.match(event)) {
            const shortcutEvent = new ShortcutEventImpl(shortcut, event);
            this.emitter.emit(shortcutEvent);
        }
    }
}
