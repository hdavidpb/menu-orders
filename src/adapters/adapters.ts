
import { ContentData, Product } from "../interfaces/interfaces";

export const createProductsAdapter = (data: ContentData): Product[] => {
  const [headers, ...products] = data.content;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let product: { [key: string]: any } = {
    count: 0,
    isSelected: false,
  };
  const productList = [];

  for (let i = 0; i < products.length; i++) {
    for (let prod = 0; prod < products[i].length; prod++) {
      product[headers[prod]] = products[i][prod];
    }
    productList.push(product);
    product = { count: 0, isSelected: false };
  }

  return productList as Product[];
};
