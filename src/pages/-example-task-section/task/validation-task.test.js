import { schema } from './validation-task.js';
import dayjs from 'dayjs';

describe('Task Validation - Date Validation', () => {
  test('should pass validation for valid date within range', async () => {
    const validData = {
      id: '1',
      subject: 'Test Subject',
      body: 'Test Body',
      dfrom: dayjs().subtract(1, 'year').toDate(),
      address: {
        line1: '123 Main St',
        line2: 'Apt 1',
        line3: 'City, State'
      }
    };

    try {
      await schema.validate(validData);
      expect(true).toBe(true); // Validation passed
    } catch (error) {
      fail(`Validation should have passed: ${error.message}`);
    }
  });

  test('should fail validation for future date', async () => {
    const invalidData = {
      id: '1',
      subject: 'Test Subject',
      body: 'Test Body',
      dfrom: dayjs().add(1, 'year').toDate(),
      address: {
        line1: '123 Main St',
        line2: 'Apt 1',
        line3: 'City, State'
      }
    };

    try {
      await schema.validate(invalidData);
      fail('Validation should have failed for future date');
    } catch (error) {
      expect(error.message).toContain('Date cannot be later than');
    }
  });

  test('should fail validation for date more than 125 years ago', async () => {
    const invalidData = {
      id: '1',
      subject: 'Test Subject',
      body: 'Test Body',
      dfrom: dayjs().subtract(126, 'year').toDate(),
      address: {
        line1: '123 Main St',
        line2: 'Apt 1',
        line3: 'City, State'
      }
    };

    try {
      await schema.validate(invalidData);
      fail('Validation should have failed for date more than 125 years ago');
    } catch (error) {
      expect(error.message).toContain('Date cannot be earlier than');
    }
  });

  test('should fail validation for missing required date', async () => {
    const invalidData = {
      id: '1',
      subject: 'Test Subject',
      body: 'Test Body',
      address: {
        line1: '123 Main St',
        line2: 'Apt 1',
        line3: 'City, State'
      }
    };

    try {
      await schema.validate(invalidData);
      fail('Validation should have failed for missing date');
    } catch (error) {
      expect(error.message).toContain('From date is required');
    }
  });
});
