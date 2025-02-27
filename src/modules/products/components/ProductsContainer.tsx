'use client';

import { useContext, useEffect } from "react";
import { ProductCard } from "./ProductCard";
import { Product } from "@/interfaces/interfaces";
import { ProductContext } from "@/providers/ProductsProvider";

 const ProductsContainer = ({ products }: { products: Product[] }) => {
    const {state,dispatch } = useContext(ProductContext)

    useEffect(()=>{
        if(state.products.length === 0) dispatch({type:"GET_SERVER_PRODUCTS",payload:products})
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-x-4 gap-y-6">
      {state.products.filter(p => p.tipo.includes(state.filterProduct)).map((product) => (
        <ProductCard
          key={product.nombre + product.tipo}
          nombre={product.nombre}
          precio={product.precio}
          imagen={product.imagen}
          tipo={product.tipo}
          descripción={product.descripcion}
        />
      ))}
    </div>
  );
};

export default ProductsContainer
