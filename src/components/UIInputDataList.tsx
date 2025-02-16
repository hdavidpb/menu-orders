import { ChangeEvent } from "react";

interface Props {
    name:string;
    value:string;
    handleChange:(e:ChangeEvent<HTMLInputElement>)=>void;
    label:string;
    placeholder:string;
    type?:"text"|"number"|"email";
    listData:string[];
    error?:string;
}

export const UIInputDataList = ({name,value,label,handleChange,placeholder,type="text",listData,error}:Props) => {
  return (
    <div className="w-full flex flex-col justify-start items-start gap-1">
      <label className="text-sm">{label}</label>
      <input
          value={value}
          type={type}
          list={name}
          onChange={handleChange}
          name={name}
          className={`w-full border p-3  rounded-lg outline-none focus:shadow-gray-400 transition-all ease-in-out duration-300 ${error?"border-red-500":""}`}
          placeholder={placeholder}
        />
        <datalist id={name}>
          {listData.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </datalist>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};
