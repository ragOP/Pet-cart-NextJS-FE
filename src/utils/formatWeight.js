/**
 * Formats weight based on the logic:
 * - If weight > 1000g, display in kg
 * - Otherwise, display in grams
 * @param {number} weightInGrams - Weight in grams
 * @returns {string} Formatted weight string
 */
export const formatWeight = (weightInGrams) => {
  if (!weightInGrams || weightInGrams <= 0) {
    return 'N/A';
  }
  
  if (weightInGrams >= 1000) {
    const weightInKg = weightInGrams / 1000;
    // If it's a whole number, don't show decimal places
    return weightInKg % 1 === 0 ? `${weightInKg}kg` : `${weightInKg.toFixed(1)}kg`;
  }
  
  return `${weightInGrams}g`;
};
