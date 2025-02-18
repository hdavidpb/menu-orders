import { headers } from "next/headers";
import { FilterButtons } from "@/modules/products/components/FilterButtons";
import ProductsContainer from "@/modules/products/components/ProductsContainer";
import { DownloadMenu } from "@/modules/products/components/DownloadMenu";


const generateCatalogo = async () => {
  const headersList = await headers();
  const BASE_URL = headersList.get("host") ? `http://${headersList.get("host")}` : "http://localhost:3000";

    const response = await fetch(`${BASE_URL}/api/products`, {
      next: { revalidate: 60 }, // Refresca cada 60 segundos
    });
    const data = await response.json();
    return (data.products);
};

export default async function Home() {
  const products = await generateCatalogo();


  return (
    <section className="w-full h-full bg-gray-200 flex flex-col justify-start items-start gap-3 p-4 overflow-y-auto">
      <FilterButtons />
      <ProductsContainer products={products} />
    <DownloadMenu/>
    </section>
  );
}
