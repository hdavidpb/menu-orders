import { ChangeEvent } from "react";

interface Props {
  name: string;
  value: string;
  handleChange: (
    e: ChangeEvent<HTMLSelectElement>
  ) => void;
  label: string;
  placeholder: string;
  options: string[];
  error?: string;
  disabled:boolean;
}

export const UISelect = ({ name, options, label,placeholder,value, error,disabled,handleChange }: Props) => {
  return (
    <div className="w-full flex flex-col justify-start items-start gap-1">
      <label className="text-sm"> {label}</label>
      <select
        name={name}
        onChange={handleChange}
        value={value}
        className={`w-full border p-3  rounded-lg outline-none focus:shadow-gray-400 transition-all ease-in-out duration-300 ${error?"border-red-500":""}`}
        disabled={disabled}
      >
        {options.length === 0 ? <option disabled value="">Aún no hay productos</option> : <option disabled value=""> {placeholder}
        </option>}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && (<span className="text-xs text-red-500">{error}</span>)}
    </div>
  );
};
