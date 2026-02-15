import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoList } from "../components/TodoList";

describe("TodoList", () => {
  it("renders with empty list", () => {
    render(<TodoList />);
    expect(screen.getByTestId("todo-summary")).toHaveTextContent(
      "0/0 completed"
    );
  });

  it("adds a todo item", async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    await user.type(screen.getByLabelText("todo input"), "Buy groceries");
    await user.click(screen.getByText("Add"));

    expect(screen.getByText("Buy groceries")).toBeInTheDocument();
    expect(screen.getByTestId("todo-summary")).toHaveTextContent(
      "0/1 completed"
    );
  });

  it("does not add empty todos", async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    await user.click(screen.getByText("Add"));
    expect(screen.getByTestId("todo-summary")).toHaveTextContent(
      "0/0 completed"
    );
  });

  it("does not add whitespace-only todos", async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    await user.type(screen.getByLabelText("todo input"), "   ");
    await user.click(screen.getByText("Add"));
    expect(screen.getByTestId("todo-summary")).toHaveTextContent(
      "0/0 completed"
    );
  });

  it("toggles a todo as completed", async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    await user.type(screen.getByLabelText("todo input"), "Task 1");
    await user.click(screen.getByText("Add"));

    await user.click(screen.getByRole("checkbox"));
    expect(screen.getByTestId("todo-summary")).toHaveTextContent(
      "1/1 completed"
    );
  });

  it("removes a todo", async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    await user.type(screen.getByLabelText("todo input"), "Task 1");
    await user.click(screen.getByText("Add"));

    await user.click(screen.getByLabelText("remove Task 1"));
    expect(screen.getByTestId("todo-summary")).toHaveTextContent(
      "0/0 completed"
    );
  });

  it("adds todo on Enter key", async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    await user.type(screen.getByLabelText("todo input"), "Task via Enter{enter}");
    expect(screen.getByText("Task via Enter")).toBeInTheDocument();
  });

  it("clears input after adding", async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    const input = screen.getByLabelText("todo input");
    await user.type(input, "New task");
    await user.click(screen.getByText("Add"));

    expect(input).toHaveValue("");
  });
});
