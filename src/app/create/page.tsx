import {auth} from "../../../auth"

import { createProductsAdapter } from "@/adapters/adapters";
import { CreateProductForm } from "@/modules/products/components/CreateProductForm";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const EMAIL_KEY = process.env.EMAIL_KEY


const generateCatalogo = async () => {
  const URL = process.env.URL_API!;
  try {
    const response = await fetch(URL, {
      cache:"no-cache",
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

const CreateOrderPage = async () => {
  const products = await generateCatalogo();

  const session = await auth();

  if(!session || session.user?.email !== EMAIL_KEY) {
    redirect("/api/auth/signin")
  }



  return (
    <div className="w-full md:h-screen flex flex-col justify-start items-center overflow-y-auto py-4 bg-gray-200">
      <h1 className="mb-2 text-center md:text-base text-sm">Bienvenido al modúlo de administración de productos, {session?.user?.name}.</h1>
      <Suspense fallback={<p>Cargando productos...</p>}>
      <CreateProductForm products={products} />
      
      </Suspense>
    </div>
  );
};

export default CreateOrderPage;
