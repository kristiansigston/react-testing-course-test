import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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

      userEvent.click(checkBox);
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

      userEvent.click(checkBox);
      userEvent.click(checkBox);
      expect(confirmButton).toBeDisabled();
    });
  });
  describe("popover response to hover", () => {
    test("popover starts out hidden", () => {
      render(<SummaryForm />);
      const nullPoppover = screen.queryByText(
        /no ice cream will actually be delivered/i
      );

      expect(nullPoppover).not.toBeInTheDocument();
    });

    test("popover appears on hover", () => {
      render(<SummaryForm />);
      const termsAndConditions = screen.getByText(/terms and conditions/i, {
        exact: false,
      });
      userEvent.hover(termsAndConditions);

      const popover = screen.getByText(
        /no ice cream will actually be delivered/i,
        {
          exact: false,
        }
      );
      expect(popover).toBeInTheDocument();
    });

    test("popover dissapears on unhover", async () => {
      render(<SummaryForm />);
      const termsAndConditions = screen.getByText(/terms and conditions/i, {
        exact: false,
      });
      userEvent.hover(termsAndConditions);

      const popover = screen.getByText(
        /no ice cream will actually be delivered/i,
        {
          exact: false,
        }
      );
      expect(popover).toBeInTheDocument();

      userEvent.unhover(termsAndConditions);
      await waitForElementToBeRemoved(
        screen.queryByText(/no ice cream will actually be delivered/i, {
          exact: false,
        })
      );
    });
  });
});
