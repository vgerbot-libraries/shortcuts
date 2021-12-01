import { BrowserInfo, detect } from 'detect-browser';

const browser = detect() as BrowserInfo;

export const isFirefox = browser.name === 'firefox';
export const isIE9 = browser.name === 'ie' && browser.version === '9';
export const isIE11 = browser.name === 'ie' && browser.version === '11';
export const isIE = browser.name === 'ie';
export const isEdge = browser.name === 'edge';
export const isChrome = browser.name === 'chrome';

export function versionIs(version: string): boolean {
    return browser.version === version + '';
}

export function versionLe(version: string): boolean {
    return compareVersion(browser.version, version) <= 1;
}

export function versionLt(version: string): boolean {
    return compareVersion(browser.version, version) < 1;
}

export function versionGt(version: string): boolean {
    return compareVersion(browser.version, version) > 1;
}

export function versionGe(version: string): boolean {
    return compareVersion(browser.version, version) >= 1;
}

function compareVersion(a: string, b: string) {
    if (a === b) {
        return 0;
    }
    const na = a.split('.').map(it => Number(it));
    const nb = b.split('.').map(it => Number(it));
    const len = Math.min(na.length, nb.length);
    for (let i = 0; i < len; i++) {
        if (na[i] > nb[i]) {
            return 1;
        } else if (na[i] < nb[i]) {
            return -1;
        }
    }
    return 0;
}
