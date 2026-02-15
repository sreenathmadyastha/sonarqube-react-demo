import { useState } from "react";

interface CounterProps {
  initialCount?: number;
  step?: number;
  min?: number;
  max?: number;
}

export function Counter({
  initialCount = 0,
  step = 1,
  min = -Infinity,
  max = Infinity,
}: CounterProps) {
  const [count, setCount] = useState(initialCount);

  const increment = () => {
    setCount((prev) => Math.min(prev + step, max));
  };

  const decrement = () => {
    setCount((prev) => Math.max(prev - step, min));
  };

  const reset = () => {
    setCount(initialCount);
  };

  return (
    <div>
      <h2>Counter</h2>
      <p data-testid="count-display">Count: {count}</p>
      <button onClick={decrement} aria-label="decrement">
        -
      </button>
      <button onClick={reset} aria-label="reset">
        Reset
      </button>
      <button onClick={increment} aria-label="increment">
        +
      </button>
    </div>
  );
}
