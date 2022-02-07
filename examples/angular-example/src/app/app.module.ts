import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ShortcutsModule } from '@shortcuts/angular';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ShortcutsModule.forRoot({
            keymap: {
                commands: {
                    copy: 'Ctrl+c',
                    cut: 'Ctrl+x'
                },
                contexts: {
                    default: {
                        commands: ['copy', 'cut']
                    }
                }
            }
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
