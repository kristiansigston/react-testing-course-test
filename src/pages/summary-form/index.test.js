import { render, screen, fireEvent } from "@testing-library/react";
import SummaryForm from ".";
describe("summary form", () => {
  describe("initial conditions", () => {
    test("the checkbox should not be checked", () => {
      render(<SummaryForm />);
      const checkBox = screen.getByRole("checkbox", {
        name: /terms and conditions/i,
      });

      expect(checkBox).not.toBeChecked();
    });

    test("confirm button should be disabled", () => {
      render(<SummaryForm />);
      const confirmButton = screen.getByRole("button", /confirm order/i);

      expect(confirmButton).toBeDisabled();
    });
  });
  describe("clicking the button", () => {
    test("Enable button on first click", () => {
      render(<SummaryForm />);
      const checkBox = screen.getByRole("checkbox", {
        name: /terms and conditions/i,
        exact: false,
      });

      const confirmButton = screen.getByRole("button", {
        name: /confirm Order/i,
      });

      fireEvent.click(checkBox);
      expect(confirmButton).toBeEnabled();
    });

    test("Disable button on second click", () => {
      render(<SummaryForm />);
      const checkBox = screen.getByRole("checkbox", {
        name: /terms and conditions/i,
        exact: false,
      });

      const confirmButton = screen.getByRole("button", {
        name: /confirm order/i,
      });

      fireEvent.click(checkBox);
      fireEvent.click(checkBox);
      expect(confirmButton).toBeDisabled();
    });
  });
});
