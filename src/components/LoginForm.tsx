import { useState } from "react";
import { isValidEmail, isStrongPassword } from "../utils/validators";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: string[] = [];

    if (!isValidEmail(email)) {
      newErrors.push("Please enter a valid email address");
    }

    const passwordCheck = isStrongPassword(password);
    if (!passwordCheck.valid) {
      newErrors.push(...passwordCheck.errors);
    }

    setErrors(newErrors);

    if (newErrors.length === 0) {
      onSubmit(email, password);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {errors.length > 0 && (
        <ul data-testid="error-list" role="alert">
          {errors.map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </ul>
      )}
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}
