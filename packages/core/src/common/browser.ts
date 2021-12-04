import browserDetect from 'browser-detect';
import { BrowserDetectInfo } from 'browser-detect/dist/types/browser-detect.interface';

const browser = browserDetect() as BrowserDetectInfo;

export const isFirefox = browser.name === 'firefox';
export const isIE9 = browser.name === 'ie' && browser.versionNumber === 9;
export const isIE11 = browser.name === 'ie' && browser.versionNumber === 11;
export const isIE = browser.name === 'ie';
export const isEdge = browser.name === 'edge';
export const isChrome = browser.name === 'chrome';

export function versionIs(version: string): boolean {
    return browser.version === version + '';
}

export function versionLe(version: string): boolean {
    if (browser.versionNumber === undefined) {
        return false;
    }
    return compareVersion(browser.versionNumber, version) <= 1;
}

export function versionLt(version: string): boolean {
    if (browser.versionNumber === undefined) {
        return false;
    }
    return compareVersion(browser.versionNumber, version) < 1;
}

export function versionGt(version: string): boolean {
    if (browser.versionNumber === undefined) {
        return false;
    }
    return compareVersion(browser.versionNumber, version) > 1;
}

export function versionGe(version: string): boolean {
    if (browser.versionNumber === undefined) {
        return false;
    }
    return compareVersion(browser.versionNumber, version) >= 1;
}

function compareVersion(a: number, b: string) {
    const n = Number(b.replace(/\./g, ''));
    return a > n ? 2 : a === n ? 0 : -1;
}
