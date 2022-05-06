import {
    Directive,
    ElementRef,
    Inject,
    Input,
    OnDestroy,
    OnInit
} from '@angular/core';
import { Keyboard, Shortcut } from '@vgerbot/shortcuts-core';

@Directive({
    selector: '[shortkey]'
})
export class ShortkeyDirective implements OnInit, OnDestroy {
    @Input('shortkey') keyCombo!: string | Shortcut;
    @Input('event-type') eventType: 'keydown' | 'keyup' = 'keydown';
    private removeEvent: () => void = () => {
        // NOOP
    };
    private get shortcut(): Shortcut {
        if (this.keyCombo instanceof Shortcut) {
            return this.keyCombo;
        }
        return Shortcut.from(this.keyCombo);
    }
    constructor(
        @Inject(Keyboard)
        private keyboard: Keyboard,
        private el: ElementRef
    ) {}
    ngOnInit() {
        this.removeEvent = this.keyboard.onShortcutKeyMatch(
            this.shortcut,
            () => {
                this.el.nativeElement.click();
            }
        );
    }
    ngOnDestroy() {
        this.removeEvent();
    }
}
