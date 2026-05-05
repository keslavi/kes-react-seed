import { Test } from "./test-sample";

it("renders without crashing", () => {
  render(<Test />);
  expect(screen.getByText(/hello world/i)).toBeVisible(); 
});
