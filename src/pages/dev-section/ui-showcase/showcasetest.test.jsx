import { render, screen } from "@testing-library/react";
import { Showcase } from "./showcase";

it("renders without crashing", () => {
  render(<Showcase />);
  expect(screen.getByText(/ui showcase/i)).toBeVisible();
});
