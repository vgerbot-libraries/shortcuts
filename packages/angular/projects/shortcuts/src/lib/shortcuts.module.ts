import { ModuleWithProviders, NgModule } from '@angular/core';
import { Keyboard } from '@shortcuts/core';
import { SHORTCUTS_MODULE_OPTIONS_PROVIDER_TOKEN } from './injection.tokens';
import { ShortcutsComponent } from './shortcuts.component';
import { ShortcutsService } from './shortcuts.service';
import { ShortcutsModuleOptions } from './ShortcutsModuleOptions';
import { ShortcutsAnchorDirective } from './shortcuts-anchor.directive';
import { ShortcutsDirective } from './shortcuts.directive';
import { ShortcutsKeyComponent } from './shortcuts-key.component';
import { ShortkeyDirective } from './shortkey.directive';

@NgModule({
    declarations: [
        ShortcutsComponent,
        ShortcutsKeyComponent,
        ShortcutsAnchorDirective,
        ShortcutsDirective,
        ShortkeyDirective
    ],
    exports: [
        ShortcutsComponent,
        ShortcutsKeyComponent,
        ShortcutsAnchorDirective,
        ShortcutsDirective
    ],
    imports: []
})
export class ShortcutsModule {
    static forRoot(
        options: ShortcutsModuleOptions = {}
    ): ModuleWithProviders<ShortcutsModule> {
        return {
            ngModule: ShortcutsModule,
            providers: [
                {
                    provide: SHORTCUTS_MODULE_OPTIONS_PROVIDER_TOKEN,
                    useValue: options
                },
                ShortcutsService,
                {
                    deps: [ShortcutsService],
                    provide: Keyboard,
                    useFactory: (shortcutService: ShortcutsService) => {
                        return shortcutService.getKeyboard();
                    }
                }
            ]
        };
    }
}
