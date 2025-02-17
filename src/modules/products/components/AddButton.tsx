"use client";

import { ProductContext } from "@/providers/ProductsProvider";
import { useContext, useEffect } from "react";

export const AddButton = ({ image, name }: { image: string; name: string }) => {
  const { state, dispatch } = useContext(ProductContext);

  const handleAddToCart = () => {
    dispatch({ type: "ADD_PRODUCT", payload: { image,name} });
  };

useEffect(()=>{
},[state])
  return (
    <button
      className="w-[100px] px-3 py-2 border rounded-full flex justify-center items-center bg-primary text-white hover:opacity-70 transition-opacity"
      onClick={handleAddToCart}
      type="button"
    >
      {state.productsInCart[name] && <span className="text-sm">+{state.productsInCart[name].quantity}</span>}
      {!state.productsInCart[name] && <span className="text-sm">Agregar</span>}
    </button>
  );
};
