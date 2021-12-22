import { TestBed, inject } from '@angular/core/testing';
import { ShortcutsModule } from './shortcuts.module';

import { ShortcutsService } from './shortcuts.service';

describe('ShortcutsService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule(ShortcutsModule.forRoot({}));
    });

    it('should be created', inject(
        [ShortcutsService],
        (service: ShortcutsService) => {
            expect(service).toBeTruthy();
        }
    ));
});
