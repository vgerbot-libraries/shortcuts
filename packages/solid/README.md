# @vgerbot/shortcuts-solid

`@vgerbot/shortcuts-solid` is a Solid.js library that provides a set of utilities for easily integrating keyboard shortcuts into your Solid.js applications. It is built on top of the `@vgerbot/shortcuts` library, which handles the underlying keyboard event management.

## Installation

```bash
npm install @vgerbot/shortcuts-solid
```

## Usage

### `KeyboardProvider`

The `KeyboardProvider` component is a Solid.js context provider that manages the keyboard instance and its options. It should be wrapped around the parts of your application where you want to use keyboard shortcuts.

```jsx
import { KeyboardProvider } from '@vgerbot/shortcuts-solid';

const App = () => (
  <KeyboardProvider>
    {/* Your app components */}
  </KeyboardProvider>
);
```

You can pass options to the `KeyboardProvider` to configure the keyboard instance:

```jsx
<KeyboardProvider preventDefault stopPropagation>
  {/* Your app components */}
</KeyboardProvider>
```

### `useKeyboard`

The `useKeyboard` hook returns a function that provides the keyboard instance, which can be used to register or unregister shortcut commands, add event interceptors, switch keyboard contexts, and more optionals manually. It also accepts an optional callback function that will be called with the keyboard instance.

```jsx
import { useKeyboard } from '@vgerbot/shortcuts-solid';

const MyComponent = () => {
  const getKeyboard = useKeyboard((keyboard) => {
    // Register a shortcut
    const unregister = keyboard.register('save', () => {
      console.log('Shortcut triggered!');
    });
    // Add an event interceptor
    keyboard.addInterceptor((event, next) => {
      // Intercept and handle keyboard events
      // ...
      return next(event);
    });

    // Switch keyboard context
    keyboard.switchContext('editor');
        
    // Unregister the shortcut
    return unregister;
  });

  // Get the keyboard instance
  const keyboard = getKeyboard();

  // ...
};
```

### `useCommand`

The `useCommand` hook registers a keyboard shortcut with a provided command string and callback function.

```jsx
import { useCommand } from '@vgerbot/shortcuts-solid';

const MyComponent = () => {
  useCommand('Ctrl+S', () => {
    console.log('Shortcut triggered!');
  });

  // ...
};
```

### `useShortcutKeyMatch`

The `useShortcutKeyMatch` hook registers a keyboard shortcut with a provided shortcut object or string and callback function.

```jsx
import { useShortcutKeyMatch } from '@vgerbot/shortcuts-solid';

const MyComponent = () => {
  useShortcutKeyMatch('Ctrl+S', () => {
    console.log('Shortcut triggered!');
  });

  // ...
};
```

### `forward`

The `forward` directive allows you to forward keyboard shortcut events to a DOM element, triggering events such as `click`, `touch`, or `pointer` events on that element. This can be useful for integrating keyboard shortcuts with components or libraries that rely on these types of events.

```jsx
import { forward } from '@vgerbot/shortcuts-solid';

const MyComponent = () => {
  let buttonRef;

  return (
    <button
      ref={buttonRef}
      use:forward={{ eventType: 'click', shortcut: 'Ctrl+S' }}
      onClick={() => console.log('Button clicked!')}
    >
      Save file
    </button>
  );
};
```

In the example above, the `Ctrl+S` shortcut will trigger a `click` event on the button element, executing the `onClick` handler.

The `forward` directive accepts an options object with the following properties:

- `eventType` (optional): The type of event to trigger on the DOM element. Defaults to `click`. Can be any valid event type from the `HTMLElementEventMap`.
- `command`: A string representing the keyboard shortcut command to listen for.
- `shortcut`: Alternatively, you can provide a shortcut object or string instead of a command.

This directive provides a convenient way to integrate keyboard shortcuts directly into your Solid.js components, bridging the gap between keyboard events and UI interactions.
