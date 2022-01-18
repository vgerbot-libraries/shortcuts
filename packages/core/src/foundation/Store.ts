export class Store<T> {
    private data?: T;
    private subscribers: Set<(value?: T) => void> = new Set();
    dispatch(data?: T) {
        this.data = data;
        this.subscribers.forEach(it => it(this.data));
    }
    getData() {
        return this.data;
    }
    subscribe(callback: (value: T | undefined) => void) {
        this.subscribers.add(callback);
        callback(this.data);
        return () => {
            this.subscribers.delete(callback);
        };
    }
}
