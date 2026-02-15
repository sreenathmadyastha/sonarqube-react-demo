import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "../components/LoginForm";

describe("LoginForm", () => {
  const mockSubmit = vi.fn();

  it("renders the form fields", () => {
    render(<LoginForm onSubmit={mockSubmit} />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  it("shows error for invalid email", async () => {
    const user = userEvent.setup();
    render(<LoginForm onSubmit={mockSubmit} />);

    await user.type(screen.getByLabelText("Email"), "bad-email");
    await user.type(screen.getByLabelText("Password"), "MyP@ssw0rd!");
    await user.click(screen.getByRole("button", { name: "Login" }));

    expect(screen.getByTestId("error-list")).toBeInTheDocument();
    expect(
      screen.getByText("Please enter a valid email address")
    ).toBeInTheDocument();
  });

  it("shows error for weak password", async () => {
    const user = userEvent.setup();
    render(<LoginForm onSubmit={mockSubmit} />);

    await user.type(screen.getByLabelText("Email"), "user@example.com");
    await user.type(screen.getByLabelText("Password"), "weak");
    await user.click(screen.getByRole("button", { name: "Login" }));

    expect(screen.getByTestId("error-list")).toBeInTheDocument();
  });

  it("calls onSubmit with valid credentials", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<LoginForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText("Email"), "user@example.com");
    await user.type(screen.getByLabelText("Password"), "MyP@ssw0rd!");
    await user.click(screen.getByRole("button", { name: "Login" }));

    expect(onSubmit).toHaveBeenCalledWith("user@example.com", "MyP@ssw0rd!");
  });

  it("does not call onSubmit with invalid form data", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<LoginForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText("Email"), "invalid");
    await user.type(screen.getByLabelText("Password"), "weak");
    await user.click(screen.getByRole("button", { name: "Login" }));

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("clears errors on valid resubmission", async () => {
    const user = userEvent.setup();
    render(<LoginForm onSubmit={vi.fn()} />);

    // First submit with invalid data
    await user.type(screen.getByLabelText("Email"), "bad");
    await user.type(screen.getByLabelText("Password"), "x");
    await user.click(screen.getByRole("button", { name: "Login" }));
    expect(screen.getByTestId("error-list")).toBeInTheDocument();

    // Clear and submit with valid data
    await user.clear(screen.getByLabelText("Email"));
    await user.clear(screen.getByLabelText("Password"));
    await user.type(screen.getByLabelText("Email"), "user@example.com");
    await user.type(screen.getByLabelText("Password"), "MyP@ssw0rd!");
    await user.click(screen.getByRole("button", { name: "Login" }));

    expect(screen.queryByTestId("error-list")).not.toBeInTheDocument();
  });
});
