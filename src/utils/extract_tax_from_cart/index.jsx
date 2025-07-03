export const extractTaxFromCart = (items) => {
  let totalCGST = 0;
  let totalSGST = 0;
  let totalIGST = 0;
  let totalCESS = 0;

  for (const item of items || []) {
    const rate = item.productId?.hsnCode;
    if (rate) {
      const quantity = item.quantity;
      const unitPrice = item.discounted_price || item.price;

      totalCGST += (rate.cgst_rate / 100) * unitPrice * quantity;
      totalSGST += (rate.sgst_rate / 100) * unitPrice * quantity;
      totalIGST += (rate.igst_rate / 100) * unitPrice * quantity;
      totalCESS += (rate.cess / 100) * unitPrice * quantity;
    }
  }

  return {
    totalCGST: Math.round(totalCGST),
    totalSGST: Math.round(totalSGST),
    totalIGST: Math.round(totalIGST),
    totalCESS: Math.round(totalCESS),
  };
};
