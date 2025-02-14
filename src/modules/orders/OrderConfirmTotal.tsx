'use client'
import { Product } from "@/interfaces/interfaces";
import { useGetProductsIncart } from "./hooks/useGetProductsIncart";
import OrderForm from "./OrderForm";

export const OrderConfirmTotal = ({ products }: { products: Product[] }) => {

  const {getTotal} = useGetProductsIncart(products)

  return (
    <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3 ">
      <OrderForm isOpen onClose={() => {}} />
      <div className="flex justify-between text-2xl">
        <p className="font-bold">Total</p>
        <div className="">
          <p className="mb-1 font-bold">
            ${new Intl.NumberFormat("de-DE").format(getTotal)}
          </p>
        </div>
      </div>
      <button className="mt-6 w-full rounded-md bg-indigo-500 py-3 font-medium text-white hover:bg-blue-600">
        CONFIRMAR
      </button>
    </div>
  );
};
