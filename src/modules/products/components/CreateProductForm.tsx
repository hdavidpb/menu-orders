"use client";


import { UIInput } from "@/components/UIInput";
import { UITextArea } from "@/components/UITextArea";
import { UIInputDataList } from "@/components/UIInputDataList";
import { UIUploadImageInput } from "@/components/UIUploadImageInput";
import { UISelect } from "@/components/UISelect";

import { ActionType, useCreateProduct } from "../hooks/useCreateProduct";
import { UISelectedAction } from "./UISelectedAction";



export const CreateProductForm = () => {
const {products,form,errors,isLoading,productTypes,fileImage,onSubmit,handleChange,handleChangeFile,handleSelectProductName,handleChangeActionType,actionType} = useCreateProduct()





  return (
    <form
      onSubmit={onSubmit}
      className="w-[99%] md:w-[450px] px-3 py-4 flex flex-col justify-start items-start gap-3 rounded-lg shadow bg-white"
    >
      <UISelectedAction value={actionType} handleChangeActionType={handleChangeActionType} />

      {(actionType === ActionType.UPDATE_PRODUCT || actionType === ActionType.DELETE_PRODUCT) && (
        <UISelect
          name="id"
          handleChange={handleSelectProductName}
          label={`Selecciona producto`}
          options={products.map((product) => product.nombre)}
          value={form.id}
          placeholder={`Selecciona para ${actionType}`}
          error={errors.id}
          disabled={isLoading}
        />
      )}
        <UIInput
          name="nombre"
          value={form.nombre}
          label="Nombre del producto"
          handleChange={handleChange}
          placeholder="Dijita el nombre del producto"
          error={errors.nombre}
          disabled={actionType === ActionType.DELETE_PRODUCT}
        />
      <UIInputDataList
        name="tipo"
        value={form.tipo}
        handleChange={handleChange}
        label="Tipo de producto"
        placeholder="Dijita el tipo de producto"
        listData={productTypes}
        error={errors.tipo}
        disabled={actionType === ActionType.DELETE_PRODUCT}
      />
      <UIUploadImageInput
        imageUrl={form.imagen}
        fileImage={fileImage}
        handleChangeFile={handleChangeFile}
        isLoading={isLoading}
        label="Imagen del producto"
        error={errors.imagen}
        disabled={actionType === ActionType.DELETE_PRODUCT}
      />
      <UIInput
        name="precio"
        value={form.precio}
        label="Precio del producto"
        handleChange={handleChange}
        placeholder="Dijita el precio del producto sin puntos"
        type="number"
        error={errors.precio}
        disabled={actionType === ActionType.DELETE_PRODUCT}
      />
      <UITextArea
        name="descripcion"
        value={form.descripcion}
        label="Descripción (Opcional)"
        handleChange={handleChange}
        placeholder="Excribe una descripción del producto"
        disabled={actionType === ActionType.DELETE_PRODUCT}
      />

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full flex justify-center items-center p-4 rounded-lg text-white hover:opacity-65 transition-opacity  disabled:bg-gray-200 disabled:cursor-pointer ${actionType=== ActionType.DELETE_PRODUCT ?"bg-red-500":""} ${actionType=== ActionType.ADD_PRODUCT ?"bg-green-500":""} ${actionType=== ActionType.UPDATE_PRODUCT ?"bg-yellow-500":""}`}
      >
        {isLoading && (
          <svg className="mr-3 -ml-1 size-9 animate-spin text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" > <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" ></circle> <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" ></path> </svg>
        )}
        {!isLoading && <span className="uppercase">{actionType}</span>}
      </button>
    </form>
  );
};


{/* <svg className="mr-3 -ml-1 size-9 animate-spin text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> */}