const clp = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});

const plain = new Intl.NumberFormat("es-CL", { maximumFractionDigits: 0 });

/** "$22.900" — el peso chileno no usa decimales. */
export const formatPrice = (value: number): string => clp.format(value);

/** "22.900" sin símbolo, para cuando el signo se compone aparte. */
export const formatAmount = (value: number): string => plain.format(value);

export const formatUnits = (count: number): string =>
  `${count} ${count === 1 ? "unidad" : "unidades"}`;
