'use client'

export const DownloadMenu = () => {
  return (
    <button onClick={()=>window.open("https://res.cloudinary.com/dcgvgeoqe/image/upload/v1739906889/breve/menu_bcuori.jpg","_blank")} className="fixed bottom-5 right-4 flex flex-col justify-start items-center gap-1 opacity-70 hover:opacity-100">
    <div className="flex flex-col justify-center items-center gap-[2px]">
      <span className="text-[11px] bg-white p-1 rounded-md font-semibold">Descargar menú</span>
      <div className="w-12 h-12 rounded-full bg-white border flex justify-center items-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#000000" viewBox="0 0 256 256"><path d="M212.24,83.76l-56-56A6,6,0,0,0,152,26H56A14,14,0,0,0,42,40V216a14,14,0,0,0,14,14H200a14,14,0,0,0,14-14V88A6,6,0,0,0,212.24,83.76ZM158,46.48,193.52,82H158ZM200,218H56a2,2,0,0,1-2-2V40a2,2,0,0,1,2-2h90V88a6,6,0,0,0,6,6h50V216A2,2,0,0,1,200,218Zm-43.76-62.24a6,6,0,0,1,0,8.48l-24,24a6,6,0,0,1-8.48,0l-24-24a6,6,0,0,1,8.48-8.48L122,169.51V120a6,6,0,0,1,12,0v49.51l13.76-13.75A6,6,0,0,1,156.24,155.76Z"></path></svg>          </div>
    </div>
  </button>
  )
}
