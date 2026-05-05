import { Tasks } from "./tasks";
import {MemoryRouter} from "react-router-dom";

describe("Tasks Component", () => {
  it("should display data with options", async () => {
    render(<MemoryRouter><Tasks /></MemoryRouter>);

    
    await waitFor(() => {
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    // Since we're using MSW, the actual API call will be intercepted
    await waitFor(() => {
      expect(screen.getByText("Tasks")).toBeInTheDocument();
    });

    const task1Link = screen.getByRole("link", { name: "1" });
    expect(task1Link).toBeInTheDocument();
    expect(task1Link).toHaveAttribute("href", "/dev/tasks/1");
    
    // Check that row 1 (ID=1) shows "in progress" status
    const task1Row = task1Link.closest('tr');
    expect(task1Row).toBeInTheDocument();
    
    // Get the status cell (4th column) for task ID 1
    const statusCell = task1Row.querySelector('td:nth-child(4)');
    expect(statusCell).toBeInTheDocument();
    
    // Verify that row 1 shows "in progress" status
    expect(statusCell).toHaveTextContent('in progress');
  });
});
