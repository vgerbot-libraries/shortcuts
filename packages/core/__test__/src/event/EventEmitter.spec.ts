import { EventEmitter } from '../../../src/event/EventEmitter';

describe('event/EventEmitter', () => {
    describe('EventEmitter#emit', () => {
        it('can emit the function with value', done => {
            const emitter = new EventEmitter<string>();
            emitter.on('foo', bar => {
                expect(bar).toBe('bar');
                done();
            });
            emitter.emit('foo', 'bar');
        });
        it('can emit the function with multiple listeners', () => {
            const e = new EventEmitter<void>();
            const list: string[] = [];
            e.on('foo', () => {
                list.push('bar1');
            });
            e.on('foo', () => {
                list.push('bar2');
            });
            e.emit('foo');
            expect(list).toEqual(['bar1', 'bar2']);
        });
    });
});
