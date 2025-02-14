'use client';

import { useContext, useEffect } from "react";
import { ProductCard } from "./ProductCard";
import { Product } from "@/interfaces/interfaces";
import { ProductContext } from "@/providers/ProductsProvider";

 const ProductsContainer = ({ products }: { products: Product[] }) => {
    const {state,dispatch } = useContext(ProductContext)

    useEffect(()=>{
        if(state.products.length === 0) dispatch({type:"GET_SERVER_PRODUCTS",payload:products})
    },[])

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4  gap-3 ">
      {state.products.filter(p => p.tipo.includes(state.filterProduct)).map((product) => (
        <ProductCard
          key={product.nombre}
          nombre={product.nombre}
          precio={product.precio}
          imagen={product.imagen}
        />
      ))}
    </div>
  );
};

export default ProductsContainer
