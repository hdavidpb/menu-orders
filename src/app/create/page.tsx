import {auth} from "../../../auth"

import { createProductsAdapter } from "@/adapters/adapters";
import { CreateProductForm } from "@/modules/products/components/CreateProductForm";
import { redirect } from "next/navigation";

const EMAIL_KEY = process.env.EMAIL_KEY

const generateCatalogo = async () => {
  const URL = process.env.URL_API!;
  const catalogo = await fetch(URL, {
    cache: "no-store",
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

  const session = await auth();

  if(!session || session.user?.email !== EMAIL_KEY) {
    redirect("/api/auth/signin")
  }



  return (
    <div className="w-full md:h-screen flex flex-col justify-start items-center overflow-y-auto py-4 bg-gray-200">
      <h1 className="mb-2 text-center md:text-base text-sm">Bienvenido al modúlo de administración de productos, {session?.user?.name}.</h1>
      <CreateProductForm products={products} />
    </div>
  );
};

export default CreateOrderPage;
