import { ToastContainer } from 'react-toastify';

// Custom render function that includes ToastContainer
export const renderWithToast = (ui, options = {}) => {
  const result = render(
    <>
      {ui}
      <ToastContainer data-testid="toast-container" />
    </>,
    options
  );
  return result;
};

// Helper to wait for and find toast content
export const waitForToast = async (text, options = {}) => {
  return waitFor(() => {
    // Look for toast content within the ToastContainer
    const toast = screen.getByText(text);
    expect(toast).toBeInTheDocument();
    return toast;
  }, { timeout: 5000, ...options });
};

// Helper to find all toasts
export const getAllToasts = () => {
  // Look for elements with role="alert" which is how react-toastify marks toasts
  return screen.getAllByRole('alert');
};

// Helper to check if a specific toast exists
export const toastExists = (text) => {
  try {
    screen.getByText(text);
    return true;
  } catch {
    return false;
  }
};

// Helper to wait for toast to disappear
export const waitForToastToDisappear = async (text, options = {}) => {
  return waitFor(() => {
    try {
      screen.getByText(text);
      throw new Error('Toast still exists');
    } catch {
      return true; // Toast is gone
    }
  }, { timeout: 5000, ...options });
};

// Helper to get toast count
export const getToastCount = () => {
  return getAllToasts().length;
}; 