"use client";

import {signOut} from "next-auth/react"

export const SignOutButton = () => {
  return (
    <button
        onClick={()=>signOut()}
      className="px-3 py-2 bg-red-500 text-white text-sm rounded-lg"
    >
      Cerrar sesión
    </button>
  );
};
