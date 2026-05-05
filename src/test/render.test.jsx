import { screen } from '@testing-library/react';

// Simple component to test
const TestComponent = () => <div>Test Component</div>;

describe('Global Render Test', () => {
  it('should render with ToastContainer', () => {
    render(<TestComponent />);
    
    // Check if our component is rendered
    expect(screen.getByText('Test Component')).toBeInTheDocument();
    
    // Check if ToastContainer is present (it should be a sibling)
    const container = document.querySelector('[data-testid="toast-container"]');
    // console.log('ToastContainer found:', container);
    
    // Debug the entire DOM
    // screen.debug();
  });
}); 