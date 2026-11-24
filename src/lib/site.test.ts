import { describe, it, expect } from "vitest";
import { formatPrice, discountPercent, whatsappLink, telLink } from "./site";

describe("formatPrice", () => {
  it("formats rupees with Indian grouping and no decimals", () => {
    expect(formatPrice(12499)).toBe("₹12,499");
    expect(formatPrice(100000)).toBe("₹1,00,000");
    expect(formatPrice(0)).toBe("₹0");
  });
});

describe("discountPercent", () => {
  it("computes the rounded discount when MRP > price", () => {
    expect(discountPercent(18999, 12499)).toBe(34);
    expect(discountPercent(1999, 1499)).toBe(25);
  });
  it("returns null when there is no discount", () => {
    expect(discountPercent(1000, 1000)).toBeNull();
    expect(discountPercent(900, 1000)).toBeNull();
    expect(discountPercent(undefined, 1000)).toBeNull();
    expect(discountPercent(1000, undefined)).toBeNull();
  });
});

describe("whatsappLink", () => {
  it("builds a wa.me link with the stripped number and encoded message", () => {
    expect(whatsappLink("919876543210", "Hi there")).toBe(
      "https://wa.me/919876543210?text=Hi%20there",
    );
  });
  it("strips non-digits from the number", () => {
    expect(whatsappLink("+91 98765 43210", "x")).toBe("https://wa.me/919876543210?text=x");
  });
  it("omits the number when not provided", () => {
    expect(whatsappLink(undefined, "x")).toBe("https://wa.me/?text=x");
  });
});

describe("telLink", () => {
  it("strips spaces and prefixes tel:", () => {
    expect(telLink("+91 98765 43210")).toBe("tel:+919876543210");
    expect(telLink(undefined)).toBe("tel:");
  });
});
