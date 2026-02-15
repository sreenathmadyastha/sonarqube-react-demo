import { describe, it, expect } from "vitest";
import {
  isValidEmail,
  isStrongPassword,
  isValidUsername,
} from "../utils/validators";

describe("Validators", () => {
  describe("isValidEmail", () => {
    it("accepts valid emails", () => {
      expect(isValidEmail("user@example.com")).toBe(true);
      expect(isValidEmail("test.name@domain.org")).toBe(true);
    });

    it("rejects invalid emails", () => {
      expect(isValidEmail("")).toBe(false);
      expect(isValidEmail("notanemail")).toBe(false);
      expect(isValidEmail("@domain.com")).toBe(false);
      expect(isValidEmail("user@")).toBe(false);
      expect(isValidEmail("user @domain.com")).toBe(false);
    });
  });

  describe("isStrongPassword", () => {
    it("accepts a strong password", () => {
      const result = isStrongPassword("MyP@ssw0rd!");
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("rejects short passwords", () => {
      const result = isStrongPassword("Ab1!");
      expect(result.valid).toBe(false);
      expect(result.errors).toContain(
        "Password must be at least 8 characters"
      );
    });

    it("requires uppercase letters", () => {
      const result = isStrongPassword("myp@ssw0rd!");
      expect(result.valid).toBe(false);
      expect(result.errors).toContain(
        "Password must contain an uppercase letter"
      );
    });

    it("requires lowercase letters", () => {
      const result = isStrongPassword("MYP@SSW0RD!");
      expect(result.valid).toBe(false);
      expect(result.errors).toContain(
        "Password must contain a lowercase letter"
      );
    });

    it("requires numbers", () => {
      const result = isStrongPassword("MyP@ssword!");
      expect(result.valid).toBe(false);
      expect(result.errors).toContain("Password must contain a number");
    });

    it("requires special characters", () => {
      const result = isStrongPassword("MyPassw0rd");
      expect(result.valid).toBe(false);
      expect(result.errors).toContain(
        "Password must contain a special character (!@#$%^&*)"
      );
    });
  });

  describe("isValidUsername", () => {
    it("accepts valid usernames", () => {
      expect(isValidUsername("john_doe")).toBe(true);
      expect(isValidUsername("User123")).toBe(true);
    });

    it("rejects too short usernames", () => {
      expect(isValidUsername("ab")).toBe(false);
    });

    it("rejects too long usernames", () => {
      expect(isValidUsername("a".repeat(21))).toBe(false);
    });

    it("rejects usernames with special characters", () => {
      expect(isValidUsername("user@name")).toBe(false);
      expect(isValidUsername("user name")).toBe(false);
    });
  });
});
