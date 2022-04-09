import { Store } from '../../../src/foundation/Store';

describe('foundation/Store', () => {
    it('should subscriber function not be called before dispatch', () => {
        const store = new Store();
        const subscriber = jest.fn();
        store.subscribe(subscriber);

        expect(subscriber).not.toBeCalled();
    });

    it('should subscriber function be called after dispatch', () => {
        const store = new Store();
        const subscriber = jest.fn();
        store.subscribe(subscriber);

        store.dispatch('data');

        expect(subscriber).toBeCalledTimes(1);
        expect(subscriber).toBeCalledWith('data');
    });
    it('the subscriber function will be called when subscribe after dispatch data', () => {
        const store = new Store();
        store.dispatch('data');

        const subscriber = jest.fn();
        store.subscribe(subscriber);

        expect(subscriber).toBeCalledTimes(1);
        expect(subscriber).toBeCalledWith('data');

        store.subscribe(subscriber);
        expect(subscriber).toBeCalledTimes(2);
    });
    it('can unsubscribe', () => {
        const store = new Store();

        const subscriber = jest.fn();
        const unsubscriber = store.subscribe(subscriber);

        unsubscriber();

        store.dispatch('data');

        expect(subscriber).not.toBeCalled();
    });
    it('should subscriber function not be called after reset', () => {
        const store = new Store();
        store.dispatch('data');

        store.reset();

        const subscriber = jest.fn();
        store.subscribe(subscriber);

        expect(subscriber).not.toBeCalled();
    });
    it('can obtain the last dispatched data', () => {
        const store = new Store();
        store.dispatch('data');

        expect(store.getData()).toBe('data');
    });
});
