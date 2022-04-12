import { or } from '../../../src/matchers/or';
import { keydownEvent } from '../../mocks/mockKeyboardEvent';
describe('matchers/or', () => {
    const event = keydownEvent({
        ctrlKey: true
    });
    it('should return false if no matcher parameter passed in', () => {
        const matcher = or();
        expect(matcher(event)).toBeFalsy();
    });

    it('should or() method works correctly', () => {
        const matcher1 = jest.fn().mockReturnValue(true);
        const matcher2 = {
            match: jest.fn().mockReturnValue(false),
            str: () => ''
        };
        const match11 = or(matcher1, matcher1);
        const match12 = or(matcher1, matcher2);
        const match21 = or(matcher2, matcher1);
        const match22 = or(matcher2, matcher2);
        expect(match11(event)).toBeTruthy();
        expect(match12(event)).toBeTruthy();
        expect(match21(event)).toBeTruthy();
        expect(match22(event)).toBeFalsy();
    });
});
