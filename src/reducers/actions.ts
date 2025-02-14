'use client'
import { ProductsInterface } from "@/providers/ProductsProvider";

export const getProductsAfterToAdd = (state:ProductsInterface,payload:{ name: string; image: string ,price:number}):ProductsInterface=>{
    const key = payload.name;
    if (state.productsInCart[key]) {
      return {
        ...state,productsInCart:{...state.productsInCart,[key]: { ...state.productsInCart[key], quantity: state.productsInCart[key].quantity + 1 }}
        ,
      };
    } else {
      return {
        ...state,
        productsInCart:{ ...state.productsInCart,[key]: { image: payload.image, quantity: 1 ,price:payload.price}}
       ,
      };
    }
}

export const getProductsAfterRemove = (state:ProductsInterface,payload:string):ProductsInterface=>{
    const name = payload as string;
    if (state.productsInCart[name].quantity > 1) {
      return {
        ...state,productsInCart:{...state.productsInCart,[name]: { ...state.productsInCart[name], quantity: state.productsInCart[name].quantity - 1 }},
      };
    } else {
        const newProducts = { ...state.productsInCart };
        delete newProducts[name];
       return {...state,productsInCart:newProducts}
    }
}

export const setFilters = (state:ProductsInterface,payload:string):ProductsInterface =>{
  const currentFilter = state.filterProduct;
  const selectedFilter =
    payload === currentFilter ? "" : payload;
  return { ...state, filterProduct: selectedFilter }
}

export const setFavorites = (state:ProductsInterface,payload:string):ProductsInterface =>{
  let copyFavorites = {...state.favoritesProducts}
  if(!copyFavorites[payload]){
    copyFavorites = {...copyFavorites,[payload]:payload}
  }else{
    delete copyFavorites[payload]
  }
  localStorage.setItem("favorites",JSON.stringify(copyFavorites))

  return { ...state,favoritesProducts:copyFavorites }
}