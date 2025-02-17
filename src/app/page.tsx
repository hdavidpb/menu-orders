import { createProductsAdapter } from "@/adapters/adapters";
import { FilterButtons } from "@/modules/products/components/FilterButtons";
import ProductsContainer from "@/modules/products/components/ProductsContainer";


const generateCatalogo = async () => {
  const URL = process.env.URL_API!;
  try {
    const response = await fetch(URL, {
      next: { revalidate: 60 }, // Refresca cada 60 segundos
    });
    if (!response.ok) throw new Error("Error al obtener el catálogo");
    const data = await response.json();
    return createProductsAdapter(data);
  } catch (error) {
    console.error("Error fetching catalog:", error);
    return [];
  }
};

export default async function Home() {
  const products = await generateCatalogo();


  return (
    <section className="w-full  flex flex-col justify-start items-start gap-3 p-4 overflow-y-auto">
      <FilterButtons />
      <ProductsContainer products={products} />
    </section>
  );
}
