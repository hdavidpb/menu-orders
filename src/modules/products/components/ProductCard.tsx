

import Image from "next/image";
import { AddButton } from "./AddButton";


interface Props {
  nombre:string;
  precio:number;
  imagen:string;
  descripción:string;
}

export const ProductCard =  ({ nombre,imagen,precio,descripción }: Props) => {
  return (
    <div className="bg-white rounded-lg shadow  p-3 flex justify-between items-start w-full gap-2">
    <div className="flex-1">
     <h2 className="text-lg font-medium text-gray-700"> {nombre} </h2>
     <p className="text-sm text-gray-500 mt-1"> {descripción} </p>
     <div className="flex flex-col justify-between gap-2 items-start mt-3">
     <p className="text-base font-bold text-gray-800 "> $ {new Intl.NumberFormat("de-DE").format(precio)} </p>
     <AddButton name={nombre} image={imagen}  />
     </div>
    </div>
     <Image src={imagen}  alt="Imagen"  className="w-20 h-20  rounded-lg" height={110} priority  width={110}/>
   </div>

  );
};
