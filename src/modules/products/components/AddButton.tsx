"use client";

import { ProductContext } from "@/providers/ProductsProvider";
import { useContext, useEffect } from "react";

export const AddButton = ({ image, name,price }: { image: string; name: string,price:number }) => {
  const { state, dispatch } = useContext(ProductContext);

  const handleAddToCart = () => {
    dispatch({ type: "ADD_PRODUCT", payload: { image,name,price} });
  };

useEffect(()=>{
},[state])
  return (
    <button
      style={{ flex: 1 }}
      className="flex-1 h-full bg-indigo-500 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md  transition-all hover:shadow-lg  focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none  rounded-lg"
      onClick={handleAddToCart}
      type="button"
    >
      {state.productsInCart[name] && <span>{state.productsInCart[name].quantity}</span>}
      {!state.productsInCart[name] && <span>Agregar</span>}
    </button>
  );
};
