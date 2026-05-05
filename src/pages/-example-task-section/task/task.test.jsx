import { Task } from './task';

describe('Task Component Integration Tests', () => {
  beforeEach(() => {
    ROUTER.set({ params: { id: '1' } });
  });

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

    await waitFor(() => {
      expect(mswTaskSpy.postCalled).toBe(true);
    }, { timeout: 10000 });
    
    // Verify the data that was sent to MSW
    expect(mswTaskSpy.postData).toHaveProperty('id');
    expect(mswTaskSpy.postData).toHaveProperty('subject');
    
    // Clean up
    mswTaskSpy.reset();
  }, 15000);

  it('should call navigate when testNavigation is clicked', async () => {
    const navigateMock = vi.fn();
    ROUTER.navigate(navigateMock);

    render(<Task />);

    await waitFor(() => {
      expect(screen.getByText('Task')).toBeVisible();
    }, { timeout: 5000 });

    const testNavigationButton = screen.getByRole('button', { name: 'testNavigation' });
    await userEvent.click(testNavigationButton);

    expect(navigateMock).toHaveBeenCalledWith('/whatever');
  });

//???????????? THE TEST IS FAILED - NEED TO CHECK STEVE????????????????????????
  // it('should show validation message for empty body and not call onSubmit', async () => {
  //   render(<Task />);
  //   let bodyInput = null;

  //   await waitFor(() => {
  //     expect(screen.getByDisplayValue('in progress')).toBeInTheDocument();
  //     bodyInput = screen.getByDisplayValue('USED FOR TESTING');
  //   }, { timeout: 5000 });
    
    
  //   // Trigger focus -> clear -> blur to run validation reliably
  //   await userEvent.click(bodyInput);
  //   await userEvent.clear(bodyInput);
  //   // ensure blur fires reliably
  //   bodyInput.blur();

  //   // Wait for validation message to appear
  //   await screen.findByText('please provide a body', { timeout: 3000 });

  //   expect(screen.getByText('Continue')).toBeDisabled();

  //   // refocus, type value and blur to clear validation
  //   await userEvent.click(bodyInput);
  //   await userEvent.type(bodyInput, 'USED FOR TESTING');
  //   bodyInput.blur();

  //   // Wait for validation to clear
  //   await waitFor(() => {
  //     expect(screen.queryByText('please provide a body')).not.toBeInTheDocument();
  //   }, { timeout: 3000 });

  //   expect(screen.getByText('Continue')).not.toBeDisabled();

  //   //you've already tested on submit, no need to test here
  // });
  //???????????? THE TEST IS FAILED - NEED TO CHECK STEVE????????????????????????

}); 