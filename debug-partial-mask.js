// Debug script for createPartialMask function

// Utility functions for masking and formatting
const applyMask = (value, mask) => {
  if (!value || !mask) return value;
  
  // Remove all non-alphanumeric characters from input
  const cleanValue = value.replace(/[^a-zA-Z0-9]/g, '');
  let result = '';
  let valueIndex = 0;
  
  for (let i = 0; i < mask.length && valueIndex < cleanValue.length; i++) {
    const maskChar = mask[i];
    
    if (maskChar === '#') {
      // Only allow digits
      if (/\d/.test(cleanValue[valueIndex])) {
        result += cleanValue[valueIndex];
        valueIndex++;
      } else {
        break;
      }
    } else if (maskChar === 'A') {
      // Only allow letters
      if (/[a-zA-Z]/.test(cleanValue[valueIndex])) {
        result += cleanValue[valueIndex];
        valueIndex++;
      } else {
        break;
      }
    } else if (maskChar === '*') {
      // Allow any character
      result += cleanValue[valueIndex];
      valueIndex++;
    } else {
      // Static character from mask
      result += maskChar;
    }
  }
  
  return result;
};

// Function to create partial mask showing only last N characters
const createPartialMask = (value, maskPattern, showLast = 4) => {
  if (!value || !maskPattern) return value;
  
  // Apply the mask first to get the formatted value
  const formattedValue = applyMask(value, maskPattern);
  console.log(["mask"],'formattedValue:', formattedValue);
  
  if (formattedValue.length <= showLast) {
    return formattedValue; // If value is shorter than showLast, show all
  }
  
  // Count the actual characters (excluding mask characters)
  const actualChars = value.replace(/[^a-zA-Z0-9]/g, '');
  console.log(["mask"],'actualChars:', actualChars);
  
  if (actualChars.length <= showLast) {
    return formattedValue; // If actual characters are fewer than showLast, show all
  }
  
  // Create a mask pattern that shows asterisks for all but the last N characters
  let result = '';
  let actualCharIndex = 0;
  let lastChars = actualChars.slice(-showLast);
  let lastCharIndex = 0;
  
  console.log(["mask"],'lastChars:', lastChars);
  console.log(["mask"],'maskPattern:', maskPattern);
  console.log(["mask"],'actualChars.length:', actualChars.length);
  console.log(["mask"],'showLast:', showLast);
  console.log(["mask"],'actualChars.length - showLast:', actualChars.length - showLast);
  
  for (let i = 0; i < maskPattern.length; i++) {
    const maskChar = maskPattern[i];
    
    if (maskChar === '#' || maskChar === 'A' || maskChar === '*') {
      // This is a character position
      console.log(["mask"],`Position ${i}: maskChar=${maskChar}, actualCharIndex=${actualCharIndex}, condition=${actualCharIndex < actualChars.length - showLast}`);
      if (actualCharIndex < actualChars.length - showLast) {
        // Mask this character
        result += '*';
        console.log(["mask"],`  -> masked with *`);
      } else {
        // Show the actual character from the last N characters
        result += lastChars[lastCharIndex] || '*';
        console.log(["mask"],`  -> showing ${lastChars[lastCharIndex] || '*'}`);
        lastCharIndex++;
      }
      actualCharIndex++;
    } else {
      // Static character from mask
      result += maskChar;
      console.log(["mask"],`Position ${i}: static char ${maskChar} -> ${maskChar}`);
    }
  }
  
  return result;
};

// Test the failing case
const value = '12345678';
const maskPattern = '##-##-####';
const showLast = 3;

console.log(["mask"],'Input value:', value);
console.log(["mask"],'Mask pattern:', maskPattern);
console.log(["mask"],'Show last:', showLast);
console.log(["mask"],'---');

const result = createPartialMask(value, maskPattern, showLast);
console.log(["mask"],'---');
console.log(["mask"],'Result:', result);
console.log(["mask"],'Expected: **-**-678'); 