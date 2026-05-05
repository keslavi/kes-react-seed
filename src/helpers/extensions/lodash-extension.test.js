import { isEmpty } from './lodash-extension';

describe('customIsEmpty', () => {
  describe('legacy behavior mode', () => {
    test('should use lodash isEmpty when legacyBehavior is true', () => {
      expect(isEmpty(null, true)).toBe(true);
      expect(isEmpty(undefined, true)).toBe(true);
      expect(isEmpty('', true)).toBe(true);
      expect(isEmpty([], true)).toBe(true);
      expect(isEmpty({}, true)).toBe(true);
      expect(isEmpty('hello', true)).toBe(false);
      expect(isEmpty([1, 2], true)).toBe(false);
      expect(isEmpty({ a: 1 }, true)).toBe(false);
    });
  });

  describe('primitive types', () => {
    test('should return true for null and undefined', () => {
      expect(isEmpty(null)).toBe(true);
      expect(isEmpty(undefined)).toBe(true);
    });

    test('should return true for empty strings', () => {
      expect(isEmpty('')).toBe(true);
    });

    test('should return true for whitespace-only strings', () => {
      expect(isEmpty('   ')).toBe(true);
      expect(isEmpty('\t')).toBe(true);
      expect(isEmpty('\n')).toBe(true);
      expect(isEmpty('  \t  \n  ')).toBe(true);
    });

    test('should return false for non-empty strings', () => {
      expect(isEmpty('hello')).toBe(false);
      expect(isEmpty('  hello  ')).toBe(false);
      expect(isEmpty('0')).toBe(false);
    });
  });

  describe('objects - shallow empty', () => {
    test('should return true for empty objects', () => {
      expect(isEmpty({})).toBe(true);
    });

    test('should return false for objects with keys', () => {
      expect(isEmpty({ a: 1 })).toBe(false);
      expect(isEmpty({ a: 0 })).toBe(false);
      expect(isEmpty({ a: null })).toBe(false);
      expect(isEmpty({ a: undefined })).toBe(false);
    });
  });

  describe('objects - recursive empty checking', () => {
    test('should return true for objects with only empty values', () => {
      expect(isEmpty({ a: {} })).toBe(true);
      expect(isEmpty({ a: {}, b: [] })).toBe(true);
      expect(isEmpty({ a: '', b: '   ' })).toBe(true);
      expect(isEmpty({ a: null, b: undefined })).toBe(true);
    });

    test('should return true for deeply nested empty objects', () => {
      expect(isEmpty({ a: { b: { c: {} } } })).toBe(true);
      expect(isEmpty({ a: { b: [], c: { d: '' } } })).toBe(true);
      expect(isEmpty({ x: { y: { z: null } } })).toBe(true);
    });

    test('should return false for objects with any non-empty value', () => {
      expect(isEmpty({ a: {}, b: 'value' })).toBe(false);
      expect(isEmpty({ a: { b: 'nested' } })).toBe(false);
      expect(isEmpty({ a: null, b: 1 })).toBe(false);
      expect(isEmpty({ a: { b: { c: 'deep' } } })).toBe(false);
    });

    test('should handle mixed empty and non-empty nested structures', () => {
      expect(isEmpty({ a: {}, b: { c: {} }, d: '' })).toBe(true);
      expect(isEmpty({ a: {}, b: { c: { d: 'value' } } })).toBe(false);
    });
  });

  describe('arrays - shallow empty', () => {
    test('should return true for empty arrays', () => {
      expect(isEmpty([])).toBe(true);
    });

    test('should return false for arrays with values', () => {
      expect(isEmpty([1])).toBe(false);
      expect(isEmpty([0])).toBe(false);
      expect(isEmpty([null])).toBe(false);
      expect(isEmpty([undefined])).toBe(false);
    });
  });

  describe('arrays - recursive empty checking', () => {
    test('should return true for arrays with only empty values', () => {
      expect(isEmpty([[], {}])).toBe(true);
      expect(isEmpty(['', '   '])).toBe(true);
      expect(isEmpty([null, undefined])).toBe(true);
      expect(isEmpty([{}, [], '', null])).toBe(true);
    });

    test('should return true for deeply nested empty arrays', () => {
      expect(isEmpty([[[]]])).toBe(true);
      expect(isEmpty([[[]], { a: {} }])).toBe(true);
      expect(isEmpty([{ a: { b: [] } }])).toBe(true);
    });

    test('should return false for arrays with any non-empty value', () => {
      expect(isEmpty([[], 'value'])).toBe(false);
      expect(isEmpty([{}, { a: 1 }])).toBe(false);
      expect(isEmpty([null, undefined, 0])).toBe(false);
      expect(isEmpty([[[[]]], 'deep'])).toBe(false);
    });
  });

  describe('complex nested structures', () => {
    test('should handle deeply nested mixed structures', () => {
      const complexEmpty = {
        level1: {
          level2: {
            arr: [[], {}, ''],
            obj: { nested: null },
          },
        },
        other: [],
      };
      expect(isEmpty(complexEmpty)).toBe(true);
    });

    test('should detect non-empty values in complex structures', () => {
      const complexNonEmpty = {
        level1: {
          level2: {
            arr: [[], {}, ''],
            obj: { nested: 'value' }, // This makes it non-empty
          },
        },
        other: [],
      };
      expect(isEmpty(complexNonEmpty)).toBe(false);
    });

    test('should handle arrays of objects with nested arrays', () => {
      expect(isEmpty([{ a: [{ b: [] }] }])).toBe(true);
      expect(isEmpty([{ a: [{ b: [1] }] }])).toBe(false);
    });
  });

  describe('edge cases', () => {
    test('should handle objects with null prototype', () => {
      const obj = Object.create(null);
      expect(isEmpty(obj)).toBe(true);
    });

    test('should not be affected by Object prototype pollution', () => {
      const obj = { constructor: {}, __proto__: {} };
      expect(isEmpty(obj)).toBe(true);
    });

    test('should handle circular references gracefully', () => {
      const circular = { a: {} };
      circular.b = circular;
      // This should not cause infinite recursion
      // Note: This test may need adjustment based on desired behavior
      expect(() => isEmpty(circular)).not.toThrow();
    });
  });

  describe('non-empty primitives', () => {
    test('should return false for numbers', () => {
      expect(isEmpty(0)).toBe(false);
      expect(isEmpty(1)).toBe(false);
      expect(isEmpty(-1)).toBe(false);
      expect(isEmpty(NaN)).toBe(false);
    });

    test('should return false for booleans', () => {
      expect(isEmpty(false)).toBe(false);
      expect(isEmpty(true)).toBe(false);
    });

    test('should return false for functions', () => {
      expect(isEmpty(() => {})).toBe(false);
      expect(isEmpty(function() {})).toBe(false);
    });

    test('should return false for symbols', () => {
      expect(isEmpty(Symbol())).toBe(false);
      expect(isEmpty(Symbol('test'))).toBe(false);
    });

    test('should return false for dates', () => {
      expect(isEmpty(new Date())).toBe(false);
    });

    test('should return false for regex', () => {
      expect(isEmpty(/test/)).toBe(false);
    });
  });

  describe('real-world use cases', () => {
    test('should validate form data - all empty', () => {
      const formData = {
        firstName: '',
        lastName: '   ',
        address: {
          street: '',
          city: '',
        },
        phoneNumbers: [],
      };
      expect(isEmpty(formData)).toBe(true);
    });

    test('should validate form data - partially filled', () => {
      const formData = {
        firstName: 'John',
        lastName: '',
        address: {
          street: '',
          city: '',
        },
        phoneNumbers: [],
      };
      expect(isEmpty(formData)).toBe(false);
    });

    test('should validate nested form sections', () => {
      const emptySection = {
        contacts: [],
        notes: '',
        metadata: {},
      };
      expect(isEmpty(emptySection)).toBe(true);

      const filledSection = {
        contacts: [],
        notes: 'Important note',
        metadata: {},
      };
      expect(isEmpty(filledSection)).toBe(false);
    });
  });
});

