"use client";

import { Product } from "@/interfaces/interfaces";
import { ProductContext } from "@/providers/ProductsProvider";
import { useContext, useMemo } from "react";

export const useGetProductsIncart = (products: Product[]) => {
  const { state } = useContext(ProductContext);

  const getOrderList = useMemo(() => {
    const orderList = products
      .map((product) => {
        if (state.productsInCart[product.nombre]) {
          return {
            ...product,
            count: state.productsInCart[product.nombre].quantity,
          };
        } else {
          return null;
        }
      })
      .filter((prod) => prod !== null);
    return orderList;
  }, [products, state.productsInCart]);

  const getTotal = useMemo(() => {
    const total = getOrderList.reduce((acc, value) => {
      acc += value.count * value.precio;
      return acc;
    }, 0);
    return total;
  }, [getOrderList]);

  return { getOrderList, getTotal };
};
