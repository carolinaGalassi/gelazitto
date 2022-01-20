export const  priceFormat = price => {
  if (!price) return "$0";
  return `$${price}`;
}