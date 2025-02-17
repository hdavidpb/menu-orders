'use client'

import Image from "next/image"
import { SignOutButton } from "./SignOutButton"
import { useState } from "react"
import Link from "next/link"

export const ProfileSesionButton = ({urlImage,showAdminBtn}:{urlImage?:string | null,showAdminBtn?:boolean}) => {
    const [showMenu,setShowMenu] = useState(false)

    const handleToogleMenu  =(show:boolean)=>{
        setShowMenu(show)
    }
  return (
    <>
      <Image onClick={()=>handleToogleMenu(!showMenu)} src={urlImage || "/images/silueta.webp"} width={300} height={300} className="w-14 h-14 rounded-full shadow bg-white" alt="foto de perfil" />
      {showMenu && (
        <>
          <div className="w-4 h-4 bg-white absolute -bottom-[22px] z-20 right-8 rotate-45 shadow md:hidden"></div>
          <div className="rounded-lg bg-white absolute -bottom-[115px] z-50 right-2 shadow p-3 md:hidden flex flex-col gap-1">
            {showAdminBtn && (<Link href="/create" className="px-3 py-2 bg-indigo-500 text-white text-sm rounded-lg" > Administrador </Link>)}
            <SignOutButton />
          </div>
        </>
      )}
    </>
  );
}
