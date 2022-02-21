import { combine } from '../../../src/common/combine';

describe('common/combine', () => {
    it('should all combined function be called correctly', () => {
        const fn1 = jest.fn(() => {
            //
        });
        const fn2 = jest.fn(() => {
            //
        });
        const combined = combine(fn1, fn2);
        combined();
        expect(fn1).toBeCalled();
        expect(fn2).toBeCalled();
    });
    it('should all non-function items be ignored automatically', () => {
        function fn1() {
            //
        }
        const fn2 = jest.fn(function () {
            //
        });
        const combined = combine(fn1, null, fn2);
        combined();
        expect(fn2).toBeCalled();
    });
});
