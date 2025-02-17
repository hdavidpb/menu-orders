'use client'


import Image from "next/image";
import { RemoveButton } from "../products/components/RemoveButton";
import { useGetProductsIncart } from "./hooks/useGetProductsIncart";
import { Product } from "@/interfaces/interfaces";

const OrdersCartContainer = ({ products }: { products: Product[] }) => {

  
const {getOrderList} = useGetProductsIncart(products)


  return (
    <div className="rounded-lg  md:w-[520px] w-full mb-9 flex flex-col justify-start items-center gap-2">
      {getOrderList.length !== 0 && (<h1 className="md:mb-10 mb-4 text-center text-2xl font-medium"> Detalles de tu orden </h1>)}
      {getOrderList.map(({ imagen, nombre, count, descripcion, precio ,tipo}) => (
        <div
          key={nombre}
          className=" w-full bg-white p-3 flex justify-start items-start gap-4 text-gray-900 shadow rounded-lg shadow-gray-300 relative"
        >
          <span className="absolute p-[6px] min-w-[85px] text-center  rounded-full text-xs bg-white border border-primary -right-2 -top-4">
          {tipo}
      </span>
          {imagen && (<Image width={100} height={100} priority src={imagen} alt="product-image" className="w-14 h-14 rounded-lg" />)}
          <div className="flex-1 flex-col justify-start items-start">
            <h2 className="text-base font-medium">{nombre}</h2>
            <p className="text-sm">{descripcion}</p>
            <div className="w-full flex justify-between items-center mt-3">
              <div className="flex justify-center items-center gap-1 text-lg">
                <span className=" font-semibold">{count}</span>
                <p className=" font-semibold">
                  ${new Intl.NumberFormat("de-De").format(precio * count)}
                </p>
              </div>
              <RemoveButton name={nombre} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersCartContainer;
