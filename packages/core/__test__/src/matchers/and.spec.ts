import { and } from '../../../src/matchers/and';
import { keydownEvent } from '../../mocks/mockKeyboardEvent';
describe('matchers/and', () => {
    const event = keydownEvent({
        ctrlKey: true
    });
    it('should return false if no matcher parameter passed in', () => {
        const matcher = and();
        expect(matcher(event)).toBeFalsy();
    });

    it('should and() method works correctly', () => {
        const matcher1 = jest.fn().mockReturnValue(true);
        const matcher2 = {
            match: jest.fn().mockReturnValue(false),
            str: () => ''
        };
        const match11 = and(matcher1, matcher1);
        const match12 = and(matcher1, matcher2);
        const match22 = and(matcher2, matcher2);
        expect(match11(event)).toBeTruthy();
        expect(match12(event)).toBeFalsy();
        expect(match22(event)).toBeFalsy();
    });
});
