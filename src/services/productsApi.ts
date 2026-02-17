import axios from "axios";

export type Product = {
  id: number | string;
  [key: string]: unknown;
};

export const getProducts = async (): Promise<Product[]> => {
  const { data } = await axios.get<Product[]>(import.meta.env.VITE_URL);
  return data;
};
