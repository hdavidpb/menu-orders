'use client'

import { Product } from "@/interfaces/interfaces";
import { encrypt } from "@/utils/encript";
import { useState, ChangeEvent, FormEvent, useMemo, useCallback, useEffect } from "react";
import toast from "react-hot-toast";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUD_NAME
const PRESET_NAME = process.env.NEXT_PUBLIC_PRESET_NAME

const initialValues = {nombre:"",tipo:"",precio:"",descripcion:"",imagen:""}

export enum ActionType  {
  "ADD_PRODUCT" = "agreagar producto",
  "UPDATE_PRODUCT" = "actualizar producto"
}
export const useCreateProduct = (products:Product[]) => {

    const [form, setForm] = useState(initialValues);
    const [errors, setErrors] = useState({ nombre: "", tipo: "", precio: "", imagen:"" });
    const [isLoading,setLoading] = useState(false)
    const [fileImage,setFileImage] = useState<File | undefined>(undefined);
    const [actionType,setActionType] = useState<ActionType>(ActionType.ADD_PRODUCT)
  
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
      setForm(prev => ({...prev,imagen:""}))
      setErrors((prev)=> ({...prev,imagen:""}))
      setFileImage(file[0])
    };
  
    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      let data = []
     if( isInvalidForm()) return;
  
      setLoading(true)
      if(form.imagen){
        data = [form.nombre,form.tipo,form.imagen,+form.precio,form.descripcion];
      }else{
        const imageUrl = await uploadImage()
        data = [form.nombre,form.tipo,imageUrl,+form.precio,form.descripcion];

      }
  
      const body = actionType === ActionType.ADD_PRODUCT ?  { data } : {id:form.nombre,data};
  
      //TODO: email provider auth.js ===>
      const encriptedKey = encrypt("hernan.plazabs@gmail.com");
      try {
        const productResponse = await fetch("/api/products", {
          method: "POST",
          headers: { authorization: encriptedKey },
          body: JSON.stringify(body),
        });
        const response = await productResponse.json();
        if( response.status === "success") {
          toast.success(response.message)
        }else{
          toast.error(response.message)
        }
     
        setLoading(false);
        setForm(initialValues)
        setFileImage(undefined);
       if(actionType === ActionType.UPDATE_PRODUCT)  window.location.reload()
  
      } catch (error) {
        toast.error("Ocurrio un error inesperado al guardar el producto!")
        console.error(error);
        setLoading(false);
        setForm(initialValues)
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
      if(!fileImage && actionType === ActionType.ADD_PRODUCT) {
        isInvalid = true;
        setErrors(prev => ({...prev,imagen:"Debes subir una imagen."}))
      }


      for (const [key,value] of Object.entries(form)){
          if(key !== "descripcion" && key !== "imagen") {
            if(!value.trim()){
              isInvalid = true
              setErrors(prev => ({...prev,[key]:"Campo requerido."}))
            }
          }
      }
      return isInvalid
    },[form,fileImage,actionType])

    const handleSelectProductName = (e:ChangeEvent<HTMLSelectElement>)=>{
      const selectedName = e.target.value
    
      const product = products.find((product) => product.nombre === selectedName)!;
      setErrors({nombre:"",imagen:"",precio:"",tipo:""})
      setForm({nombre:product.nombre,tipo:product.tipo,imagen:product.imagen,precio:product.precio.toString(),descripcion:product.descripcion})
    }
    
    const handleChangeActionType = (e: ChangeEvent<HTMLSelectElement>) => {
      setActionType(e.target.value as ActionType);
      localStorage.setItem("actionType",e.target.value)
      setForm(initialValues);
    };


    useEffect(()=>{
        const storageActionType = localStorage.getItem("actionType") as ActionType || ActionType.ADD_PRODUCT ;
        setActionType(storageActionType)
    },[])

  return {
    form,
    errors,
    fileImage,
    isLoading,
    actionType,
    productTypes,
    setForm,
    onSubmit,
    handleChange,
    handleChangeFile,
    handleChangeActionType,
    handleSelectProductName
}
}
