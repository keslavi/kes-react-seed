import { toast } from 'react-toastify';
import { useState } from 'react';

// Import toast testing utilities
import { 
  renderWithToast,
  waitForToast, 
  getAllToasts, 
  toastExists, 
  waitForToastToDisappear, 
  getToastCount 
} from './toast-testing-extension.jsx';

// Example component that shows toasts
const ToastExample = () => {
  const showSuccessToast = () => {
    toast.success('Operation completed successfully!');
  };

  const showErrorToast = () => {
    toast.error('Something went wrong!');
  };

  const showInfoToast = () => {
    toast.info('Here is some information');
  };

  return (
    <div>
      <button onClick={showSuccessToast}>Show Success</button>
      <button onClick={showErrorToast}>Show Error</button>
      <button onClick={showInfoToast}>Show Info</button>
    </div>
  );
};
//xx
describe('Toast Testing Examples', () => {
  it('should show success toast when button is clicked', async () => {
    // Now render automatically includes ToastContainer
    renderWithToast(<ToastExample />);
    
    const successButton = screen.getByText('Show Success');
    await act(async () => {
      await userEvent.click(successButton);
    });
    
    // screen.debug();
    // Wait for and verify the toast content
    await waitForToast('Operation completed successfully!');
    
    // You can also check if the toast exists
    expect(toastExists('Operation completed successfully!')).toBe(true);
  });

  /*
  it('should show error toast when error button is clicked', async () => {
    render(<ToastExample />);
    
    const errorButton = screen.getByText('Show Error');
    await userEvent.click(errorButton);
    
    // Wait for the error toast
    await waitForToast('Something went wrong!');
    
    // Verify the toast is visible
    expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
  });

  it('should show multiple toasts', async () => {
    render(<ToastExample />);
    
    // Click multiple buttons to show different toasts
    await userEvent.click(screen.getByText('Show Success'));
    await userEvent.click(screen.getByText('Show Info'));
    
    // Wait for both toasts
    await waitForToast('Operation completed successfully!');
    await waitForToast('Here is some information');
    
    // Check that both toasts are visible
    expect(screen.getByText('Operation completed successfully!')).toBeInTheDocument();
    expect(screen.getByText('Here is some information')).toBeInTheDocument();
  });

  it('should find all toasts on the page', async () => {
    render(<ToastExample />);
    
    // Show a toast
    await userEvent.click(screen.getByText('Show Success'));
    await waitForToast('Operation completed successfully!');
    
    // Get all toasts (they have role="alert")
    const allToasts = getAllToasts();
    expect(allToasts).toHaveLength(1);
    
    // Show another toast
    await userEvent.click(screen.getByText('Show Error'));
    await waitForToast('Something went wrong!');
    
    // Now there should be 2 toasts
    const updatedToasts = getAllToasts();
    expect(updatedToasts).toHaveLength(2);
  });

  it('should test toast with custom timeout', async () => {
    render(<ToastExample />);
    
    await userEvent.click(screen.getByText('Show Success'));
    
    // Use custom timeout for the toast
    await waitForToast('Operation completed successfully!', { timeout: 10000 });
    
    expect(screen.getByText('Operation completed successfully!')).toBeInTheDocument();
  });
  */
});

/*
// Example of testing a component that shows validation errors via toast
const FormWithValidation = () => {
  const [errors, setErrors] = useState({});
  
  const validateForm = () => {
    const newErrors = {
      name: 'Name is required',
      email: 'Email is invalid'
    };
    setErrors(newErrors);
    
    // Show errors as toasts
    Object.values(newErrors).forEach(error => {
      toast.warn(error);
    });
  };

  return (
    <div>
      <button onClick={validateForm}>Validate Form</button>
      {errors.name && <div>Name Error: {errors.name}</div>}
      {errors.email && <div>Email Error: {errors.email}</div>}
    </div>
  );
};

describe('Form Validation with Toast', () => {
  it('should show validation error toasts', async () => {
    render(<FormWithValidation />);
    
    const validateButton = screen.getByText('Validate Form');
    await userEvent.click(validateButton);
    
    // Wait for both validation error toasts
    await waitForToast('Name is required');
    await waitForToast('Email is invalid');
    
    // Verify both toasts are visible
    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Email is invalid')).toBeInTheDocument();
  });
});
*/ 