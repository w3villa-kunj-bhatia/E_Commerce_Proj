import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import LoginPage from "./LoginPage.jsx"; // adjust path if needed
import { setUserDataAndLogin } from "../redux/authSlice.js";

// Mocks
const mockDispatch = jest.fn();
const mockNavigate = jest.fn();

// Mock react-redux
jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
}));

// Mock react-router-dom
jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

// (Optional) mock CSS modules if you want, but your jest config already handles css
jest.mock("./LoginPage.module.css", () => ({}));
jest.mock("../App.module.css", () => ({}));

describe("LoginPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("submits form, dispatches login action and navigates to /dashboard", async () => {
    const user = userEvent.setup();

    render(<LoginPage />);

    // Fill form fields
    await user.type(screen.getByLabelText(/full name/i), "Kunj Bhatia");
    await user.type(screen.getByLabelText(/username/i), "kunj123");
    await user.type(screen.getByLabelText(/age/i), "22");
    await user.type(screen.getByLabelText(/email/i), "kunj@example.com");

    // Industry already defaults to "Tech", but if you want to change it:
    // await user.selectOptions(screen.getByLabelText(/industry/i), "Finance");

    // Submit the form
    await user.click(
      screen.getByRole("button", { name: /submit & login/i })
    );

    // Assert dispatch was called with correct action
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(
      setUserDataAndLogin({ username: "kunj123" })
    );

    // Assert navigation to /dashboard with replace: true
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/dashboard", {
      replace: true,
    });
  });
});
