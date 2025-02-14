import { createProductsAdapter } from "@/adapters/adapters";
import { Navbar } from "@/components/Navbar";
import { FilterButtons } from "@/modules/products/components/FilterButtons";
import ProductsContainer from "@/modules/products/components/ProductsContainer";


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

export default async function Home() {
  const products = await generateCatalogo();


  return (
    <section className="w-full  flex flex-col justify-start items-start gap-3 p-4 overflow-y-auto">
      <Navbar />
      <FilterButtons />
      <ProductsContainer products={products} />
    </section>
  );
}
