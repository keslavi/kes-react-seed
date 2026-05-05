// https://mui.com/material-ui/customization/theming/
// https://mui.com/material-ui/customization/theme-components/

import React from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider, alpha as muiAlpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Pull the raw theme primitives from formhelper-mui (built dist)
import {
  color,
  fontWeights,
  baseThemeOptions,
  StyledAccordionSummary as LibraryStyledAccordionSummary,
} from '@formhelper';

const componentOverrides = {
  MuiPaper: {
    styleOverrides: {
      root: {
        '& > .MuiButton-root': {
          marginRight: '1rem',
        },
      },
    },
  },
  MuiButtonBase: {
    styleOverrides: {
      root: {
        minWidth: '20px',
      },
    },
  },
  MuiButton: {
    defaultProps: {
      size: 'medium',
      variant: 'text',
      disableElevation: true,
    },
    styleOverrides: {
      root: {
        borderRadius: '40px',
        textTransform: 'none',
        fontWeight: 500,
        fontSize: '1.75rem',
        position: 'relative',
        boxSizing: 'border-box',
        border: '1px solid transparent',
        '&:hover': {
          color: color.cobe1.white,
          backgroundColor: color.cobe1.blue,
          borderColor: color.cobe1.blue,
          boxShadow: 'inset 0 0 0 1px white',
        },
      },
      outlined: {
        backgroundColor: 'transparent',
        borderColor: color.secondary.blue950,
      },
      text: {
        minWidth: 'auto',
      },
    },
    variants: [
      { props: { pageSize: 'small' }, style: { fontSize: '.75rem' } },
      { props: { pageSize: 'medium' }, style: { fontSize: '1rem' } },
      { props: { pageSize: 'large' }, style: { fontSize: '1.5rem' } },
    ],
  },
};

//this deep merge could be useful elsewhere.
const mergeComponents = (base = {}, overrides = {}) =>
  Object.entries(overrides).reduce((acc, [componentName, overrideConfig]) => {
    const baseConfig = acc[componentName] || {};
    acc[componentName] = {
      ...baseConfig,
      ...overrideConfig,
      styleOverrides: {
        ...(baseConfig.styleOverrides || {}),
        ...(overrideConfig.styleOverrides || {}),
        root: {
          ...(baseConfig.styleOverrides?.root || {}),
          ...(overrideConfig.styleOverrides?.root || {}),
        },
      },
    };
    return acc;
  }, { ...base });

// Re-export colors, fontWeights, and styled accordion so app code and components
// can keep using the same API surface as formhelper-mui.
export { color, fontWeights };
export const StyledAccordionSummary = LibraryStyledAccordionSummary;
//TIP: use ctrl-k + ctrl-0 to collapse all, then expand
export const theme = createTheme({
  ...baseThemeOptions,
  components: mergeComponents(baseThemeOptions?.components, componentOverrides),
});

// MUI v7 components expect theme.alpha to exist (added internally in 7.3+).
// Older createTheme versions used in the host app don't attach it, so polyfill it here.
if (typeof theme.alpha !== 'function') {
  theme.alpha = muiAlpha;
}

export const ThemeProvider = ({ children }) => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </MuiThemeProvider>
);
export default ThemeProvider;

