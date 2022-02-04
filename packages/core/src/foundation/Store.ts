export class Store<T> {
    private data?: T;
    private dispatched: boolean = false;
    private subscribers: Set<(value?: T) => void> = new Set();
    dispatch(data?: T) {
        this.dispatched = true;
        this.data = data;
        this.subscribers.forEach(it => it(this.data));
    }
    getData() {
        return this.data;
    }
    reset() {
        this.dispatched = false;
    }
    subscribe(callback: (value: T | undefined) => void) {
        this.subscribers.add(callback);
        if (this.dispatched) {
            callback(this.data);
        }
        return () => {
            this.subscribers.delete(callback);
        };
    }
}
