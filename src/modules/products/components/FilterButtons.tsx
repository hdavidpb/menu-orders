"use client";
import { ProductContext } from "@/providers/ProductsProvider";
import React, { useContext, useMemo } from "react";

export const FilterButtons = () => {
  const { state ,dispatch} = useContext(ProductContext);

  const filters = useMemo(() => {
    const headers = new Set(state.products.map((product) => product.tipo));
    return [...headers];
  }, [state.products]);


  const handleSelectedFilter = (header:string)=>{
    dispatch({type:"SELECTED_FILTER",payload:header})
  }
  return (
    <div className="w-full flex justify-start items-start gap-1 overflow-x-auto  py-3 mb-3">
      {filters.map((header) => (
        <button
          key={header}
          className={`px-3 py-2 rounded-lg shadow-lg text-sm transition-all ease-in-out duration-400 ${header === state.filterProduct ? "bg-primary text-white ":"bg-white text-black hover:bg-indigo-300 hover:text-white"}`}
          onClick={()=>handleSelectedFilter(header)}
        >
          {header}
        </button>
      ))}
    </div>
  );
};
