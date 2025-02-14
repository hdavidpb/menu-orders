"use client";

import { ProductsInterface } from "@/providers/ProductsProvider";
import { getProductsAfterRemove, getProductsAfterToAdd, setFavorites, setFilters } from "./actions";
import { Product } from "@/interfaces/interfaces";

export type IProductsCart = {
  [id: string]: { image: string; quantity: number };
};

export type ProductsCartAction =
  | { type: "GET_SERVER_PRODUCTS"; payload: Product[] }
  | {
      type: "ADD_PRODUCT";
      payload: { name: string; image: string };
    }
  | { type: "REMOVE_PRODUCT"; payload: string }
  | { type: "LOAD_CART"; payload: IProductsCart}
  | { type: "SELECTED_FILTER"; payload: string }
  | { type: "LOAD_FAVORITES"; payload: {[key:string]:string} }
  | { type: "TOOGLE_FAVORITES"; payload: string }

export const productReducer = (
  state: ProductsInterface,
  action: ProductsCartAction
): ProductsInterface => {
  switch (action.type) {
    case "GET_SERVER_PRODUCTS":
      return { ...state, products: action.payload };
    
    case "LOAD_CART":
      return {...state,productsInCart:action.payload}
    case "ADD_PRODUCT":
      return { ...getProductsAfterToAdd(state, action.payload) };
    case "REMOVE_PRODUCT":
      return { ...getProductsAfterRemove(state, action.payload) };
    case "SELECTED_FILTER":
      return { ...setFilters(state,action.payload) };
    case "LOAD_FAVORITES":
      return {...state,favoritesProducts:action.payload}
    case "TOOGLE_FAVORITES":
      return {...setFavorites(state,action.payload)}
    default:
      return state;
  }
};
