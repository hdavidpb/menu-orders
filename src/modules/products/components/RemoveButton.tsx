"use client";

import { ProductContext } from "@/providers/ProductsProvider";
import { useContext, useEffect } from "react";

export const RemoveButton = ({ name }: { name: string }) => {
  const { state, dispatch } = useContext(ProductContext);

  const handleRemoveItemToCart = () => {
    dispatch({ type: "REMOVE_PRODUCT", payload: name });
  };
  useEffect(()=>{
  },[state])
  return (
    <button
      onClick={handleRemoveItemToCart}
      className="bg-primary flex justify-center items-center px-3 py-1 text-white rounded"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" > <path d="M4 7l16 0" /> <path d="M10 11l0 6" /> <path d="M14 11l0 6" />{" "} <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />{" "} <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />{" "} </svg>
    </button>
  );
};
