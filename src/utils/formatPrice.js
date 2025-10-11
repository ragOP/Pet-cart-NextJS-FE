/**
 * Format price with Indian number formatting (commas)
 * Examples:
 * 100 -> 100
 * 1000 -> 1,000
 * 10000 -> 10,000
 * 100000 -> 1,00,000
 * 1000000 -> 10,00,000
 */
export const formatPrice = (price) => {
  if (price === null || price === undefined || isNaN(price)) {
    return '0';
  }

  // Convert to string and handle decimal places
  const priceStr = Number(price).toFixed(2);
  const [integerPart, decimalPart] = priceStr.split('.');

  // Indian number formatting: last 3 digits, then groups of 2
  let formatted = '';
  let count = 0;

  // Process from right to left
  for (let i = integerPart.length - 1; i >= 0; i--) {
    if (count === 3 || (count > 3 && (count - 3) % 2 === 0)) {
      formatted = ',' + formatted;
    }
    formatted = integerPart[i] + formatted;
    count++;
  }

  // Remove trailing zeros from decimal part
  const cleanDecimal = decimalPart.replace(/0+$/, '');
  
  // Return with or without decimal part
  return cleanDecimal ? `${formatted}.${cleanDecimal}` : formatted;
};

/**
 * Format price with currency symbol
 * @param {number} price - The price to format
 * @param {string} currency - Currency symbol (default: ₹)
 * @returns {string} Formatted price with currency
 */
export const formatPriceWithCurrency = (price, currency = '₹') => {
  return `${currency}${formatPrice(price)}`;
};

