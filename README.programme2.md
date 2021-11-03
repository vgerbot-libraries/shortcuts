# shortcuts

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
import { Keyboard } from '@shortcut/core';

const keyboard = new Keyboard();
keyboard.keymap({
    commands: {
        copy: 'Ctrl+C',
        paste: 'Ctrl+V',
        print: 'Ctrl+P',
        find: 'Ctrl+F',
        replace: 'Ctrl+H',
        devtool: 'F12',
        close: 'Ctrl+W',
        confirm: 'Enter'
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

However, it doesn't work right now because the current context doesn't have the 'close' command. We can only respond to keyboard events when we switch to a context that supports the 'close' command.

```js
keyboard.switchContext('editor');
```

When the user presses `Ctrl+W`, the close event will be executed.
When the context is switched to `previewer`, since `previewer` does not have a `close` command, the user presses `Ctrl+W` and the event is no longer triggered.

#### Fallback context

If a shortcut command is not found in current activated context, by default, the `shortcuts` will look for same command in `default` context, but if some context has been specified a fallback context, the `shortcuts` will look for that *fallback context* first.

### Shortcut macros

```js
import { Keyboard, macros } from '@shortcut/core';

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

```vue
<template>
    <my-component @shortcut="{'ctrl+alt+o': doTheAction}">
</template>
<script>
    import { Keyboard } from '@shortcut/vue';
    const keyboard = new Keyboard();
    Vue.use(keyboard);
<script>
```

You can define all shortcut key mappings in the global method.

```vue
<template>
    <my-component @shortcut.action1="doTheAction">
</template>
<script>
    import { Keyboard } from '@shortcut/vue';
    const keyboard = new Keyboard();
    keyboard.keymap({
        commands: {
            action1: 'Ctrl+Alt+O',
            action2: 'Ctrl+Alt+K',
            action3: 'Ctrl+Alt+F',
            action4: 'Ctrl+Alt+H',
        }
    });
</script>
```

Shortcut key map can be rewrote dynamically

```vue
<template>
    <my-component @shortcut.action1="doTheAction">
</template>
<script>
    import { Keyboard } from '@shortcut/vue';
    const keyboard = new Keyboard();
    Vue.use(keyboard);
    export default {
        methods:{
            doTheAction() {
                //
            }
        },
        mounted() {
            fetch('/user-customize-keymap.json')
                .then(resp => resp.json())
                .then(keymap => {
                    /*
                    kaymap = {
                        commands: {
                            action1: 'Ctrl+Alt+O',
                            action2: 'Ctrl+Alt+K',
                            action3: 'Ctrl+Alt+F',
                            action4: 'Ctrl+Alt+H',
                        },
                        contexts: {
                            context1: {
                                commands: ['action1']
                            },
                            context2: {
                                commands: ['action2'],
                                fallbacks: ['context1']
                            },
                            context3: {
                                commands: ['action3'],
                                fallbacks: ['context2']
                            },
                            context4: {
                                commands: ['action4'],
                                fallbacks: ['context3']
                            }
                        }
                    }
                    */
                    keyboard.keymap(keymap);
                });
        }
    }
</script>
```

#### Angular
