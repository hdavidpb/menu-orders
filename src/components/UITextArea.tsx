import { ChangeEvent } from "react";

interface Props {
    name:string;
    value:string;
    handleChange:(e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>void;
    label:string;
    placeholder:string;
    error?:string;
    disabled?:boolean;
}

export const UITextArea = ({name,value,label,handleChange,placeholder,disabled,error}:Props) => {
  return (
    <div className="w-full flex flex-col justify-start items-start gap-1">
      <label className="text-sm">{label}</label>
      <textarea
          value={value}
          onChange={handleChange}
          name={name}
          className="w-full border p-3 rounded-lg outline-none focus:shadow-gray-400 resize-none min-h-[120px]"
          placeholder={placeholder}
          disabled={disabled}
        />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};
