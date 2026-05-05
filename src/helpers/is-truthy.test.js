import { isTruthy, isFalsy } from './is-truthy';

describe('isTruthy and isFalsy behavior', () => {
  describe('isTruthy behavior', () => {
    test('truthy values', () => {
      expect(isTruthy(true)).toBe(true);
      expect(isTruthy('1')).toBe(true);
      expect(isTruthy('enabled')).toBe(true);
      expect(isTruthy('ok')).toBe(true);
      expect(isTruthy('on')).toBe(true);
      expect(isTruthy('true')).toBe(true);
      expect(isTruthy('yes')).toBe(true);
    });

    test('falsy values', () => {
      expect(isTruthy(false)).toBe(false);
      expect(isTruthy('0')).toBe(false);
      expect(isTruthy('disabled')).toBe(false);
      expect(isTruthy('off')).toBe(false);
      expect(isTruthy('false')).toBe(false);
      expect(isTruthy('no')).toBe(false);
      expect(isTruthy('')).toBe(false);
      expect(isTruthy(null)).toBe(false);
      expect(isTruthy(undefined)).toBe(false);
    });
  });

  describe('isFalsy behavior', () => {
    test('falsy values', () => {
      expect(isFalsy(false)).toBe(true);
      expect(isFalsy('0')).toBe(true);
      expect(isFalsy('disabled')).toBe(true);
      expect(isFalsy('')).toBe(true);
      expect(isFalsy(null)).toBe(true);
      expect(isFalsy(undefined)).toBe(true);
    });

    test('truthy values', () => {
      expect(isFalsy(true)).toBe(false);
      expect(isFalsy('1')).toBe(false);
      expect(isFalsy('enabled')).toBe(false);
    });
  });
}); 