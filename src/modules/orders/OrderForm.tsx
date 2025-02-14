import { Modal } from "@/components/Modal"

const OrderForm = ({isOpen,onClose}:{isOpen:boolean,onClose:VoidFunction}) => {
  return (
       <Modal isOpen={isOpen} onClose={onClose}>
            <span>Datos</span>
            <form className="w-full flex flex-col justify-start items-start mt-4 gap-3">
            <div className="w-full flex flex-col justify-start items-start gap-1">
                <label className="text-sm">Medio de pago</label>
                <select  className="w-full shadow p-3  rounded-lg outline-none focus:shadow-gray-400">
                  <option  defaultValue="">Selecciona un medio de pago</option>
                  <option value="Efectivo">Efectivo</option>
                  <option value="Transferencia">Transferencia</option>
                </select>
              </div>
              <div className="w-full flex flex-col justify-start items-start gap-1">
                <label className="text-sm">Dirección</label>
                <input
                  className="w-full shadow p-3  rounded-lg outline-none focus:shadow-gray-400"
                  placeholder="Dijita la dirección de la orden"
                  autoFocus
                />
              </div>
              <div className="w-full flex flex-col justify-start items-start gap-1">
                <label className="text-sm">Descripción<span className="text-xs text-gray-500"> (Opcional)</span></label>
                <textarea
                  className="w-full shadow p-3 rounded-lg outline-none focus:shadow-gray-400 resize-none min-h-[120px]"
                  placeholder="Dijita alguna descripción"
                  autoFocus
                />
              </div>
            </form>
          </Modal>
  )
}

export default OrderForm