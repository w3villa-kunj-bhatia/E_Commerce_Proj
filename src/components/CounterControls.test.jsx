import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import CounterControls from "./CounterControls.jsx"; // adjust path if needed
import { increment, decrement, reset } from "../redux/counterSlice.js";

// Mock react-redux hooks
const mockUseDispatch = jest.fn();
const mockUseSelector = jest.fn();

jest.mock("react-redux", () => ({
  useDispatch: () => mockUseDispatch(),
  useSelector: (selectorFn) => mockUseSelector(selectorFn),
}));

// Mock CSS module so Jest does not complain about importing .module.css
jest.mock("../App.module.css", () => ({
  card: "card",
  btnRow: "btnRow",
}));

describe("CounterControls", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders current counter value from Redux store", () => {
    // Arrange: mock state returned by useSelector
    mockUseSelector.mockImplementation((selectorFn) =>
      selectorFn({ counter: { value: 5 } })
    );

    render(<CounterControls />);

    // Assert: text shows correct value
    expect(screen.getByText("Global Counter")).toBeInTheDocument();
    expect(screen.getByText("Current value: 5")).toBeInTheDocument();
  });

  test("dispatches decrement action when -1 button is clicked", () => {
    const dispatchMock = jest.fn();
    mockUseDispatch.mockReturnValue(dispatchMock);
    mockUseSelector.mockImplementation((selectorFn) =>
      selectorFn({ counter: { value: 10 } })
    );

    render(<CounterControls />);

    const decrementBtn = screen.getByRole("button", { name: "-1" });
    fireEvent.click(decrementBtn);

    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith(decrement());
  });

  test("dispatches reset action when Reset button is clicked", () => {
    const dispatchMock = jest.fn();
    mockUseDispatch.mockReturnValue(dispatchMock);
    mockUseSelector.mockImplementation((selectorFn) =>
      selectorFn({ counter: { value: 10 } })
    );

    render(<CounterControls />);

    const resetBtn = screen.getByRole("button", { name: "Reset" });
    fireEvent.click(resetBtn);

    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith(reset());
  });

  test("dispatches increment action when +1 button is clicked", () => {
    const dispatchMock = jest.fn();
    mockUseDispatch.mockReturnValue(dispatchMock);
    mockUseSelector.mockImplementation((selectorFn) =>
      selectorFn({ counter: { value: 10 } })
    );

    render(<CounterControls />);

    const incrementBtn = screen.getByRole("button", { name: "+1" });
    fireEvent.click(incrementBtn);

    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith(increment());
  });
});
