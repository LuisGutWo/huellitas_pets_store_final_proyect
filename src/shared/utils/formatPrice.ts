export const formatPrice = (price: number | undefined): string => {
  if (price === undefined || price === null || isNaN(price)) {
    return "0";
  }
  return price.toLocaleString("de-CL");
};
