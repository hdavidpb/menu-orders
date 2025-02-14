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
      className="bg-indigo-500 h-full py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md  transition-all hover:shadow-lg  focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none w-28 rounded-lg flex justify-center items-center"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" > <path d="M4 7l16 0" /> <path d="M10 11l0 6" /> <path d="M14 11l0 6" />{" "} <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />{" "} <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />{" "} </svg>
    </button>
  );
};
