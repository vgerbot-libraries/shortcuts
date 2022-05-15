import { Directive, ElementRef, Inject, OnDestroy } from '@angular/core';
import { Keyboard } from '@vgerbot/shortcuts';

@Directive({
    selector: '[shortcuts-anchor]'
})
export class ShortcutsAnchorDirective implements OnDestroy {
    constructor(
        @Inject(Keyboard)
        private keyboard: Keyboard,
        private readonly el: ElementRef
    ) {
        this.keyboard.setAnchor(el.nativeElement);
    }
    ngOnDestroy() {
        this.keyboard.destroy();
    }
}
