'use client'
import { Product } from "@/interfaces/interfaces";
import { useGetProductsIncart } from "./hooks/useGetProductsIncart";
import OrderForm from "./OrderForm";
import { useState } from "react";

export const OrderConfirmTotal = ({ products }: { products: Product[] }) => {

  const {getTotal,getOrderList} = useGetProductsIncart(products)
  const [isOpenForm,setIsopenForm] = useState(false)

  return (
    <>
    <OrderForm isOpen={isOpenForm} onClose={() => setIsopenForm(false)} productsInCart={getOrderList} />
    <div onClick={()=>setIsopenForm(true)} className="mt-6 cursor-pointer rounded-lg border bg-indigo-500 text-white p-4 shadow-md md:mt-0 md:w-1/3 md:static fixed m-auto bottom-0 w-full left-0 md:left-auto flex justify-around hover:opacity-75 transition-opacity">
        <span>Confirmar orden</span>
      <div className="flex justify-center items-center gap-2">
        <p >Subtotal:</p>
        <p className="font-bold">
            ${new Intl.NumberFormat("de-DE").format(getTotal)}
          </p>
      </div>
    </div>
    </>
  );
};
