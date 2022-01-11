import {
    isChrome,
    isEdge,
    isFirefox,
    isIE,
    isIE11,
    isIE9,
    versionIs,
    versionLe,
    versionLt
} from '../../common/browser';
import {
    alias,
    keyMacro,
    keyMacro_ins,
    macro,
    keyCodeMacro
} from '../../macro/macro';
import { AltKeyMatcher } from '../../matchers/AltKeyMatcher';
import { CtrlKeyMatcher } from '../../matchers/CtrlKeyMatcher';
import { KeyCodeMatcher } from '../../matchers/KeyCodeMatcher';
import { CaseInsensitiveKeyMatcher } from '../../matchers/KeyMatcher';
import { MetaKeyMatcher } from '../../matchers/MetaKeyMatcher';
import { or } from '../../matchers/or';
import { ShiftKeyMatcher } from '../../matchers/ShiftKeyMatcher';

// Modifire keys
// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values#modifier_keys

macro('Alt', new AltKeyMatcher());
keyMacro_ins('AltGraph');
alias('AltGr', 'AltGraph');
keyMacro_ins('CapsLock');
macro('Control', new CtrlKeyMatcher());
alias('Ctrl', 'Control');
alias('Ctl', 'Control');
keyMacro_ins('CapsLock');
keyMacro_ins('Fn');
keyMacro_ins('FnLock');
keyMacro_ins('NumLock');
macro('Shift', new ShiftKeyMatcher());

keyMacro_ins('BrowserHome'); // 0xac

if (isFirefox || isIE9 || isIE11) {
    macro('OS', new MetaKeyMatcher('OS'));
    alias('Super', 'OS');
    alias('Hyper', 'OS');
    alias('Meta', 'OS');
} else {
    macro('Meta', new MetaKeyMatcher('Meta'));
    keyMacro_ins('Super');
    keyMacro_ins('Hyper');
}

alias('Command', 'Meta');
alias('Cmd', 'Meta');
alias('⌘', 'Meta');
alias('⌃', 'Ctrl');
alias('⌥', 'Alt');
alias('Option', 'Alt');
alias('⇧', 'Shift');
keyCodeMacro('LeftCommand', 91);
keyCodeMacro('RightCommand', 93);
keyCodeMacro('Pause', 19);
keyCodeMacro('Break', 19);

if (isIE9 || isIE11) {
    keyMacro_ins('Scroll');
    alias('ScrollLock', 'Scroll');
    // macro('ScrollLock', e => {
    //     return e.key === 'Scroll';
    // });
} else {
    keyMacro_ins('ScrollLock');
}

keyMacro_ins('Symbol');
keyMacro_ins('SymbolLock');

// Whitespace keys
// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values#whitespace_keys

keyMacro_ins('Enter');
alias('Return', 'Enter');
keyMacro_ins('Tab');

macro('Space', e => {
    return e.key === 'Space' || e.key === 'Spacebar';
});

// Navigation keys
// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values#navigation_keys

if (isIE || (isEdge && versionLe('16')) || (isFirefox && versionLe('36'))) {
    keyMacro_ins('ArrowDown', 'Down');
    keyMacro_ins('ArrowUp', 'Up');
    keyMacro_ins('ArrowLeft', 'Left');
    keyMacro_ins('ArrowRight', 'Right');
} else {
    keyMacro_ins('ArrowDown');
    keyMacro_ins('ArrowUp');
    keyMacro_ins('ArrowLeft');
    keyMacro_ins('ArrowRight');
}
alias('Down', 'ArrowDown');
alias('Up', 'ArrowUp');
alias('Left', 'ArrowLeft');
alias('Right', 'ArrowRight');

keyMacro_ins('End');
keyMacro_ins('Home');
keyMacro_ins('PageDown');
keyMacro_ins('PageUp');

alias('PgDn', 'PageDown');
alias('PgUp', 'PageUp');

// Editing keys
// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values#editing_keys

keyMacro_ins('Backspace');
keyMacro_ins('Clear');
keyMacro_ins('Copy');

keyMacro_ins('Crsel');
keyMacro_ins('Cut');
keyMacro_ins('Delete');
keyMacro_ins('EraseEof');
keyMacro_ins('Exsel');
keyMacro_ins('Insert');
keyMacro_ins('Paste');
keyMacro_ins('Redo');
keyMacro_ins('Undo');

// UI keys
// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values#ui_keys

keyMacro_ins('Accept');
keyMacro_ins('Again');

if (isIE9 || isIE11) {
    keyCodeMacro('Attn', 0xf0);
} else {
    keyMacro_ins('Attn');
}

if (isChrome && versionIs('52')) {
    keyMacro_ins('Cancel', 'Pause');
} else {
    keyMacro_ins('Cancel');
}

if (isIE || (isFirefox && versionLe('36'))) {
    keyMacro_ins('Escape', 'Esc');
    keyMacro_ins('Esc');
    keyMacro_ins('ContextMenu', 'Apps');
} else {
    keyMacro_ins('Escape');
    alias('Esc', 'Escape');
    keyMacro_ins('ContextMenu');
}

if (isIE) {
    keyCodeMacro('Finish', 0xf1);
} else if (isFirefox) {
    macro(
        'Finish',
        or(
            new CaseInsensitiveKeyMatcher('Katakana'),
            new CaseInsensitiveKeyMatcher('Finish')
        )
    );
}

keyMacro_ins('Execute');
keyMacro_ins('Find');
keyMacro_ins('Help');
keyMacro_ins('Pause');
keyMacro_ins('Play');
keyMacro_ins('Props');
keyMacro_ins('Select');
// Firefox didn't supports the 'ZoomIn' and 'ZoomOut' keys until Firefox 37
keyMacro_ins('ZoomIn');
keyMacro_ins('ZoomOut');

// Device keys
// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values#device_keys

keyMacro_ins('BrightnessDown');
keyMacro_ins('BrightnessUp');
keyMacro_ins('Eject');

if (isFirefox && versionLt('37')) {
    // Unsupported!
    macro('LogOff', () => {
        console.warn('Prior to Firefox 37, the "LogOff" is unsupported!');
        return false;
    });
} else {
    keyMacro_ins('LogOff');
}

// The Standby key is not supported by Internet Explorer (tested on release 9 and 11) and Firefox 36 and earlier,
// so it is reported as "Unidentified".
keyMacro_ins('Standby');

// Common IME keys

keyMacro_ins('AllCandidates');
keyMacro_ins('Alphanumeric');
keyMacro_ins('CodeInput');
macro(
    'Compose',
    or(
        new CaseInsensitiveKeyMatcher('Compose'),
        new CaseInsensitiveKeyMatcher('Multi')
    )
);
keyMacro_ins('Convert');
keyMacro_ins('Dead');
keyMacro_ins('FinalMode');
keyMacro_ins('GroupFirst');
keyMacro_ins('GroupLast');
keyMacro_ins('GroupNext');
keyMacro_ins('GroupPrevious');
keyMacro_ins('ModeChange');
keyMacro_ins('NextCandidate');
keyMacro_ins('NonConvert');
keyMacro_ins('PreviousCandidate');
keyMacro_ins('Process');
keyMacro_ins('SingleCandidate');

// Function keys
// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values#function_keys

Array(20)
    .fill(0)
    .forEach((_, i) => {
        keyMacro_ins('F' + (i + 1));
    });

keyMacro_ins('Soft1');
keyMacro_ins('Soft2');
keyMacro_ins('Soft3');
keyMacro_ins('Soft4');

const symbols = [
    '~',
    '`',
    '!',
    '@',
    '#',
    '$',
    '%',
    '%',
    '^',
    '&',
    '*',
    '(',
    ')',
    '_',
    '-',
    '+',
    '=',
    '|',
    '\\',
    // eslint-disable-next-line quotes
    "'",
    '"',
    ':',
    ';',
    ',',
    '<',
    '.',
    '>',
    '?',
    '/',
    '*'
];

symbols.forEach(it => keyMacro(it));

const alphabet = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z'
];
alphabet.forEach(it => keyMacro(it));
alphabet.map(it => it.toLowerCase()).forEach(it => keyMacro(it));

const digits = Array(10)
    .fill(0)
    .map((_, i) => i);
digits.forEach(it => {
    const digitMatcher = new KeyCodeMatcher(30 + it);
    const numpadMatcher = new KeyCodeMatcher(60 + it);
    macro(it + '', or(digitMatcher, numpadMatcher));
    macro('Digit' + it, digitMatcher);
    macro('Numpad' + it, numpadMatcher);
});
