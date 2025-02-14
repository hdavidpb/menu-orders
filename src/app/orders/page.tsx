"use client";
import { OrderConfirmTotal } from "@/modules/orders/OrderConfirmTotal";
import OrderForm from "@/modules/orders/OrderForm";
import OrdersCartContainer from "@/modules/orders/OrdersCartContainer";

const OrderPage = () => {
  return (
    <section className="w-full h-dvh flex flex-col justify-start items-start gap-3 p-4 overflow-y-auto">
      <OrderForm isOpen onClose={() => {}} />
      <div className="w-full md:pt-20">
        <h1 className="md:mb-10 mb-4 text-center text-2xl font-bold">
          Tu orden
        </h1>
        <div className="mx-auto max-w-5xl justify-center flex flex-col-reverse md:flex-row md:space-x-6 xl:px-0">
          <OrdersCartContainer />
          {/* <!-- Sub total --> */}
          <OrderConfirmTotal />
        </div>
      </div>
    </section>
  );
};

export default OrderPage;