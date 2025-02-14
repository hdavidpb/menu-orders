import { ProductContext } from "@/providers/ProductsProvider";
import Image from "next/image";
import React, { useContext } from "react";
import { RemoveButton } from "../products/components/RemoveButton";

const OrdersCartContainer = () => {
  const { state } = useContext(ProductContext);
  return (
    <div className="rounded-lg  md:w-[500px]">
      {Object.entries(state.productsInCart).map(
        ([key, { image, price, quantity }]) => (
          <div
            key={key}
            className="justify-between mb-2 rounded-lg bg-white p-4 shadow-md sm:flex sm:justify-start"
          >
            <Image
              width={200}
              height={200}
              priority
              src={image}
              alt="product-image"
              className="w-full rounded-lg sm:w-14"
            />
            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
              <div className="mt-5 sm:mt-0">
                <h2 className="text-lg font-bold text-gray-900">{key}</h2>
              </div>
              <div className="flex justify-center items-center gap-3">
                <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6 w-full">
                  <div className="flex flex-row md:flex-col items-center border-gray-100 w-full md:gap-0 gap-5">
                    <span className="text-xl font-semibold">{quantity}</span>
                    <p className="text-lg">
                      ${new Intl.NumberFormat("de-De").format(price * quantity)}
                    </p>
                  </div>
                </div>
                <RemoveButton name={key} />
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default OrdersCartContainer;
