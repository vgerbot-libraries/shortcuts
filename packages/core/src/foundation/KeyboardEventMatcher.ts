export interface KeyboardEventMatcher {
    match(event: KeyboardEvent): boolean;
    str(): string;
}
export interface KeyboardEventMatcherFn {
    (event: KeyboardEvent): boolean;
}
