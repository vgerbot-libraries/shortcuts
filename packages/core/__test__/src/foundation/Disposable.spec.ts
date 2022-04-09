import { Disposable } from '../../../src/foundation/Disposable';

describe('foundation/Disposable', () => {
    it('should destructor function be called after the destroy method called', () => {
        const disposable = new Disposable();
        const destructor = jest.fn();
        disposable.record(destructor);

        disposable.destroy();

        expect(destructor).toBeCalled();
    });

    it('A documented destructor can be removed', () => {
        const disposable = new Disposable();
        const destructor = jest.fn();

        const remove = disposable.record(destructor);
        remove();

        disposable.destroy();

        expect(destructor).not.toBeCalled();
    });
});
