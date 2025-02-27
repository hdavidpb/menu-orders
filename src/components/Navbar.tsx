import Link from "next/link";

import { CartButton } from "./CartButton";
import { SignOutButton } from "./SignOutButton";
import { auth } from "../../auth";
import { ProfileSesionButton } from "./ProfileSesionButton";
import Image from "next/image";

const EMAIL_KEY = process.env.EMAIL_KEY

const Navbar = async () => {


  const session = await auth();
  return (
    <nav className="w-full flex justify-between items-center p-4 border-b relative">
      <Link href="/" className="text-4xl"> 
      <Image src="/images/breve_logo.jpeg" alt="BREVE" height={200} width={200} priority className="w-[110px] h-[52px]"/>
       </Link>
      <div className="flex justify-center items-center gap-4">
        {!session && (
          <Link href="/create" className="underline font-medium text-primary" > Login </Link>
        )}
        {session && (
          <div className="flex justify-center items-center gap-3">
         
              <>
              {session.user?.email === process.env.EMAIL_KEY  && 
              (  <Link href="/create" className="px-3 py-2 bg-primary text-white text-sm rounded-lg hidden md:block" >
                  Administrador
                </Link>)}
             
                <div className="hidden md:block">
                <SignOutButton />
                </div>
              </>
              <ProfileSesionButton urlImage={session.user?.image} showAdminBtn={session.user?.email === EMAIL_KEY}/>
          </div>
        )}
        
        <CartButton />
   
      </div>
      {/* <>
        <div className="w-4 h-4 bg-white absolute -bottom-[14px] z-20 right-8 rotate-45 border"></div>
        <div className="rounded-lg bg-white absolute -bottom-[65px] z-50 right-2 shadow p-3 ">
        <SignOutButton />
      </div>
      </> */}
    </nav>
  );
};


export default Navbar;
