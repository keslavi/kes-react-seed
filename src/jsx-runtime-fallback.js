// JSX Runtime Fallback for React 19 compatibility
// This file provides fallback JSX functions when the standard runtime is blocked

import React from 'react';

// Fallback JSX runtime functions
export const jsx = (type, props, ...children) => {
  if (typeof type === 'string') {
    return React.createElement(type, props, ...children);
  }
  return React.createElement(type, props, ...children);
};

export const jsxs = (type, props, ...children) => {
  return jsx(type, props, ...children);
};

export const Fragment = React.Fragment;

// Export as default for compatibility
export default {
  jsx,
  jsxs,
  Fragment
}; 