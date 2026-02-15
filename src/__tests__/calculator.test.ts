import { describe, it, expect } from "vitest";
import { add, subtract, multiply, divide, percentage } from "../utils/calculator";

describe("Calculator", () => {
  describe("add", () => {
    it("adds two positive numbers", () => {
      expect(add(2, 3)).toBe(5);
    });

    it("adds negative numbers", () => {
      expect(add(-1, -2)).toBe(-3);
    });

    it("adds zero", () => {
      expect(add(5, 0)).toBe(5);
    });
  });

  describe("subtract", () => {
    it("subtracts two numbers", () => {
      expect(subtract(10, 4)).toBe(6);
    });

    it("returns negative when second is larger", () => {
      expect(subtract(3, 7)).toBe(-4);
    });
  });

  describe("multiply", () => {
    it("multiplies two numbers", () => {
      expect(multiply(3, 4)).toBe(12);
    });

    it("returns zero when multiplied by zero", () => {
      expect(multiply(5, 0)).toBe(0);
    });

    it("handles negative numbers", () => {
      expect(multiply(-3, 4)).toBe(-12);
    });
  });

  describe("divide", () => {
    it("divides two numbers", () => {
      expect(divide(10, 2)).toBe(5);
    });

    it("returns decimal results", () => {
      expect(divide(7, 2)).toBe(3.5);
    });

    it("throws on division by zero", () => {
      expect(() => divide(10, 0)).toThrow("Division by zero");
    });
  });

  describe("percentage", () => {
    it("calculates percentage", () => {
      expect(percentage(25, 100)).toBe(25);
    });

    it("returns 0 when total is 0", () => {
      expect(percentage(10, 0)).toBe(0);
    });

    it("handles values greater than total", () => {
      expect(percentage(150, 100)).toBe(150);
    });
  });
});
