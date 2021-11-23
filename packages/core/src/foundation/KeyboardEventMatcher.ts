export interface KeyboardEventMatcher {
    match(event: KeyboardEvent): boolean;
}
export interface KeyboardEventMatcherFn {
    (event: KeyboardEvent): boolean;
}
