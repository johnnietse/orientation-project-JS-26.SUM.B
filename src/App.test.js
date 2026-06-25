import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders resume builder sections", () => {
  render(<App />);
  const headings = screen.getAllByRole("heading", { level: 2 });
  const sectionNames = headings.map((h) => h.textContent);
  expect(sectionNames).toContain("Experience");
  expect(sectionNames).toContain("Education");
  expect(sectionNames).toContain("Skills");
});
