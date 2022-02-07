import { Component, OnInit } from '@angular/core';
import { ShortcutsDirective, ShortcutsService } from '@shortcuts/angular';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    viewProviders: [ShortcutsDirective]
})
export class AppComponent implements OnInit {
    title = 'angular-example';
    constructor(private service: ShortcutsService) {}
    copy() {
        console.log('copy', this.service);
    }
    cut() {
        console.log('cut');
    }
    ngOnInit() {
        this.service.getKeyboard().switchContext('default');
        this.service.on('copy', function (e) {
            console.log('copy', e);
        });
        this.service.on('cut', function (e) {
            console.log('cut', e);
        });
    }
}
