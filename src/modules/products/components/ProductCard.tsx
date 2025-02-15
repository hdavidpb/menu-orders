

import Image from "next/image";
import { AddButton } from "./AddButton";
import { FavoriteButton } from "./FavoriteButton";

interface Props {
  nombre:string;
  precio:number;
  imagen:string;
  descripción:string;
}

export const ProductCard =  ({ nombre,imagen,precio,descripción }: Props) => {
  return (
    <div className="relative flex w-full max-w-[26rem]  flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg pb-3">
      <div className="relative mx-4 mt-4 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
        <Image
          className="object-cover w-full aspect-square"
          src={imagen}
          alt="ui/ux review check"
          width={600}
          height={600}
          priority
        />
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60"></div>
       <FavoriteButton name={nombre}/>

      </div>
      <div className="p-6 flex-1">
        <div className="flex items-center justify-between">
          <h5 className="capitalize block font-sans text-xl font-medium leading-snug tracking-normal text-blue-gray-900 antialiased">
            {nombre.toLowerCase()}
          </h5>
        </div>
        <span>${new Intl.NumberFormat("de-DE").format(precio)}</span>
        <p className="block font-sans text-base font-light leading-relaxed text-gray-700 antialiased">
       {descripción}
        </p>
   
      </div>
      <div  className=" flex h-14 flex-col justify-end w-full gap-2 px-2 ">
        <AddButton name={nombre} image={imagen}  />
      </div>
    </div>
  );
};
