'use client'

import { Product } from "@/interfaces/interfaces";
import { encrypt } from "@/utils/encript";
import { useState, ChangeEvent, FormEvent, useMemo, useCallback } from "react";
import toast from "react-hot-toast";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUD_NAME
const PRESET_NAME = process.env.NEXT_PUBLIC_PRESET_NAME

export const useCreateProduct = (products:Product[]) => {

    const [form, setForm] = useState({ nombre: "", tipo: "", precio: "", descripcion: "", });
    const [errors, setErrors] = useState({ nombre: "", tipo: "", precio: "", imagen:"" });
    const [isLoading,setLoading] = useState(false)
    const [fileImage,setFileImage] = useState<File | undefined>(undefined)
  
    const handleChange = (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const name = e.target.name;
      const value = e.target.value;
      setErrors(prev => ({...prev,[name]:""}))
      setForm((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
  
      const file = e.target.files;
      if (!file) return;
      setErrors((prev)=> ({...prev,imagen:""}))
      setFileImage(file[0])
    };
  
    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
     if( isInvalidForm()) return;
  
      setLoading(true)
  
      const imageUrl = await uploadImage()
  
      const data = [form.nombre,form.tipo,imageUrl,+form.precio,form.descripcion];
      const body = { data };
  
      //TODO: email provider auth.js ===>
      const encriptedKey = encrypt("hernan.plazabs@gmail.com");
      try {
        const productResponse = await fetch("/api/products", {
          method: "POST",
          headers: { authorization: encriptedKey },
          body: JSON.stringify(body),
        });
        const response = await productResponse.json();
        if( response.code === 200) {
          toast.success("Producto agregado correctamente.")
        }else{
          toast.error(response.message)
        }
     
        setLoading(false);
        setForm({nombre:"",tipo:"",precio:"",descripcion:""})
        setFileImage(undefined);
  
      } catch (error) {
        toast.error("Ocurrio un error inesperado al guardar el producto!")
        console.error(error);
        setLoading(false);
        setForm({nombre:"",tipo:"",precio:"",descripcion:""})
        setFileImage(undefined);
      }
    };
  
    const uploadImage = async()=>{
      const data = new FormData();
      data.append("file", fileImage!);
      data.append("upload_preset", PRESET_NAME!);
      data.append("cloud_name", CLOUD_NAME!);
  
  try {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dcgvgeoqe/image/upload",
      { method: "POST", body: data }
    );
    const dataImage = await response.json();
    return dataImage.secure_url
  } catch (error) {
    toast.error("Ocurrio un error al cargar la imagen del producto: ");
    console.error(error);
    return "/images/Image-not-found.png"
    
  }
    }
  
    const productTypes = useMemo(() => {
      const headers = new Set(products.map((product) => product.tipo));
      return [...headers];
    }, [products]);
  
    const isInvalidForm = useCallback(()=>{
      let isInvalid = false
      if(!fileImage) {
        isInvalid = true;
        setErrors(prev => ({...prev,imagen:"Debes subir una imagen."}))
      }
      for (const [key,value] of Object.entries(form)){
          if(key !== "descripcion") {
            if(!value.trim()){
              isInvalid = true
              setErrors(prev => ({...prev,[key]:"Campo requerido."}))
            }
          }
      }
      return isInvalid
    },[form,fileImage])

  return {
    form,
    errors,
    isLoading,
    fileImage,
    productTypes,
    onSubmit,
    handleChange,
    handleChangeFile
}
}
