import { ActivationContextManager } from '../../../src/foundation/ActivationContextManager';

describe('foundation/ActivationContextManager', () => {
    it('can push and remove context', () => {
        const manager = new ActivationContextManager();
        const contextName = 'a';
        const remove = manager.push(contextName);
        expect(manager.indexOf(contextName)).toBeGreaterThan(-1);
        remove();
        expect(manager.indexOf(contextName)).toBe(-1);
    });
    it('should remove context correctly', () => {
        const manager = new ActivationContextManager();
        manager.push('a');
        const removeb = manager.push('b');
        manager.push('c');
        removeb();
        expect(manager.peak()).toBe('a');
    });
    it('should push and remove duplicate context correctly', () => {
        const manager = new ActivationContextManager();
        manager.push('a');
        manager.push('b');
        const removec1 = manager.push('c');
        manager.push('c');

        expect(manager.size()).toBe(4);
        expect(manager.peak()).toBe('c');

        removec1();

        expect(manager.peak()).toBe('b');
    });

    it('should pop context correctly', () => {
        const manager = new ActivationContextManager();

        manager.push('a');
        manager.push('b');
        manager.push('c');

        expect(manager.pop()).toBe('c');

        expect(manager.peak()).toBe('b');
    });

    it('can clear all contexts', () => {
        const manager = new ActivationContextManager();

        manager.push('a');
        manager.push('b');
        manager.push('c');

        expect(manager.size()).toBe(3);
        manager.clear();
        expect(manager.size()).toBe(0);
    });
});
