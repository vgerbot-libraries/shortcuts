import {
    Component,
    EventEmitter,
    Inject,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges
} from '@angular/core';
import { ShortcutEvent } from '@shortcuts/core';
import { ShortcutsService } from './shortcuts.service';

@Component({
    selector: 'shortcuts[command]',
    template: '<!-- &lt;shortcuts&gt; -->',
    styles: []
})
export class ShortcutsComponent implements OnInit, OnDestroy, OnChanges {
    @Input('command') commandName!: string;
    @Output('handle') emitter: EventEmitter<ShortcutEvent> =
        new EventEmitter<ShortcutEvent>();

    private removeEventListener = () => {
        // PASS;
    };

    constructor(@Inject(ShortcutsService) public service: ShortcutsService) {}

    ngOnInit(): void {
        this.registerEvent();
    }
    ngOnDestroy() {
        this.removeEventListener();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ('command' in changes) {
            this.registerEvent();
        }
    }
    private registerEvent() {
        this.removeEventListener();
        this.removeEventListener = this.service
            .getKeyboard()
            .on(this.commandName, event => {
                this.emitter.emit(event);
            });
    }
}
