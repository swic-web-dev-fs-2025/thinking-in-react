import { describe, expect, it } from "vitest";

import { generateEmptyProductMessage, parsePrice } from "./lib";

describe("parsePrice", () => {
  it("converts price strings to numbers", () => {
    expect(parsePrice("$5")).toBe(5);
    expect(parsePrice("$10")).toBe(10);
    expect(parsePrice("$1")).toBe(1);
  });
});

describe("generateEmptyProductMessage", () => {
  const MAX_PRICE = 5;

  it("returns generic message when no filters active", () => {
    expect(generateEmptyProductMessage("", false, MAX_PRICE, MAX_PRICE)).toBe(
      "No products found"
    );
  });

  it("shows search term when only search filter active", () => {
    expect(
      generateEmptyProductMessage("apple", false, MAX_PRICE, MAX_PRICE)
    ).toBe('No products matching "apple"');
  });

  it("shows stock status when only stock filter active", () => {
    expect(generateEmptyProductMessage("", true, MAX_PRICE, MAX_PRICE)).toBe(
      "No products in stock"
    );
  });

  it("shows price limit when only price filter active", () => {
    expect(generateEmptyProductMessage("", false, 3, MAX_PRICE)).toBe(
      "No products under $3"
    );
  });

  it('combines two conditions with "and"', () => {
    expect(
      generateEmptyProductMessage("apple", true, MAX_PRICE, MAX_PRICE)
    ).toBe('No products matching "apple" and in stock');
  });

  it('combines three conditions with commas and "and"', () => {
    expect(generateEmptyProductMessage("dragon", true, 2, MAX_PRICE)).toBe(
      'No products matching "dragon", in stock and under $2'
    );
  });
});
