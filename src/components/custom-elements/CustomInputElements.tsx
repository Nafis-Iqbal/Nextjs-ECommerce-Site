import { ChangeEvent } from "react";
import React, {forwardRef} from "react";

type CustomInputProps = {
  id?: string;
  name?: string;
  value?: string;
  required?: boolean;
  className?: string;
  placeholderText?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
} & React.InputHTMLAttributes<HTMLInputElement>

export const CustomTextArea = ({id, name, value, className, placeholderText} : CustomInputProps) => {
    return (
        <textarea className={`p-1 bg-white border border-gray-300 placeholder-gray-400 text-gray-800 rounded-sm
            focus:outline-none focus:ring-2 focus:ring-green-600 ${className}`} id={id} name={name} value={value} placeholder={placeholderText}
        />
    )
}

export const CustomTextInput = forwardRef<HTMLInputElement, CustomInputProps>((props, ref) => {
    const {
      id,
      name,
      value,
      required = false,
      className,
      placeholderText,
      onChange,
      ...rest
    } = props;

    return (
        <input className={`p-1 bg-white border border-gray-300 placeholder-gray-400 text-gray-800 rounded-sm
            focus:outline-none focus:ring-2 focus:ring-green-600 ${className}`} id={id} name={name} value={value} 
            ref={ref}
            type="text" placeholder={placeholderText} onChange={onChange} required={required}
        />
    )
})

CustomTextInput.displayName = "CustomTextInput";

type Option = {
  label: string;
  value: string;
};

type CustomSelectProps = {
  options: Option[];
  value: string;
  defaultSelectText?: string;
  onChange: (value: string) => void;
  className?: string;
};

export default function CustomSelect({
  options,
  value,
  defaultSelectText = "-- Select an input --",
  onChange,
  className = "",
}: CustomSelectProps) {
  return (
    <select
      onChange={(e) => onChange(e.target.value)}
      className={`p-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${className}`}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}