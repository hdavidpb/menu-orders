
import { createProductsAdapter } from "@/adapters/adapters";
import { OrderConfirmTotal } from "@/modules/orders/OrderConfirmTotal";
import OrdersCartContainer from "@/modules/orders/OrdersCartContainer";
const generateCatalogo = async () => {
  const URL = process.env.URL_API!;
  const catalogo = await fetch(URL, {
    cache: "no-cache",
    next: { revalidate: 60 },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const products = createProductsAdapter(data);
      return products;
    });

  return catalogo;
};

const OrderPage = async () => {
  const products = await generateCatalogo();
  return (
    <section className="w-full h-dvh flex flex-col justify-start items-start gap-3 p-4 overflow-y-auto">
      <div className="w-full md:pt-20">
        <h1 className="md:mb-10 mb-4 text-center text-2xl font-bold">
          Tu orden
        </h1>
        <div className="mx-auto max-w-5xl justify-center flex flex-col-reverse md:flex-row md:space-x-6 xl:px-0">
          <OrdersCartContainer products={products}/>
          {/* <!-- Sub total --> */}
          <OrderConfirmTotal products={products}/>
        </div>
      </div>
    </section>
  );
};

export default OrderPage;