import { describe, it, expect } from "vitest";
import {
  formatCurrency,
  truncateText,
  capitalize,
  slugify,
} from "../utils/formatters";

describe("Formatters", () => {
  describe("formatCurrency", () => {
    it("formats USD by default", () => {
      expect(formatCurrency(1234.56)).toBe("$1,234.56");
    });

    it("formats zero", () => {
      expect(formatCurrency(0)).toBe("$0.00");
    });
  });

  describe("truncateText", () => {
    it("returns original text if under max length", () => {
      expect(truncateText("hello", 10)).toBe("hello");
    });

    it("truncates and adds ellipsis", () => {
      expect(truncateText("hello world", 5)).toBe("hello...");
    });

    it("handles exact length", () => {
      expect(truncateText("hello", 5)).toBe("hello");
    });
  });

  describe("capitalize", () => {
    it("capitalizes first letter", () => {
      expect(capitalize("hello")).toBe("Hello");
    });

    it("lowercases remaining letters", () => {
      expect(capitalize("hELLO")).toBe("Hello");
    });

    it("handles empty string", () => {
      expect(capitalize("")).toBe("");
    });
  });

  describe("slugify", () => {
    it("converts text to slug", () => {
      expect(slugify("Hello World")).toBe("hello-world");
    });

    it("removes special characters", () => {
      expect(slugify("Hello, World!")).toBe("hello-world");
    });

    it("trims leading/trailing hyphens", () => {
      expect(slugify(" -Hello- ")).toBe("hello");
    });

    it("replaces underscores with hyphens", () => {
      expect(slugify("hello_world")).toBe("hello-world");
    });
  });
});
