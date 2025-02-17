import {auth} from "../../../auth"

import { CreateProductForm } from "@/modules/products/components/CreateProductForm";
import { redirect } from "next/navigation";


const EMAIL_KEY = process.env.EMAIL_KEY




const CreateOrderPage = async () => {

  const session = await auth();

  if(!session || session.user?.email !== EMAIL_KEY) {
    redirect("/api/auth/signin")
  }



  return (
    <div className="w-full md:h-screen flex flex-col justify-start items-center py-4 bg-gray-200">
      <h1 className="mb-2 text-center md:text-base text-sm">Bienvenido al modúlo de administración de productos, {session?.user?.name}.</h1>
      <CreateProductForm  />
    </div>
  );
};

export default CreateOrderPage;
