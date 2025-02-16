import { ChangeEvent } from "react";
import { ActionType } from "../hooks/useCreateProduct";

interface Props {
    value:ActionType;
    handleChangeActionType:(e:ChangeEvent<HTMLSelectElement>)=>void

}

export const UISelectedAction = ({value,handleChangeActionType}:Props) => {
  return (
          <div className="w-full flex flex-col justify-start items-start gap-1 border-dotted bg-indigo-50 border p-2 rounded-lg">
            <label className="text-sm font-medium">
              Seleccione el tipo de acción que desea realizar
            </label>
            <select
              value={value}
              className="border border-indigo-500 bg-white font-medium rounded-lg p-3 outline-indigo-500 capitalize"
              onChange={handleChangeActionType}
            >
              <option value={ActionType.ADD_PRODUCT}>{ActionType.ADD_PRODUCT}</option>
              <option value={ActionType.UPDATE_PRODUCT}>{ActionType.UPDATE_PRODUCT}</option>
              <option value={ActionType.DELETE_PRODUCT}>{ActionType.DELETE_PRODUCT}</option>
            </select>
          </div>
  )
}
