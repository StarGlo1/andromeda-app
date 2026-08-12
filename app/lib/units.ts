// Shared unit conversion – used by both server and client components

export function convertToPricingUnit(
  quantity: number,
  recipeUnit: string,
  materialUnit: string | null
): number {
  if (!materialUnit) return quantity;

  const from = recipeUnit.toLowerCase();
  let to = materialUnit.toLowerCase();

  // Normalise common plural / variant abbreviations
  if (to === "lbs" || to === "pounds") to = "lb";
  if (to === "ozs" || to === "ounces") to = "oz";
  if (to === "grams" || to === "gram") to = "g";
  if (to === "kgs" || to === "kilograms") to = "kg";

  if (from === to) return quantity;

  if (from === "oz" && to === "lb") return quantity / 16;
  if (from === "oz" && to === "g") return quantity * 28.3495;
  if (from === "g" && to === "oz") return quantity / 28.3495;
  if (from === "g" && to === "lb") return quantity / 453.592;
  if (from === "lb" && to === "oz") return quantity * 16;
  if (from === "lb" && to === "g") return quantity * 453.592;

  return quantity;
}