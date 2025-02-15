import { createProductsAdapter } from "@/adapters/adapters";
import { CreateProductForm } from "@/modules/products/components/CreateProductForm";
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
const CreateOrderPage = async () => {
    const products = await generateCatalogo();
  return (
    <div className="w-full md:h-screen flex flex-col justify-start items-center overflow-y-auto py-4 bg-gray-200">
      <CreateProductForm products={products} />
    </div>
  );
};

export default CreateOrderPage;
