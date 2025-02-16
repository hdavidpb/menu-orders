import Image from "next/image";
import { ChangeEvent } from "react";

interface Props {
    handleChangeFile:(e:ChangeEvent<HTMLInputElement>)=>void;
    label:string;
    isLoading:boolean;
    fileImage?:File;
    imageUrl:string;
    error?:string;
    disabled?:boolean
}


export const UIUploadImageInput = ({handleChangeFile,isLoading,fileImage,imageUrl,label,disabled,error}:Props) => {
  return (
      <div className="w-full flex flex-col justify-start items-start gap-1">
        <label className="text-sm">{label}</label>
      <div className={`w-full h-[150px] flex flex-col justify-center items-center rounded-lg border relative border-dashed cursor-pointer ${error?"border-red-500":""}`}>
          <input
              onChange={handleChangeFile}
              type="file"
              className="w-full h-full opacity-0 absolute cursor-pointer disabled:cursor-not-allowed"
              disabled={isLoading || disabled}
            />
            {(!fileImage && !imageUrl) &&(
                <>
                 <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="#5a5a5e" viewBox="0 0 256 256"><path d="M178.34,165.66,160,147.31V208a8,8,0,0,1-16,0V147.31l-18.34,18.35a8,8,0,0,1-11.32-11.32l32-32a8,8,0,0,1,11.32,0l32,32a8,8,0,0,1-11.32,11.32ZM160,40A88.08,88.08,0,0,0,81.29,88.68,64,64,0,1,0,72,216h40a8,8,0,0,0,0-16H72a48,48,0,0,1,0-96c1.1,0,2.2,0,3.29.12A88,88,0,0,0,72,128a8,8,0,0,0,16,0,72,72,0,1,1,100.8,66,8,8,0,0,0,3.2,15.34,7.9,7.9,0,0,0,3.2-.68A88,88,0,0,0,160,40Z"></path></svg> <span className="text-sm text-[#5a5a5e]">Subir imagen ( jpg,png,webp )</span>
                </>
            )}
            {(fileImage && !imageUrl )&& (<Image width={400} height={400} className="w-full h-full object-contain" alt="imagen de producto" src={URL.createObjectURL(fileImage)}/> )}
            {imageUrl && (<Image width={400} height={400} className="w-full h-full object-contain" alt="imagen de producto" src={imageUrl}/>)}
          </div>
          {error && (<span className="text-xs text-red-500">{error}</span>)}
          
      </div>
  )
}
