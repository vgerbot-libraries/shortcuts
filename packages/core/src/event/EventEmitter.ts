export type EventHandler<T> = (value: T) => void;

export class EventEmitter<T> {
    private events: Record<string, Array<EventHandler<T>>> = {};
    on(name: string, handler: EventHandler<T>) {
        const handlers = this.events[name] || [];
        this.events[name] = handlers;
        handlers.push(handler);
        return () => {
            const index = handlers.indexOf(handler);
            if (index > 0) {
                handlers.splice(index, 1);
            }
        };
    }
    emit(name: string, value: T) {
        const handlers = this.events[name];
        if (!handlers) {
            return false;
        }
        handlers.forEach(it => it(value));
        return true;
    }
    clear() {
        this.events = {};
    }
}
