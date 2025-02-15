import { ChangeEvent } from "react";

interface Props {
    name:string;
    value:string;
    handleChange:(e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>void;
    label:string;
    placeholder:string;
    error?:string;
}

export const UITextArea = ({name,label,handleChange,placeholder,error}:Props) => {
  return (
    <div className="w-full flex flex-col justify-start items-start gap-1">
      <label className="text-sm">{label}</label>
      <textarea
          onChange={handleChange}
          name={name}
          className="w-full border p-3 rounded-lg outline-none focus:shadow-gray-400 resize-none min-h-[120px]"
          placeholder={placeholder}
        />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};
