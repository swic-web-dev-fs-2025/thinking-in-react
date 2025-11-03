import { describe, expect, it } from "vitest";

import { generateEmptyProductMessage, parsePrice } from "./lib";

const TEST_PRODUCTS = [
  { name: "apple", price: "$2", category: "Fruits", stocked: true },
  { name: "banana", price: "$1.50", category: "Fruits", stocked: true },
  { name: "carrot", price: "$0.75", category: "Vegetables", stocked: true },
  { name: "lettuce", price: "$3", category: "Vegetables", stocked: false },
  { name: "basil", price: "$4.50", category: "Herbs", stocked: true },
];
const MAX_PRODUCT_PRICE = Math.max(
  ...TEST_PRODUCTS.map((p) => parsePrice(p.price))
); // $4.50

describe("parsePrice", () => {
  it("converts price strings to numbers", () => {
    expect(parsePrice("$5")).toBe(5);
    expect(parsePrice("$10")).toBe(10);
    expect(parsePrice("$1")).toBe(1);
  });
});

describe("generateEmptyProductMessage", () => {
  it("shows search term when only search filter active", () => {
    expect(
      generateEmptyProductMessage(
        "dragon",
        false,
        MAX_PRODUCT_PRICE,
        MAX_PRODUCT_PRICE
      )
    ).toBe('No products matching "dragon"');
  });

  it("shows stock status when only stock filter active", () => {
    expect(
      generateEmptyProductMessage(
        "",
        true,
        MAX_PRODUCT_PRICE,
        MAX_PRODUCT_PRICE
      )
    ).toBe("No products in stock");
  });

  it("shows price limit when only price filter active", () => {
    const INPUT_MAX_PRICE = 2;

    expect(
      generateEmptyProductMessage("", false, INPUT_MAX_PRICE, MAX_PRODUCT_PRICE)
    ).toBe(`No products under $${INPUT_MAX_PRICE}`);
  });

  it('combines two conditions with "and"', () => {
    expect(
      generateEmptyProductMessage(
        "apple",
        true,
        MAX_PRODUCT_PRICE,
        MAX_PRODUCT_PRICE
      )
    ).toBe('No products matching "apple" and in stock');
  });

  it('combines three conditions with commas and "and"', () => {
    expect(
      generateEmptyProductMessage("dragon", true, 2, MAX_PRODUCT_PRICE)
    ).toBe('No products matching "dragon", in stock and under $2');
  });
});
