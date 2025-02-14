'use client'

import { Product } from '@/interfaces/interfaces';
import { IProductsCart, ProductsCartAction, productReducer } from '@/reducers/productsReducer';

import React ,{ActionDispatch, createContext, useEffect, useReducer} from 'react'

export interface ProductsInterface {
  products:Product[];
  productsInCart:IProductsCart;
  favoritesProducts:{[key:string]:string};
  filterProduct:string;
}

interface IContext {
    state:ProductsInterface
    dispatch:ActionDispatch<[action: ProductsCartAction]>
}

const initialSatate:ProductsInterface = {
  productsInCart:{},
  products:[],
  filterProduct:"",
  favoritesProducts:{}
}


export const ProductContext = createContext<IContext>({
    state:initialSatate,
    dispatch:()=>{}
})

const ProductsProvider = ({children}:{children:React.ReactNode}) => {
    const [state,dispatch] = useReducer(productReducer,initialSatate)
  
    
    useEffect(() => {
      const storageFavorites = JSON.parse(localStorage.getItem("favorites")!) || {}
      dispatch({type:"LOAD_FAVORITES",payload:storageFavorites})
    }, []);


  return (
    <ProductContext.Provider value={{state,dispatch}}>
        {children}
    </ProductContext.Provider>
  )
}

export default ProductsProvider