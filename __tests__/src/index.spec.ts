import { hello } from '../../src/index';

describe('test index.ts', ()=> {
    it('should hello method returns "world"', () => {
        expect(hello()).toBe('world');
    });
});
