import axios from "axios";
import { IProduct } from "model/typescript";

export async function fetchProducts(): Promise<IProduct[]> {
  return await axios.get(`https://fakestoreapi.com/products`);
}
