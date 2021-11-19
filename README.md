# shortcuts ![Initial development is in progress, but there has not yet been a stable, usable release suitable for the public.](https://www.repostatus.org/badges/latest/wip.svg) ![NPM](https://img.shields.io/npm/l/@channel/core?style=social)

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/08bfda65b05c4df8a98e38847eed9712)](https://www.codacy.com/gh/y1j2x34/shortcuts/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=y1j2x34/shortcuts&amp;utm_campaign=Badge_Grade)

## Install

```sh
$ npm install shortcuts --save
$ # or
$ yarn add shortcuts
```

Then import/require the module:

```js
const { match } = require('@shortcuts/core');
// or
import { match } from '@shortcuts/core';
```

## Usage

### Pattern matching

```js
import { match } from '@shortcuts/core';
const matcher = match
    .case('Ctrl+A', (shortcutEvent) => console.log(`Pressed '${shortcutEvent.shortcut}`)) // output when matching: Pressed 'Ctrl+A'
    .case('Mod+Z', (shortcutEvent) => console.log(`Pressed '${shortcutEvent.shortcut}'`)) // output when matching: Mac: `Pressed 'Meta+A'`, Win,Linux:`Pressed 'Ctrl+A'`
    .case('Ctrl+P,Shift+Ctrl+P', (shortcutEvent) => console.log(`Pressed '${shortcutEvent.shortcut}`)) // output when matching: `Pressed 'Ctrl+P'` or `Pressed 'Shift+Ctrl+P'`
    ;
document.body.addEventListener('keydown', e => {
    matcher(e);
})
```

You may omit `.case`.

```js
import { match } from '@shortcuts/core';
const matcher = match('Ctrl+A', (shortcutEvent) => console.log(`Pressed '${shortcutEvent.shortcut}`)) // output when matching: Pressed 'Ctrl+A'
    ('Mod+Z', (shortcutEvent) => console.log(`Pressed '${shortcutEvent.shortcut}'`)) // output when matching: Mac: `Pressed 'Meta+A'`, Win,Linux:`Pressed 'Ctrl+A'`
    ('Ctrl+P,Shift+Ctrl+P', (shortcutEvent) => console.log(`Pressed '${shortcutEvent.shortcut}`)) // output when matching: `Pressed 'Ctrl+P'` or `Pressed 'Shift+Ctrl+P'`
    ;
document.body.addEventListener('keydown', e => {
  matcher(e);
})
```

The result of the callback will be returned from matcher.

```js
import { match } from '@shortcuts/core';
const matcher =
    match('Ctrl+A', () => 'A')
    ('Ctrl+B', () => 'B')
document.body.addEventListener('keydown', e => {
  const result = matcher(e);
  console.log(result); // If there is no match, `undefined` will be returned.
})
```

If you provide a value instead of a function, that value will be returnd

```js
import { match } from '@shortcuts/core';
const matcher =
    match('Ctrl+A', 'A')
    ('Ctrl+B', 'B')
document.body.addEventListener('keydown', e => {
  const result = matcher(e);
  console.log(result);  // If there is no match, `undefined` will be returned.
})
```

You may use the `.else` to define a callback  if no shortcut pattern matches.

```js
import { match } from '@shortcuts/core';
const matcher =
    match('Ctrl+A', 'A')
    ('Ctrl+B', 'B')
    .else(() => console.log('no shortcut pattern matches'));
document.body.addEventListener('keydown', e => {
  matcher(e);
})
```

### Shortcut configuration

```js
import { Keyboard } from '@shortcuts/core';

const keyboard = new Keyboard();
keyboard.keymap({
    commands: {
        copy: {
            shortcut: 'Ctrl+C',
            preventDefault: true
        },
        paste: {
            shortcut: 'Ctrl+V',
            preventDefault: true
        },
        print: 'Ctrl+P',
        find: 'Ctrl+F',
        replace: 'Ctrl+H',
        devtool: 'F12',
        close: 'Ctrl+W',
        confirm: {
            shortcut: 'Enter',
            interceptors: [
                (event, next) => {
                    if(event.target.nodeName === 'INPUT') {
                        return;
                    }
                    next(event);
                }
            ]
        }
    },
    contexts: {
        default: {
            commands: ['devtool', 'print']
        },
        closable: {
            abstract: true,
            commands: ['close']
        },
        searchable: {
            abstract: true,
            commands: ['find', 'replace']
        },
        editor: {
            commands: ['copy', 'paste'],
            fallbacks: ['closable', 'searchable']
        },
        previewer: {
            commands: ['print'],
            fallbacks: ['searchable']
        },
        dialog: {
            commands: ['confirm'],
            fallbacks: ['closable']
        }
    }
})
```

#### Shortcut context

With the above configuration, we can now listen for keyboard events like this：

```js
keyboard.on('close', () => {
    console.log('close');
})
```

However, it doesn't work right now because the current context doesn't have the 'close' command. The event can only be responded to if the currently activated context supports the `close` command.

```js
keyboard.switchContext('editor');
```

When the user presses `Ctrl+W`, the close event will be executed.
When the context is switched to `previewer`, since `previewer` does not have a `close` command, the user presses `Ctrl+W` and the event is no longer triggered.

#### Fallback context

If a shortcut command is not found in current activated context, by default, the `shortcuts` will look for same command in `default` context, but if some context has been specified a fallback context, the `shortcuts` will look for that *fallback context* first.

### Shortcut macros

```js
import { Keyboard, macros } from '@shortcuts/core';

const keyboard = new Keyboard();


// These following defines the macros globally.

macros('Mod', isMac ? 'Meta' : 'Ctrl');
macros('Cs', e => {
    return e.crlKey && e.shifKey;
});

// or defines the macros for keyboard instance.

keyboard.macros('Mod', isMac ? 'Meta' : 'Ctrl');
keyboard.macros('Cs', e => {
    return e.crlKey && e.shifKey;
});

// After that, you can use macros like this:

keyboard.keymap({
    commands: {
        copy: 'Mod+C', // On Mac OS, it is equivalent to Meta+C, and other systems are equivalent to Ctrl+C
        capture: 'Cs+A' // Equivalent to Ctrl+Shift+A
    }
})
```

### Integration with thirdparty framework/library

#### Rxjs

```js
import { shortcut } from '@shortcuts/rxjs';
import { fromEvent } from 'rxjs';

fromEvent(document.body, 'keydown')
.pipe(shortcut('Ctrl+A'))
.subscribe(e => console.log('Ctrl+A'))
```

#### React.js

```jsx
import { useShortcut } from '@shortcuts/react';

export const ExampleComponent = () => {
    const [count, setCount] = useState(0);
    useShortcut('Ctrl+K', () => {
        setCount(prev => prev + 1)
    })
    return (
        <span>Pressed {count} times</span>
    );
}

```

The hook takes care of all the binding and unbinding for you. As soon as the component mounts into the DOM, the key stroke will be listened to.When the component unmounts, it will stop listening.

#### Vue.js

```js
import { Shortcuts } from '@shortcuts/vue';
Vue.use(Shortcuts);

const vueInstance = new Vue({
    el: '#app'
});
vueInstance.keymap({
    commands: {
        action1: 'Ctrl+Alt+O',
        action2: 'Ctrl+Alt+K',
        action3: 'Ctrl+Alt+F',
        action4: 'Ctrl+Alt+H',
    }
})

```

Shortcut key map can be rewrote dynamically

```vue
<script>
export default {
    async mounted() {
        const resp = await fetch('/user-customize-keymap.json');
        const keymap = await resp.json();
        vueInstance.keymap(keymap);
    }
}
</script>
```

You can listen to for shortcut key events through Vue directive.

```vue
<template>
    <div>
        <button @shortcut="'action1'" @on.click="close"></button>
    </div>
</template>
<script>
    import {} from '@shortcuts/vue';
    export default {
        methods:{
            close() {
                //
            },
            show() {}
        }
    }
</script>
```

#### Angular

Before you can use shortcut features, you need to import the `ShortcutsModule`.  

```ts
import { NgModule } from '@angular/core';
import { ShortcutsModule } from '@shortcuts/angular'

const keymap = {
    commands: {
        action1: 'Escape',
        action2: 'Enter',
        action3: 'Ctrl+F',
        action4: 'Ctrl+E',
    },
    contexts: {
        dialog: {
            commands: ['action1', 'action2']
        }
    }
};

@NgModule({
    imports: [
        ShortcutsModule.forRoot(keymap)
    ],
    // ....
})
export class AppModule {}
```

```ts
import { ShortcutService } from '@shortcuts/angular';

@Component({
    selector: 'my-dialog',
    template: `
        <div>
            <button [shortcut]="action1" (click)="close()"></button>
            <button [shortcut]="action2" (click)="confirm()"></button>
        </div>
    `
})
class MyDialogComponent {
    constructor(
        private shortcutService: ShortcutService
    ){}
    confirm(){
        console.log('confirm');
    }
    show() {
        this.shortcutService.switchContext('dialog');
    }
    close() {
        console.log('close');
        this.shortcutService.switchBack();
    }
}
```

Integration with angular router

```ts
import { Routes } from '@angular/router';
import { ShortcutsModule } from '@shortcuts/angular';

const routes: Routes = [
    {
        path: 'login',
        component: YourComponent
    }
]

@NgModule({
    imports: [
        RouterModules.forRoot(), 
        ShortcutsModule.forRoot({
            commands: {
                // ...
            },
            contexts: {
                context1: {
                    routerLink: 'login',
                    // ...
                }
            }
        })
    ],
})
```
