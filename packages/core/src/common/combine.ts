export function combine(...fns: Array<unknown | (() => void)>) {
    return () => {
        fns.forEach(it => {
            if (typeof it === 'function') {
                it();
            }
        });
    };
}
