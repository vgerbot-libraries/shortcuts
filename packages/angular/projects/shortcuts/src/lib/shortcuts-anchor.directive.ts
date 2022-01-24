import { Directive, HostListener, Inject } from '@angular/core';
import { Keyboard } from '@shortcuts/core';

@Directive({
    selector: '[shortcuts-anchor]'
})
export class ShortcutsAnchorDirective {
    constructor(
        @Inject(Keyboard)
        private keyboard: Keyboard
    ) {
        this.keyboard.removeRegisteredEvents();
    }
    @HostListener('keydown', ['$event'])
    onKeydown(event: KeyboardEvent) {
        this.keyboard.handleKeyboardEvent(event);
    }
    @HostListener('keyup', ['$event'])
    onKeyup(event: KeyboardEvent) {
        this.keyboard.handleKeyboardEvent(event);
    }
}
