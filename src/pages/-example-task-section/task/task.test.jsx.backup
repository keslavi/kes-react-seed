import { Task } from './task';

// Mock react-router-dom to simulate URL parameters
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useParams: () => ({ id: '1' })
}));

describe('Task Component Integration Tests', () => {
  it('should mount', async () => {
    render(<Task />);
    expect(screen.getByText('loading...')).toBeInTheDocument();
  });

  it('should load data and display with option text on form', async () => {
    render(<Task />); //url: /dev/tasks/1 set in mockNavigate

    // First wait for loading to disappear and Task title to appear
    await waitFor(() => {
      expect(screen.getByText('Task')).toBeVisible();
    }, { timeout: 5000 });

    expect(screen.getByDisplayValue('DO NOT EDIT')).toBeInTheDocument();
    expect(screen.getByDisplayValue('in progress')).toBeInTheDocument();
  });

  it('should save task data', async () => {
    // Import the MSW spy
    const { mswTaskSpy } = await import('@/test/msw/mswTask');
    
    // Reset the spy before test
    mswTaskSpy.reset();
    
    render(<Task />);
    
    // Wait for form to load
    await waitFor(() => {
      expect(screen.getByDisplayValue('DO NOT EDIT')).toBeInTheDocument();
    });
    
    // Find and click the continue button
    const continueButton = screen.getByText('Continue');
    expect(continueButton).toBeInTheDocument();
    
    await userEvent.click(continueButton);
    
    // Verify the data that was sent to MSW
    expect(mswTaskSpy.postData).toHaveProperty('id');
    expect(mswTaskSpy.postData).toHaveProperty('subject');
    
    // Clean up
    mswTaskSpy.reset();
  });


  it('should show validation message for empty body and not call onSubmit', async () => {
    render(<Task />);
    let bodyInput = null;

    await waitFor(() => {
      expect(screen.getByDisplayValue('in progress')).toBeInTheDocument();
      bodyInput = screen.getByDisplayValue('USED FOR TESTING');
    }, { timeout: 5000 });
    
    
    // !IMPORTANT: for validation to work, you need to focus and blur
    await userEvent.click(bodyInput);
    await userEvent.clear(bodyInput);
    await userEvent.tab();

    expect(screen.getByText('please provide a body')).toBeInTheDocument();
    expect(screen.getByText('Continue')).toBeDisabled();

    // !IMPORTANT: for validation to work, you need to focus and blur
    await userEvent.click(bodyInput);
    await userEvent.type(bodyInput, 'USED FOR TESTING');
    await userEvent.tab();

    expect(screen.queryByText('please provide a body')).not.toBeInTheDocument();
    expect(screen.getByText('Continue')).not.toBeDisabled();

    //you've already tested on submit, no need to test here
  });

}); 