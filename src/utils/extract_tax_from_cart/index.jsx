export const extractTaxFromCart = (items) => {
  let totalCGST = 0;
  let totalSGST = 0;
  let totalIGST = 0;
  let totalCESS = 0;

  for (const item of items || []) {
    const rate = item.productId?.hsnCode;
    if (rate) {
      const quantity = item.quantity;
      const unitPrice = item.discounted_price || item.productId?.salePrice;

      console.log(item.cgst, item.sgst, item.igst, item.cess);
      // totalCGST += (item.cgst || 0) / 100 * unitPrice * quantity;
      // totalSGST += (item.sgst || 0) / 100 * unitPrice * quantity;
      // totalIGST += (item.igst || 0) / 100 * unitPrice * quantity;
      // totalCESS += (item.cess || 0) / 100 * unitPrice * quantity;
    }
  }

  console.log(totalCGST, totalSGST, totalIGST, totalCESS);
  return {
    totalCGST: Math.round(totalCGST),
    totalSGST: Math.round(totalSGST),
    totalIGST: Math.round(totalIGST),
    totalCESS: Math.round(totalCESS),
  };
};
