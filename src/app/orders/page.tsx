
import { OrderConfirmTotal } from "@/modules/orders/OrderConfirmTotal";
import OrdersCartContainer from "@/modules/orders/OrdersCartContainer";
import { headers } from "next/headers";

const generateCatalogo = async () => {
  const headersList = await headers();
  const BASE_URL = headersList.get("host") ? `http://${headersList.get("host")}` : "http://localhost:3000";

    const response = await fetch(`${BASE_URL}/api/products`, {
      next: { revalidate: 60 }, // Refresca cada 60 segundos
    });
    const data = await response.json();
    return (data.products);
};

const OrderPage = async () => {
  const products = await generateCatalogo();
  
  return (
    <section className="w-full h-dvh flex flex-col justify-start items-center gap-3 p-4 bg-[#e3e4e5] ">
        <div className="mx-auto flex-1 md:max-w-5xl w-full justify-start items-center flex flex-col  xl:px-0 relative">
          <OrdersCartContainer products={products}/>
          <OrderConfirmTotal products={products}/>
        </div>

    </section>
  );
};

export default OrderPage;