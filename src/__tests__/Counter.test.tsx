import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Counter } from "../components/Counter";

describe("Counter", () => {
  it("renders with default count of 0", () => {
    render(<Counter />);
    expect(screen.getByTestId("count-display")).toHaveTextContent("Count: 0");
  });

  it("renders with custom initial count", () => {
    render(<Counter initialCount={10} />);
    expect(screen.getByTestId("count-display")).toHaveTextContent("Count: 10");
  });

  it("increments the count", async () => {
    const user = userEvent.setup();
    render(<Counter />);

    await user.click(screen.getByLabelText("increment"));
    expect(screen.getByTestId("count-display")).toHaveTextContent("Count: 1");
  });

  it("decrements the count", async () => {
    const user = userEvent.setup();
    render(<Counter initialCount={5} />);

    await user.click(screen.getByLabelText("decrement"));
    expect(screen.getByTestId("count-display")).toHaveTextContent("Count: 4");
  });

  it("resets the count", async () => {
    const user = userEvent.setup();
    render(<Counter initialCount={5} />);

    await user.click(screen.getByLabelText("increment"));
    await user.click(screen.getByLabelText("reset"));
    expect(screen.getByTestId("count-display")).toHaveTextContent("Count: 5");
  });

  it("respects max boundary", async () => {
    const user = userEvent.setup();
    render(<Counter initialCount={9} max={10} />);

    await user.click(screen.getByLabelText("increment"));
    expect(screen.getByTestId("count-display")).toHaveTextContent("Count: 10");

    await user.click(screen.getByLabelText("increment"));
    expect(screen.getByTestId("count-display")).toHaveTextContent("Count: 10");
  });

  it("respects min boundary", async () => {
    const user = userEvent.setup();
    render(<Counter initialCount={1} min={0} />);

    await user.click(screen.getByLabelText("decrement"));
    expect(screen.getByTestId("count-display")).toHaveTextContent("Count: 0");

    await user.click(screen.getByLabelText("decrement"));
    expect(screen.getByTestId("count-display")).toHaveTextContent("Count: 0");
  });

  it("uses custom step", async () => {
    const user = userEvent.setup();
    render(<Counter step={5} />);

    await user.click(screen.getByLabelText("increment"));
    expect(screen.getByTestId("count-display")).toHaveTextContent("Count: 5");
  });
});
