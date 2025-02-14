"use client";

import { ProductContext } from "@/providers/ProductsProvider";
import { useContext } from "react";

export const FavoriteButton = ({ name }: { name: string }) => {
  const { state, dispatch } = useContext(ProductContext);

  const handleToogleFavorite = () => {
    dispatch({ type: "TOOGLE_FAVORITES", payload: name });
  };

  return (
    <button
      onClick={handleToogleFavorite}
      className={`!absolute top-4 right-4 h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase  transition-all hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
      type="button"
      data-ripple-dark="true"
    >
      <span className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 transform">
      {state.favoritesProducts[name] && (  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#eb0000" viewBox="0 0 256 256"><path d="M240,102c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,228.66,16,172,16,102A62.07,62.07,0,0,1,78,40c20.65,0,38.73,8.88,50,23.89C139.27,48.88,157.35,40,178,40A62.07,62.07,0,0,1,240,102Z"></path></svg>)}
      {!state.favoritesProducts[name] && (<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#efebed" viewBox="0 0 256 256"><path d="M178,44c-21.44,0-39.92,10.19-50,27.07C117.92,54.19,99.44,44,78,44a58.07,58.07,0,0,0-58,58c0,28.59,18,58.47,53.4,88.79a333.81,333.81,0,0,0,52.7,36.73,4,4,0,0,0,3.8,0,333.81,333.81,0,0,0,52.7-36.73C218,160.47,236,130.59,236,102A58.07,58.07,0,0,0,178,44ZM128,219.42c-14-8-100-59.35-100-117.42A50.06,50.06,0,0,1,78,52c21.11,0,38.85,11.31,46.3,29.51a4,4,0,0,0,7.4,0C139.15,63.31,156.89,52,178,52a50.06,50.06,0,0,1,50,50C228,160,142,211.46,128,219.42Z"></path></svg>)}
      </span>
    </button>
  );
};
