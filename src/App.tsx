import { Counter } from "./components/Counter";
import { TodoList } from "./components/TodoList";
import { LoginForm } from "./components/LoginForm";

function App() {
  const handleLogin = (email: string, password: string) => {
    console.log("Login attempted:", { email, password });
  };

  return (
    <div>
      <h1>SonarQube React Demo</h1>
      <Counter />
      <hr />
      <TodoList />
      <hr />
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
}

export default App;
