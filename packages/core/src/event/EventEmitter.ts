export type EventHandler<T> = (value: T) => void;

interface EventPair<T> {
    name: string;
    handler: EventHandler<T>;
}

export class EventEmitter<T> {
    private events: Array<EventPair<T>> = [];
    on(name: string, handler: EventHandler<T>) {
        const pair = {
            name,
            handler
        };
        this.events.push(pair);
        return () => {
            const index = this.events.indexOf(pair);
            if (index > -1) {
                this.events.splice(index, 1);
            }
        };
    }
    emit(name: string, value: T) {
        const handlers = this.events
            .filter(it => it.name === name)
            .map(it => it.handler);
        if (handlers.length === 0) {
            return false;
        }
        handlers.forEach(it => it(value));
        return true;
    }
    clear() {
        this.events = [];
    }
}
