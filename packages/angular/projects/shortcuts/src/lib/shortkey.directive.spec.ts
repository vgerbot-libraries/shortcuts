import { ShortkeyDirective } from './shortkey.directive';
import { inject, TestBed } from '@angular/core/testing';
import { ElementRef } from '@angular/core';
import { Keyboard } from '@shortcuts/core';
import { ShortcutsModule } from './shortcuts.module';
import { RouterModule } from '@angular/router';

class MockElementRef extends ElementRef {}

describe('ShortcutsKeyDirective', () => {
    beforeAll(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterModule.forRoot([]),
                ShortcutsModule.forRoot({
                    keymap: {
                        contexts: {
                            a: {
                                commands: ['a'],
                                matchRouter: () => true
                            }
                        }
                    }
                })
            ],
            providers: [
                {
                    provide: ElementRef,
                    useClass: MockElementRef
                }
            ]
        }).compileComponents();
    });

    it('should create an instance', inject(
        [Keyboard],
        (keyboard: Keyboard, el: ElementRef) => {
            const directive = new ShortkeyDirective(keyboard, el);
            expect(directive).toBeDefined();
        }
    ));
});
