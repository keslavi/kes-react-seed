import type { Preview } from '@storybook/react-vite';
import { ThemeProvider } from '../src/theme-material';
import '../src/scss/index.scss';

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ['Formhelper', ['Docs', '*'], 'Components', '*'],
      },
    },
  },
};

export default preview;
