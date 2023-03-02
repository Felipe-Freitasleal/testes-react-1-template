import { getByTestId, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoList from "../components/TodoList";

describe("ToDo List", () => {
  test("deve renderiza com título", () => {
    render(<TodoList />);
    // screen.debug()
    const title = screen.getByText(/todo list/i);
    expect(title).toBeInTheDocument();
  });

  test("o input deve iniciar vazio", () => {
    render(<TodoList />);
    // screen.debug()
    const input = screen.getByPlaceholderText(/Enter a todo/i);
    expect(input).toHaveValue("");
  });

  test("deve atualizar o valor do input ao ser digitado", async () => {
    const user = userEvent.setup();

    render(<TodoList />);
    // screen.debug()
    const input = screen.getByPlaceholderText(/Enter a todo/i);

    // interagir
    await user.type(input, "Revisar React");

    // assertiva acerca do valor do input
    expect(input).toHaveValue("Revisar React");
  });

  test("deve renderizar uma nova tarefa ao digitar no input e pressionar a tecla ENTER", async () => {
    const user = userEvent.setup();

    render(<TodoList />);
    const input = screen.getByPlaceholderText(/Enter a todo/i);

    // interagir
    await user.type(input, "Revisar React{enter}");

    // screen.logTestingPlaygroundURL()

    const item = screen.getByText("Revisar React");

    // assertiva acerca do valor do input
    expect(input).toHaveValue("");
    expect(item).toBeInTheDocument();
  });

  test("deve renderizar uma nova tarefa ao digitar no input e pressionar a tecla ENTER e ao apertar em toggle deve alterar a tarefa", async () => {
    const user = userEvent.setup();

    render(<TodoList />);
    const input = screen.getByPlaceholderText(/Enter a todo/i);

    // interagir
    await user.type(input, "Revisar React{enter}");

    const toggleBtn = screen.getByRole("button", {
      name: /toggle/i,
    });

    const item = screen.getByText("Revisar React");

    await user.click(toggleBtn);
    expect(item).toHaveStyle("text-decoration: line-through");

    await user.click(toggleBtn);
    expect(item).toHaveStyle("text-decoration: none");

    // screen.logTestingPlaygroundURL()
    // assertiva acerca do valor do input
    // expect(item).toBeInTheDocument()
  });
});
