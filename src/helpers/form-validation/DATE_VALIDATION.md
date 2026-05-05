# Date Validation

This document explains how to use the date validation functionality in the form validation system.

## Overview

The system includes a reusable date validation method that ensures:
- **Max date**: Cannot be in the future (must be less than present date)
- **Min date**: Cannot be earlier than 125 years ago (must be greater than January 1st of 125 years ago)

## Usage

### Using the `validDateRange` method

The `validDateRange` method accepts optional parameters:
- `min`: minimum allowed date (defaults to January 1st of 125 years ago)
- `max`: maximum allowed date (defaults to present date)
- `message`: custom error message (optional)

```javascript
import { yup } from '@/helpers/form-validation';
import dayjs from 'dayjs';

const schema = yup.object().shape({
  // Using defaults (125 years ago to present)
  birthDate: yup.date()
    .validDateRange()
    .required("Birth date is required"),
  
  // Using defaults with custom message
  startDate: yup.date()
    .validDateRange(null, null, "Start date must be within valid range")
    .required("Start date is required"),
  
  // Custom date range (18 years ago to present)
  adultDate: yup.date()
    .validDateRange(dayjs().subtract(18, 'year'), dayjs(), "Must be 18 or older")
    .required("Date is required"),
  
  // Custom date range with specific dates
  projectDate: yup.date()
    .validDateRange(dayjs('2020-01-01'), dayjs('2025-12-31'), "Project date must be between 2020-2025")
    .required("Project date is required"),
});
```

### Manual validation with dayjs

If you need custom date validation, you can also use dayjs directly:

```javascript
import { yup } from '@/helpers/form-validation';
import dayjs from 'dayjs';

const schema = yup.object().shape({
  customDate: yup.date()
    .max(dayjs(), "Date cannot be in the future")
    .min(dayjs().subtract(125, 'year').startOf('year'), "Date cannot be earlier than 125 years ago")
    .required("Date is required"),
});
```

## Validation Rules

1. **Future dates**: Automatically rejected with message "Date cannot be in the future"
2. **Dates earlier than minimum**: Automatically rejected with message showing the actual earliest allowed date (e.g., "Date cannot be earlier than 01/01/1899")
3. **Required validation**: Date field must be provided
4. **Date format**: Accepts any valid date format that dayjs can parse
5. **Custom ranges**: Can specify custom min/max dates when needed

## Examples

### Using defaults:
```javascript
yup.date().validDateRange() // January 1st of 125 years ago to present
```

### Custom age validation:
```javascript
yup.date().validDateRange(dayjs().subtract(18, 'year'), dayjs(), "Must be 18 or older")
```

### Business date range:
```javascript
yup.date().validDateRange(dayjs('2020-01-01'), dayjs('2025-12-31'), "Date must be in business period")
```

### Valid dates (with defaults):
- Today's date
- Yesterday
- 50 years ago
- 124 years ago

### Invalid dates (with defaults):
- Tomorrow (future date)
- Dates earlier than January 1st of 125 years ago (e.g., "Date cannot be earlier than 01/01/1899")
- Empty/null values (if required)

## Integration with Form Components

The date validation works seamlessly with the existing form components:

```jsx
import { Input } from '@/components/formhelper';
import dayjs from 'dayjs';

<Input 
  datepicker 
  name="dfrom" 
  label="From Date" 
  max={dayjs()}
  min={dayjs().subtract(125, 'year').startOf('year')}
/>
```

The `max` and `min` props on the datepicker component provide client-side validation, while the yup schema provides server-side validation.
