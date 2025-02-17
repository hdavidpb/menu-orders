"use client";


import { ProductContext } from "@/providers/ProductsProvider";
import { IProductsCart } from "@/reducers/productsReducer";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export const CartButton = () => {
  const { state ,dispatch} = useContext(ProductContext);
  const [totalProductsInCart, setTotalProductsInCart] = useState(0);

  const pathname = usePathname()


  useEffect(() => {
    const storageProductsInCart:IProductsCart = JSON.parse(localStorage.getItem("cart") || "{}") ;
    let newCart: IProductsCart = {};
    if(state.products.length !==0){
      for (const productKeyName of Object.keys(storageProductsInCart)) {
        console.log("ENTRO ACA: ",productKeyName)
        for (const product of state.products) {
          if (product.nombre === productKeyName) {
            newCart = {...newCart,[productKeyName]:storageProductsInCart[productKeyName]}
          }
        }
      }
      dispatch({type:"LOAD_CART",payload:newCart})

    }

  }, [ state.products]);

  useEffect(() => {
    const totalProductsInCard = Object.values(state.productsInCart).reduce(
      (acc, value) => {
        acc += value.quantity;
        return acc;
      },
      0
    );
    setTotalProductsInCart(totalProductsInCard);
  }, [state.productsInCart]);

  return (totalProductsInCart !== 0 && pathname!=="/create") ? (
    <div className="w-14 flex justify-center items-center">

    <Link
      href="/orders"
      className="bg-indigo-500 text-white p-2 rounded-lg flex justify-center items-center gap-1 transition-all ease-out hover:opacity-70 hover:shadow-lg"
    >
      <span className="font-bold">{totalProductsInCart}</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" > <path fill="currentColor" d="M20.756 5.345A1 1 0 0 0 20 5H6.181l-.195-1.164A1 1 0 0 0 5 3H2.75a1 1 0 1 0 0 2h1.403l1.86 11.164l.045.124l.054.151l.12.179l.095.112l.193.13l.112.065a1 1 0 0 0 .367.075H18a1 1 0 1 0 0-2H7.847l-.166-1H19a1 1 0 0 0 .99-.858l1-7a1 1 0 0 0-.234-.797M18.847 7l-.285 2H15V7zM14 7v2h-3V7zm0 3v2h-3v-2zm-4-3v2H7l-.148.03L6.514 7zm-2.986 3H10v2H7.347zM15 12v-2h3.418l-.285 2z" /> <circle cx="8.5" cy="19.5" r="1.5" fill="currentColor" />{" "} <circle cx="17.5" cy="19.5" r="1.5" fill="currentColor" />{" "} </svg>
    </Link>

    </div>
  ) : null;
};
