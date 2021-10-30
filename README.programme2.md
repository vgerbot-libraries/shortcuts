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

keyboard.commands({
    copy: 'Mod+C',
    paste: 'Mod+V',
    print: 'Mod+P',
    find: 'Mod+F',
    replace: 'Mod+H',
    devtool: 'F12',
    close: 'Mod+W',
    confirm: 'Enter'
});

keyboard.contexts({
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
        fallback: ['closable', 'searchable']
    },
    previewer: {
        commands: ['print'],
        fallback: ['closable', 'searchable']
    },
    dialog: {
        commands: ['confirm'],
        fallback: ['closable']
    }
});

keyboard.on('close', () => {
    console.log('close');
});

```
