import { EventEmitter } from '../../../src/event/EventEmitter';

describe('event/EventEmitter', () => {
    describe('EventEmitter#emit', () => {
        it('can emit the function with value', () => {
            const e = new EventEmitter<string>();

            const listener = jest.fn();

            e.on('foo', listener);

            e.emit('foo', 'bar');

            expect(listener).toBeCalledWith('bar');
        });
        it('emits to all event listeners', () => {
            const e = new EventEmitter<void>();

            const listener1 = jest.fn();
            const listener2 = jest.fn();

            e.on('foo', listener1);
            e.on('foo', listener2);

            e.emit('foo');

            expect(listener1).toBeCalledTimes(1);
            expect(listener2).toBeCalledTimes(1);
        });
        it('should return false when there are not events to emit', () => {
            const e = new EventEmitter<void>();

            const listener = jest.fn();

            e.on('foo', listener);

            expect(e.emit('foo')).toBeTruthy();
            expect(e.emit('bar')).toBeFalsy();
            expect(listener).toBeCalledTimes(1);
        });
    });
    describe('EventEmitter#on', () => {
        it('should remove only the listeners by the returning callback function', () => {
            const e = new EventEmitter<void>();

            const listener = jest.fn();

            const removeListener = e.on('foo', listener);
            e.on('foo', listener);

            e.emit('foo');

            removeListener();

            e.emit('foo');

            expect(listener).toBeCalledTimes(3);
        });
    });
    describe('EventEmitter#clear', () => {
        it('just clear all events', () => {
            const e = new EventEmitter<void>();

            const listener = jest.fn(() => {
                throw new Error('oops');
            });

            e.on('foo', listener);
            e.on('bar', listener);
            e.on('baz', listener);

            e.clear();

            expect(e.emit('foo')).toBeFalsy();

            expect(e.emit('bar')).toBeFalsy();

            expect(e.emit('baz')).toBeFalsy();
        });
    });
});
