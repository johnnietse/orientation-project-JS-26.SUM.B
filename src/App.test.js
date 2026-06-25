import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Resume Builder heading", () => {
  render(<App />);
  const headingElement = screen.getByText(/Resume Builder/i);
  expect(headingElement).toBeInTheDocument();
});
