'use client'
import { Modal } from "@/components/Modal"
import { useState } from "react"
import { Product } from '../../interfaces/interfaces';

interface IForm  {
  paymentMethod:string;
  address:string;
  description:string;
}
const OrderForm = ({isOpen,onClose,productsInCart}:{isOpen:boolean,onClose:VoidFunction,productsInCart:Product[]}) => {
  const [form,setForm] = useState<IForm>({
    paymentMethod:"",
    address:"",
    description:""
  })

  const handleChangeForm = (name:string,value:string) =>setForm((prev)=>({...prev,[name]:value}))

  const getOrderText = () => {
    const { address, description, paymentMethod } = form;
    let text = "";
    const productsText = productsInCart.reduce(
      (text, prod) => {
        return (text += `${prod.count} ${prod.nombre}.\n`);
      },
      "\n"
    );

    text += `Buenas, quisiera ordenar por favor:\n${productsText}\n*Método de pago:* ${paymentMethod}.\n*Dirección:* ${address}.\n${description?`*Descripción:*${description}.`:""}`;
    return text
  };

  const handleOrder = ()=>   {
    window.open(
      `https://api.whatsapp.com/send?phone=+3023842288&text=${encodeURIComponent(getOrderText())}`
    )
    onClose()
  };
  return (
       <Modal isOpen={isOpen} onClose={onClose}>
           
            <form className="w-full flex flex-col justify-start items-start mt-4 gap-3">
            <div className="w-full flex flex-col justify-start items-start gap-1">
              <span className="mb-3 mt-2 ">✨Completa los siguientes datos para generar tu orden:</span>
                <label className="text-sm">Medio de pago</label>
                <select autoFocus defaultValue="" name="paymentMethod" onChange={(e)=>handleChangeForm(e.target.name,e.target.value)}  className="w-full shadow p-3  rounded-lg outline-none focus:shadow-gray-400">
                  <option disabled value="">Selecciona un medio de pago</option>
                  <option value="Efectivo">Efectivo</option>
                  <option value="Transferencia">Transferencia</option>
                </select>
              </div>
              <div className="w-full flex flex-col justify-start items-start gap-1">
                <label className="text-sm">Dirección</label>
                <input
                  name="address"
                  onChange={(e)=>handleChangeForm(e.target.name,e.target.value)}
                  className="w-full shadow p-3  rounded-lg outline-none focus:shadow-gray-400"
                  placeholder="Dijita la dirección de la orden"
                  
                />
              </div>
              <div className="w-full flex flex-col justify-start items-start gap-1">
                <label className="text-sm">Descripción<span className="text-xs text-gray-500"> (Opcional)</span></label>
                <textarea
                  name="description"
                  onChange={(e)=>handleChangeForm(e.target.name,e.target.value)}
                  className="w-full shadow p-3 rounded-lg outline-none focus:shadow-gray-400 resize-none min-h-[120px]"
                  placeholder="ej:casa rejas blancas, pedido sin lechuga.."
                />
              </div>
              <button disabled={!form.paymentMethod.trim() || !form.address.trim()} className="flex justify-center items-center gap-1 w-full p-3 bg-indigo-500 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed" onClick={handleOrder}>
                <span className="text-base text-white">Generar orden por whatsapp</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#08f744" viewBox="0 0 256 256"><path d="M152.58,145.23l23,11.48A24,24,0,0,1,152,176a72.08,72.08,0,0,1-72-72A24,24,0,0,1,99.29,80.46l11.48,23L101,118a8,8,0,0,0-.73,7.51,56.47,56.47,0,0,0,30.15,30.15A8,8,0,0,0,138,155ZM232,128A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Zm-40,24a8,8,0,0,0-4.42-7.16l-32-16a8,8,0,0,0-8,.5l-14.69,9.8a40.55,40.55,0,0,1-16-16l9.8-14.69a8,8,0,0,0,.5-8l-16-32A8,8,0,0,0,104,64a40,40,0,0,0-40,40,88.1,88.1,0,0,0,88,88A40,40,0,0,0,192,152Z"></path></svg>                   </button>
            </form>
          </Modal>
  )
}

export default OrderForm