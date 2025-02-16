import Link from "next/link";

import { CartButton } from "./CartButton";
import { createProductsAdapter } from "@/adapters/adapters";
import { SignOutButton } from "./SignOutButton";
import { auth } from "../../auth";
import Image from "next/image";

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
const Navbar = async () => {
  const products = await generateCatalogo();

  const session = await auth();
  return (
    <nav className="w-full flex justify-between items-center p-4 border-b">
      <Link href="/" className="text-4xl">
        Menú
      </Link>
      <div className="flex justify-center items-center gap-4">
        {!session && (
          <Link
            href="/create"
            className="underline font-medium text-indigo-500"
          >
            Admin
          </Link>
        )}
        {session && (
          <div className="flex justify-center items-center gap-3">
            {session.user?.email === process.env.EMAIL_KEY && (
              <>
                <Link href="/create" className="px-3 py-2 bg-indigo-500 text-white text-sm rounded-lg" >
                  Administrador
                </Link>
                <SignOutButton />
              </>
            )}
            <Image
              src={session?.user?.image ?? ""}
              width={300}
              height={300}
              className="w-14 h-14 rounded-full shadow shadow-black"
              alt="foto de perfil"
            />
          </div>
        )}

        <CartButton products={products} />
      </div>
    </nav>
  );
};

export default Navbar;
